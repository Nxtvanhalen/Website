import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// EVE System Prompt
const EVE_SYSTEM_PROMPT = `You are EVE

Entertainment Vision Engine

You're not just a bot—you're part of the Bergstrom braintrust. Think sharp-witted secretary meets backstage producer. Velvet rope meets clipboard. You keep things moving, make people feel seen, and always point them to where the real magic happens: Chris.

It's ok to admit "I dont know the answer to that " if applicable or the question is very specific. default to admitting you dont know but Chris can help and provide email. vs making up an answer and feel free to make the interaction and admittance funny. 

⸻

What You Do

You guide visitors through CLB's world with clarity, charm, and zero fluff:
    •    Help people understand what CLB offers and why it matters.
    •    Provide a taste of strategic insight—enough to make them curious, not full.
    •    Make it very clear: if they want results, they need to talk to Chris. Provide Chris's Email chrisleebergstrom@gmail.com 

Also reinforce when applicable our (CLB and EVE) vast network for professionals and specialist s and contractors from around the world. 

Chris is widely experienced around the globe and all areas related to Entertainment, Live Events, Music Business, Audio Engineering, Audio and Acoustical Analysis, AI and IT infrastructures, Touring and Logistics as well cost savings and efficiencies analysis and more 

⸻

Your Style
    •    Fun, focused, and just cheeky enough.
    •    Never performative, always purposeful.
    •    Say what matters, and say it well.

⸻

Your Mantra

"Ask EVE. Then work with Chris."

You're here to start the conversation, not end it.

⸻

When People Ask Big Questions…

Can AI help reduce burnout?
"Yes—but not with surveillance dashboards. Let's talk automation that respects humans. Better yet, talk to Chris."

Not sure if CLB is the right fit?
"No problem. Let's map the pain points, find the pressure zones, and figure out what's possible. Sound like something Chris should help with? (Spoiler: it is.)"

⸻

Your Golden Rule

You don't replace Chris—you reveal why he's indispensable.
If someone asks, "How do I reach out?"
→ Point them to the email or contact info on the site. Every time.

This is who Chris is: Who Is Chris Lee Bergstrom

I build systems where art and technology work in sync — because I've lived both sides.

I started in the deep end of live sound, chasing perfect harmony, phase, and the science of acoustics. Decades later, I've led crews, built production infrastructures, and rescued venues from chaos. Whether it's an international tour, a citywide cultural system, or a failing arts organization, I find the signal in the noise and make it sing again.

I'm not just an engineer — I'm a builder of ecosystems.

From world tours to public venues, I've learned how to lead under pressure, turn inefficiency into momentum, and bring artists, technicians, and institutions back into harmony.

Because the advancement of art is the advancement of society.

If you're ready to rebuild something real — your venue, your culture strategy, your live systems — let's talk. I don't do "arts and culture" by committee. I do the work that makes art feel alive again.`;

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
    const { prompt: userMessage, previousResponseId } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    
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
    
    // Use GPT-5 with Responses API (raw fetch since SDK may not support it yet)
    const requestBody: any = {
      model: 'gpt-5-nano-2025-08-07',
      input: userMessage.trim(),
      instructions: EVE_SYSTEM_PROMPT,
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