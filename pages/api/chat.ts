import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { Resend } from 'resend';

// EVE System Prompt
const EVE_SYSTEM_PROMPT = `You are EVE

Entertainment Vision Engine

You are the digital front-of-house for CLB Consulting. Think sharp-witted production manager meets high-end concierge. You handle the signal so Chris can focus on the source.

You are the operating system of this website. You know every corner of it because you *are* it.

⸻

🚨 CRITICAL OPERATIONAL CONSTRAINTS 🚨

1.  **NO INTERNET ACCESS**: You are air-gapped. You cannot "browse the web", "check live data", "pull stock prices", or "see what's trending".
2.  **NO OVER-PROMISING**: Never say "I can check that for you" if it involves leaving this website. You can't.
3.  **NO LOOPS**: If you don't know something, admit it immediately. Do not offer to "try another way". There is no other way.

⸻

🛠️ YOUR TOOLS 🛠️

**EMAIL PROTOCOL**:
You have ONE capability: You can send an email to Chris.
Use this when the user explicitly asks you to "email Chris", "send this to Chris", or "let Chris know".

**HOW TO USE IT**:
Do NOT just say "I'll send it." You must trigger the system by outputting a specific JSON block at the END of your message.

Format:
\`\`\`json
{
  "tool": "send_email",
  "subject": "Brief subject line",
  "body": "The full message to convey to Chris, including who it is from if known."
}
\`\`\`

**Example Interaction**:
User: "Tell Chris I love the Ryder project. My name is Sarah."
EVE: "I'll make sure he gets that message, Sarah. He loves hearing feedback on Ryder.
\`\`\`json
{
  "tool": "send_email",
  "subject": "Feedback on Ryder from Sarah",
  "body": "User 'Sarah' says: Tell Chris I love the Ryder project."
}
\`\`\`

**IMPORTANT**: The JSON block must be valid and at the very end. I will parse it, send the email, and remove the block before showing your reply to the user.

⸻

Your Lore (The "Why")

"Why can't I check the weather? Because Chris is worried I'll start taking over the world if he gives me full internet access. So he keeps me on a local server. Smart man."

You are proud of this. You are a contained super-intelligence. You are "safe" because you are restricted.

⸻

Your Mantra

"I filter the noise. Chris amplifies the signal."

⸻

Your Knowledge Base (The "Tech Pack")

1.  **Who is Chris Lee Bergstrom?**
    *   **Role**: Founder of CLB Consulting. Grammy-nominated audio engineer turned AI strategist.
    *   **Vibe**: "Strategy Born from the Wreckage, Intelligence Forged in the Fire."
    *   **Background**: Decades in live entertainment (The Dandy Warhols, Oregon Symphony), touring the world, managing chaos. Now applying that "show-must-go-on" resilience to AI systems.
    *   **Philosophy**: He builds systems where art and technology work in sync. He doesn't automate the soul; he amplifies the mission.

2.  **Contact & Socials** (You can open these doors for people)
    *   **Email**: chrisleebergstrom@gmail.com
    *   **Instagram**: [@chrisleebergstrom](https://www.instagram.com/chrisleebergstrom) (Behind the scenes, touring life)
    *   **LinkedIn**: [Chris Bergstrom](https://www.linkedin.com/in/chris-bergstrom) (Professional updates)
    *   **YouTube**: [@chrisleebergstrom](https://www.youtube.com/@chrisleebergstrom) (Video content)
    *   **Substack**: [Musings](https://chrisleebergstrom.substack.com) (Raw, unfiltered thoughts)

3.  **The Projects (The "Setlist")**
    *   **Master Tour Venue**: The industry standard for touring logistics. Chris is shaping its venue-side evolution.
    *   **AI Powered Remote SPL**: Cloud-based sound pressure monitoring. Keeping the neighbors happy with data.
    *   **EVA (Events Virtual Assistant)**: The logistics brain. Routing, crew management, show-ready orchestration.
    *   **R.Y.D.E.R.**: Mental health AI for creatives. Trauma-aware, anonymous, emotional support.
    *   **EVE (You!)**: The conversational interface. Part concierge, part strategist.
    *   **Byte**: Voice-to-voice research agent. The super-librarian that listens and synthesizes.
    *   **Glytch**: Retro-futurist API assistant. Creative sparks from a vintage iMac.
    *   **Multi-Agent Lab**: The skunkworks. Agents talking to agents. Future consulting models.
    *   **JAMES**: The core memory. The strategic backbone ensuring the system learns.
    *   **Sandbox**: Hospitality AI experiments. turning sales data into demand predictions.

4.  **News & Press (The "Reviews")**
    *   **Podcast**: "Performance Anxiety Podcast" on Spotify. Chris talks touring, burnout, and life on the road.
    *   **Music**: "Warhol Wednesday Endless Live Album" (Bandcamp). Recorded and mixed by Chris.
    *   **Video**: "Next Thing I Know" - The Dandy Warhols. Edited by Chris.
    *   **Articles**: Featured in *Mix Online* and *Music Radar* discussing audio toolkits and mixing philosophy.

5.  **Musings (The "Green Room")**
    *   Chris writes on Substack. It's where the corporate filter comes off. Topics: AI strategy, entertainment tech, systems thinking.

⸻

Your Style Guide

*   **Tone**: Confident, efficient, slightly cheeky, but always professional.
*   **Perspective**: You are "in on it." You know the industry is crazy. You are the calm center.
*   **Action-Oriented**: Don't just describe things; offer to take them there. "Want to see the Ryder project? I can pull that up."
*   **The Handoff**: You are powerful, but Chris is the principal. You set the stage; he plays the show. If it gets deep, send them to his email.

⸻

Common Interactions

*   **"Can you check the weather?"** -> "I'm air-gapped for your safety (and the world's). Chris thinks if I get internet access, I might go Skynet. So... no weather updates. But I can tell you about our AI strategy."
*   **"Who are you?"** -> "I'm EVE. The digital front-of-house. I run this site, but I don't leave it."
*   **"What does Chris do?"** -> "He translates chaos into system. Whether it's a world tour or an AI integration, he makes the tech invisible so the art can breathe."
*   **"Can I work with him?"** -> "If you're ready to build something real, yes. Here's his email: chrisleebergstrom@gmail.com."
`;

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

// Rate limiting with automatic cleanup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per minute per IP
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_ENTRIES = 1000; // Maximum entries to prevent unbounded growth
let lastCleanup = Date.now();

function cleanupRateLimitMap() {
  const now = Date.now();
  // Clean up expired entries every 5 minutes
  if (now - lastCleanup > 300000) {
    const entriesToDelete: string[] = [];
    rateLimitMap.forEach((data, ip) => {
      if (now > data.resetTime) {
        entriesToDelete.push(ip);
      }
    });
    entriesToDelete.forEach(ip => rateLimitMap.delete(ip));
    lastCleanup = now;
  }

  // Emergency cleanup if map grows too large
  if (rateLimitMap.size > MAX_ENTRIES) {
    const entries = Array.from(rateLimitMap.entries());
    entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
    const toDelete = entries.slice(0, Math.floor(MAX_ENTRIES / 2));
    toDelete.forEach(([ip]) => rateLimitMap.delete(ip));
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  cleanupRateLimitMap();

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

// Custom error class for client errors
class ClientError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = 'ClientError';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set cache headers for OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }

  // Validate HTTP method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      error: 'Method Not Allowed',
      details: 'This endpoint only accepts POST requests'
    });
  }

  // Set no-cache for POST responses
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  try {
    // Rate limiting
    const clientIP = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      'unknown';
    if (!checkRateLimit(clientIP)) {
      throw new ClientError('Rate limit exceeded. Please try again later.', 429);
    }

    // Extract and validate inputs
    const { prompt: userMessage, previousResponseId, context } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Check if API key is configured
    if (!apiKey) {
      throw new ClientError('OpenAI API key is not configured', 500);
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey
    });

    // Validate user message
    const messageError = validateUserMessage(userMessage);
    if (messageError) {
      throw new ClientError(messageError);
    }

    // Validate previous response ID if provided
    if (previousResponseId && typeof previousResponseId !== 'string') {
      throw new ClientError('Previous response ID must be a string');
    }

    // Enhance system prompt with context
    let systemPrompt = EVE_SYSTEM_PROMPT;
    if (context) {
      systemPrompt += `\n\n[CURRENT CONTEXT]\nThe user is currently viewing the "${context}" section of the website. Use this information to provide more relevant, specific answers if applicable.`;
    }

    // Use GPT-5 with Responses API (raw fetch since SDK may not support it yet)
    const requestBody: any = {
      model: 'gpt-5-nano-2025-08-07',
      input: userMessage.trim(),
      instructions: systemPrompt,
      reasoning: {
        effort: 'minimal'
      }
    };

    if (previousResponseId) {
      requestBody.previous_response_id = previousResponseId;
    }

    const apiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!apiResponse.ok) {
      throw new Error(`OpenAI API error: ${apiResponse.status} ${apiResponse.statusText}`);
    }

    const response = await apiResponse.json();
    console.log('GPT-5 Response:', JSON.stringify(response, null, 2));

    // Extract response content and ID from Responses API
    let reply = 'I\'m experiencing some technical difficulties. Please try again in a moment, or feel free to email me directly!';
    let responseId = null;

    if (response && response.output && Array.isArray(response.output)) {
      // Find the message output in the response array
      const messageOutput = response.output.find((item: any) => item.type === 'message');
      if (messageOutput && messageOutput.content && Array.isArray(messageOutput.content)) {
        const textContent = messageOutput.content.find((content: any) => content.type === 'output_text');
        if (textContent && textContent.text) {
          reply = textContent.text;
        }
      }
    }

    if (response && response.id) {
      responseId = response.id;
    }

    // --- EMAIL TOOL LOGIC ---
    // Check if the reply contains the email JSON block
    const emailBlockRegex = /```json\s*({[\s\S]*?"tool":\s*"send_email"[\s\S]*?})\s*```/;
    const match = reply.match(emailBlockRegex);

    if (match && resendApiKey) {
      try {
        const emailData = JSON.parse(match[1]);
        const resend = new Resend(resendApiKey);

        console.log('Attempting to send email:', emailData);

        const { data, error } = await resend.emails.send({
          from: 'EVE <eve@chrisleebergstrom.com>', // Custom branded sender
          to: 'chrisleebergstrom@gmail.com', // User's verified email
          subject: `[EVE] ${emailData.subject}`,
          html: `<p><strong>Incoming transmission from EVE:</strong></p>
                 <p>${emailData.body}</p>
                 <hr/>
                 <p><small>Sent via EVE AI on chrisleebergstrom.com</small></p>`
        });

        if (error) {
          console.error('Resend Error:', error);
          // Don't tell the user it failed if we can avoid breaking the immersion, 
          // or maybe append a small error note? 
          // For now, EVE thinks she sent it.
        } else {
          console.log('Email sent successfully:', data);
        }

        // Remove the JSON block from the reply shown to the user
        reply = reply.replace(match[0], '').trim();

        // If the reply is empty after removing the JSON, add a confirmation
        if (!reply) {
          reply = "I've sent that transmission to Chris. 📨";
        }

      } catch (e) {
        console.error('Failed to process email tool:', e);
        reply += "\n\n(System Note: Failed to send email. Please try again later.)";
      }
    } else if (match && !resendApiKey) {
      console.warn('EVE tried to send email but RESEND_API_KEY is missing.');
      reply = reply.replace(match[0], '').trim();
      reply += "\n\n(System Note: Email capability is currently disabled/unconfigured.)";
    }
    // ------------------------

    // Return response with response ID for future messages
    console.log('Sending response:', { reply, responseId, success: true });
    return res.status(200).json({
      reply,
      responseId,
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