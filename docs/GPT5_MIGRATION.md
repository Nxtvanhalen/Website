# GPT-5 Responses API Migration - Technical Reference

> Complete technical guide documenting the migration of CLB Consulting's EVE AI chat from OpenAI Assistants API (thread-based) to GPT-5 Responses API with reasoning capabilities. Written for AI coding agents and human developers working on this codebase. This document preserves implementation details, decision rationale, and code patterns for future reference.

---

## Migration Summary

| Aspect | Before | After |
|---|---|---|
| **API** | OpenAI Assistants API v1 | GPT-5 Responses API |
| **Conversation Model** | Persistent threads | Stateless with response ID chaining |
| **API Endpoint** | `/v1/assistants` | `/v1/responses` |
| **Frontend State** | `threadId` in localStorage | `responseId` in localStorage |
| **System Prompt** | Stored in assistant config | Sent per-request as `instructions` |
| **Model** | gpt-4-turbo-preview | GPT-5 (400k token context window) |
| **SDK Version** | OpenAI SDK v4.7.0 | OpenAI SDK v5.18.1 |
| **Reasoning** | None | Configurable effort levels (minimal/medium/high) |
| **Rate Limiting** | None | 20 requests/minute per IP (in-memory) |

---

## Architecture Changes

### Key Decisions

1. **Responses API over Chat Completions API**: GPT-5 is accessible through two APIs. We chose the Responses API (`/v1/responses`) because it supports reasoning effort levels and native conversation continuity via `previous_response_id`. The Chat Completions API (`/v1/chat/completions`) is also available via the SDK if standard chat is preferred.

2. **Minimal Reasoning Effort**: EVE's chat interface uses `minimal` reasoning for fast responses (~1-3 seconds). This can be increased to `medium` or `high` for more complex reasoning tasks. For a chat concierge, speed matters more than deep reasoning.

3. **Direct Fetch over SDK for Responses API**: The implementation uses direct `fetch()` calls to the Responses API endpoint rather than the SDK wrapper, because the Responses API was new at migration time and direct fetch provided more control over the request structure.

4. **Per-Request System Prompts**: EVE's full personality prompt is sent with every request as `instructions`. This eliminates the need for pre-configured assistants and allows dynamic prompt modifications per request if needed in the future.

---

## Backend Implementation (`pages/api/chat.ts`)

### API Request Structure

```typescript
// OLD: Assistants API (removed)
const assistant = await openai.beta.assistants.create({
  name: "EVE",
  instructions: systemPrompt,
  model: "gpt-4-turbo-preview"
});
const thread = await openai.beta.threads.create();
const message = await openai.beta.threads.messages.create(threadId, {
  role: "user",
  content: userMessage
});

// NEW: GPT-5 Responses API
const requestBody = {
  model: 'gpt-5',
  input: userMessage.trim(),
  instructions: EVE_SYSTEM_PROMPT,
  reasoning: {
    effort: 'minimal'  // Options: 'minimal', 'medium', 'high'
  },
  previous_response_id: previousResponseId  // Optional: chains conversation context
};

const apiResponse = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
});
```

### Response Parsing

GPT-5 Responses API returns a nested structure that differs from Chat Completions:

```typescript
// Response structure from Responses API:
{
  id: "response_abc123",        // This becomes the previousResponseId for the next turn
  output: [
    {
      type: "message",
      content: [
        {
          type: "output_text",
          text: "The actual response text here"
        }
      ]
    }
  ]
}

// Extraction logic:
const messageOutput = response.output.find(item => item.type === 'message');
const textContent = messageOutput.content.find(content => content.type === 'output_text');
const reply = textContent.text;
```

### Rate Limiting

In-memory rate limiting at 20 requests/minute per IP address:

```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}
```

### Input Validation and Error Handling

```typescript
// Custom error class for client-caused errors (400-level)
class ClientError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = 'ClientError';
  }
}

// Input validation: empty check, type check, 4000 character limit
function validateUserMessage(message: any): string | null {
  if (!message || typeof message !== 'string') {
    return 'User message must be a non-empty string';
  }
  const trimmed = message.trim();
  if (trimmed.length === 0) return 'User message cannot be empty';
  if (trimmed.length > 4000) return 'User message exceeds maximum length of 4000 characters';
  return null;
}

// Error classification in the catch block:
// - ClientError instances -> return error.statusCode with error.message
// - Errors with .status property -> OpenAI API errors, handle by status code
// - Everything else -> generic 500 server error
```

---

## Frontend Implementation (`components/ChatPanel.tsx`)

### State Management

```typescript
// OLD: Thread-based state
const [threadId, setThreadId] = useState<string | null>(
  typeof window !== 'undefined' ? localStorage.getItem('threadId') : null
);

// NEW: Response ID-based state
const [responseId, setResponseId] = useState<string | null>(
  typeof window !== 'undefined' ? localStorage.getItem('responseId') : null
);
```

### API Call Pattern

```typescript
// Send message with previous response ID for conversation continuity
const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: content,
    previousResponseId: responseId  // Chains to previous turn
  })
});

// Store new response ID for next turn
if (data.responseId && data.responseId !== responseId) {
  setResponseId(data.responseId);
  localStorage.setItem('responseId', data.responseId);
}
```

### UI Preserved

The frontend migration preserved all existing UI behavior:
- Typing indicator animations
- Message display and formatting
- Markdown rendering (bold, italics, links)
- Mobile keyboard handling and auto-recentering

---

## GPT-5 API Reference

### Two API Options

| API | Endpoint | Best For | Conversation Model |
|---|---|---|---|
| **Responses API** | `/v1/responses` | Reasoning tasks, this implementation | `previous_response_id` chaining |
| **Chat Completions API** | `/v1/chat/completions` | Standard chat, SDK-native | Message history array |

### Reasoning Effort Levels (Responses API only)

| Level | Speed | Use Case |
|---|---|---|
| `minimal` | Fastest (~1-3s) | Conversational AI, chat interfaces (current setting) |
| `medium` | Moderate | Complex queries requiring some reasoning |
| `high` | Slowest | Critical tasks, deep analysis |

### Context Window

GPT-5 provides a 400k token context window — a significant improvement over GPT-4's limits. This means conversation continuity can span much longer interactions without context truncation.

### Streaming

Standard request/response is used (no streaming). Streaming via the Responses API requires a verified business account with OpenAI. This can be implemented later if needed.

---

## Environment Configuration

### Required Environment Variable

```bash
# .env.local (local development)
# Also set in Render dashboard for production
OPENAI_API_KEY=sk-your-openai-api-key
```

### Package Dependency

```json
{
  "openai": "^5.18.1"  // Updated from 4.7.0 — fully supports GPT-5
}
```

---

## Testing

### Pre-Deployment Checklist

- [ ] Test with empty conversation (no `previous_response_id`)
- [ ] Test conversation continuity (with `previous_response_id`)
- [ ] Test rate limiting (20+ requests in under 1 minute)
- [ ] Test error handling (invalid API key, network errors)
- [ ] Test input validation (empty messages, oversized messages)
- [ ] Test localStorage persistence across browser sessions
- [ ] Test mobile responsiveness and keyboard handling

### Post-Deployment Monitoring

- [ ] Monitor API response times
- [ ] Track rate limit hits in logs
- [ ] Review error logs for patterns
- [ ] Check conversation continuity success rate
- [ ] Monitor token usage

---

## Common Issues

### Response Parsing Errors

Implement defensive parsing with fallbacks for both API formats:

```typescript
if (response?.output?.length > 0) {
  // Parse as Responses API format
} else if (response?.choices?.[0]?.message) {
  // Parse as Chat Completions API format (fallback)
} else {
  // Use fallback message
}
```

### Lost Conversation Context

If conversation context breaks mid-thread, verify that `responseId` is being properly stored and retrieved from localStorage. Clear localStorage to start a fresh conversation.

### Rate Limiting Adjustments

The `RATE_LIMIT` constant (currently 20) and `RATE_LIMIT_WINDOW` (currently 60000ms) can be adjusted in `pages/api/chat.ts`. For distributed deployments, replace in-memory rate limiting with Redis.

---

## Future Enhancements

- **Streaming Responses**: Implement when OpenAI business account is verified
- **Dynamic Reasoning**: Auto-adjust reasoning effort based on query complexity
- **Redis Rate Limiting**: Replace in-memory Map with distributed cache for multi-instance deployments
- **Token Optimization**: Implement conversation summarization for very long chat sessions
- **Multi-turn Planning**: Leverage GPT-5's planning capabilities for complex visitor queries
- **File Uploads**: Support multimodal inputs (images, documents) through the chat interface

---

## Security Considerations

- **API Key**: Server-side only, initialized at request level (not module level) to prevent startup crashes
- **Input Validation**: All user input validated and sanitized before reaching the API
- **Rate Limiting**: IP-based throttling prevents abuse and controls API costs
- **Error Messages**: Generic messages sent to client; detailed errors logged server-side only
- **CORS**: Configured for production domain only

---

## References

- [OpenAI GPT-5 Documentation](https://platform.openai.com/docs/models/gpt-5)
- [OpenAI Responses API Reference](https://platform.openai.com/docs/api-reference/responses)
- [OpenAI Chat Completions API Reference](https://platform.openai.com/docs/api-reference/chat)
- [OpenAI Node.js SDK Migration Guide](https://github.com/openai/openai-node/blob/master/MIGRATION.md)

### Files in This Codebase

| File | Role |
|---|---|
| `pages/api/chat.ts` | GPT-5 API endpoint with rate limiting and error handling |
| `components/ChatPanel.tsx` | React chat interface with response ID state management |
| `.env.local` | OpenAI API key (not committed) |
