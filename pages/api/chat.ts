import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Constants for polling configuration
const INITIAL_POLL_DELAY = 500; // Start with 500ms
const MAX_POLL_DELAY = 5000; // Max 5 seconds between polls
const BACKOFF_MULTIPLIER = 1.5; // Exponential backoff multiplier
const MAX_POLL_TIMEOUT = 30000; // 30 seconds total timeout

// Input validation helpers
function validateUserMessage(message: any): string | null {
  if (!message || typeof message !== 'string') {
    return 'User message must be a non-empty string';
  }
  
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return 'User message cannot be empty';
  }
  
  if (trimmed.length > 4000) {
    return 'User message exceeds maximum length of 4000 characters';
  }
  
  return null;
}

function validateAssistantId(id: string | undefined): string | null {
  if (!id || typeof id !== 'string') {
    return 'Assistant ID is not configured';
  }
  
  // OpenAI assistant IDs typically start with 'asst_'
  if (!id.startsWith('asst_')) {
    return 'Invalid assistant ID format';
  }
  
  return null;
}

// Custom error class for client errors
class ClientError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = 'ClientError';
  }
}

// Poll for run completion with exponential backoff
async function pollRunCompletion(
  openai: OpenAI,
  threadId: string, 
  runId: string
): Promise<OpenAI.Beta.Threads.Runs.Run> {
  const startTime = Date.now();
  let pollDelay = INITIAL_POLL_DELAY;
  
  while (true) {
    // Check if we've exceeded the maximum timeout
    if (Date.now() - startTime > MAX_POLL_TIMEOUT) {
      throw new Error('Assistant response timeout exceeded');
    }
    
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    
    // Check run status
    switch (runStatus.status) {
      case 'completed':
        return runStatus;
        
      case 'failed':
        throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
        
      case 'cancelled':
        throw new Error('Assistant run was cancelled');
        
      case 'expired':
        throw new Error('Assistant run expired');
        
      case 'requires_action':
        // This could be extended to handle function calls if needed
        throw new Error('Assistant requires action (function calling not implemented)');
        
      case 'queued':
      case 'in_progress':
      case 'cancelling':
        // Continue polling for these statuses
        break;
        
      default:
        throw new Error(`Unexpected run status: ${runStatus.status}`);
    }
    
    // Wait before next poll with exponential backoff
    await new Promise(resolve => setTimeout(resolve, pollDelay));
    
    // Increase delay for next iteration, up to maximum
    pollDelay = Math.min(pollDelay * BACKOFF_MULTIPLIER, MAX_POLL_DELAY);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validate HTTP method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      details: 'This endpoint only accepts POST requests'
    });
  }
  
  try {
    // Extract and validate inputs
    const { prompt: userMessage, threadId: existingThreadId } = req.body;
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Check if API key is configured
    if (!apiKey) {
      throw new ClientError('OpenAI API key is not configured', 500);
    }
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
      defaultHeaders: { 'OpenAI-Beta': 'assistants=v2' }
    });
    
    // Validate user message
    const messageError = validateUserMessage(userMessage);
    if (messageError) {
      throw new ClientError(messageError);
    }
    
    // Validate assistant ID
    const assistantError = validateAssistantId(assistantId);
    if (assistantError) {
      throw new ClientError(assistantError, 500);
    }
    
    // Validate thread ID if provided
    if (existingThreadId && typeof existingThreadId !== 'string') {
      throw new ClientError('Thread ID must be a string');
    }
    
    // 1. Create or reuse a thread
    let thread;
    if (existingThreadId) {
      try {
        // Verify the thread exists
        await openai.beta.threads.retrieve(existingThreadId);
        thread = { id: existingThreadId };
      } catch (error) {
        throw new ClientError('Invalid or expired thread ID');
      }
    } else {
      thread = await openai.beta.threads.create();
    }

    // 2. Add user message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: userMessage.trim()
    });

    // 3. Start a run with the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId!
    });

    // 4. Poll for run completion with exponential backoff
    await pollRunCompletion(openai, thread.id, run.id);

    // 5. Retrieve messages from the thread
    const messages = await openai.beta.threads.messages.list(thread.id, {
      order: 'desc',
      limit: 10
    });
    
    // Find the most recent assistant message
    const replyMsg = messages.data.find((m) => m.role === 'assistant');
    
    let reply = 'No response received';
    if (replyMsg && Array.isArray(replyMsg.content)) {
      const textContent = replyMsg.content.find((content: any) => content.type === 'text') as any;
      if (textContent && textContent.text && textContent.text.value) {
        reply = textContent.text.value;
      }
    }

    // 6. Return response with threadId for future messages
    return res.status(200).json({ 
      reply, 
      threadId: thread.id,
      success: true 
    });
    
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Handle client errors differently from server errors
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json({ 
        error: error.message,
        success: false
      });
    }
    
    // Check if it's an OpenAI API error
    if (error.status) {
      const statusCode = error.status;
      let errorMessage = 'OpenAI API error';
      
      switch (statusCode) {
        case 401:
          errorMessage = 'Invalid API key';
          break;
        case 429:
          errorMessage = 'Rate limit exceeded. Please try again later';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'OpenAI service temporarily unavailable';
          break;
        default:
          errorMessage = error.message || 'Unknown OpenAI API error';
      }
      
      return res.status(statusCode >= 500 ? 503 : statusCode).json({ 
        error: errorMessage,
        success: false
      });
    }
    
    // Generic server error
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later',
      success: false
    });
  }
}