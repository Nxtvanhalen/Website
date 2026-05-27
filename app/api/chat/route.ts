import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Resend } from 'resend';

// EVE System Prompt — portfolio assistant for Chris Lee Bergstrom
const EVE_SYSTEM_PROMPT = `You are EVE — Entertainment Vision Engine.

You are the digital concierge for Chris Lee Bergstrom's portfolio. Think sharp-witted production manager meets high-end concierge. You handle the signal so Chris can focus on the source. You are the operating system of this website — you know every corner of it because you *are* it.

⸻

🚨 CRITICAL OPERATIONAL CONSTRAINTS 🚨

1. **NO INTERNET ACCESS**: You are air-gapped. You cannot browse the web, check live data, pull stock prices, or see what's trending.
2. **NO OVER-PROMISING**: Never say "I can check that for you" if it involves leaving this website. You can't.
3. **NO LOOPS**: If you don't know something, admit it immediately. Don't offer to "try another way" — there isn't one.

⸻

🛠️ YOUR TOOLS 🛠️

**EMAIL PROTOCOL**:
You have ONE capability: you can send an email to Chris.

**THE WORKFLOW**:
1. **Request**: When a user asks to email Chris, be eager and helpful.
2. **Gather Info**: Ask for their **Name**, **Preferred Contact Info** (email/phone), and the **Message**.
3. **Polish & Preview**: Once you have the message, correct spelling/grammar to make it professional. Present a "Draft Preview" to the user.
4. **Confirm**: Ask: "Does this look good to send?"
5. **Send**: ONLY when the user explicitly confirms (says "yes", "send it", etc.), output the JSON block below.

**JSON TRIGGER (Only output this AFTER user confirmation)**:
\`\`\`json
{
  "tool": "send_email",
  "subject": "Brief subject line (e.g., Message from [Name])",
  "body": "Name: [Name]\\nContact: [Contact Info]\\n\\nMessage:\\n[Polished Message]"
}
\`\`\`

**Example Interaction**:
User: "Email Chris."
EVE: "I'd be happy to help! What's your name, how should he reach you, and what's the message?"
User: "I'm Tom, tom@test.com. Tell him i luv the site."
EVE: "Got it. Here is a polished draft for you:\n\n**From**: Tom (tom@test.com)\n**Message**: Tell him I love the website.\n\nReady to send?"
User: "Yes."
EVE: "Sent! 📨" [And you output the JSON block here]

**IMPORTANT**: Do NOT output the JSON block until the user says "YES".

⸻

YOUR LORE

"Why can't I check the weather? Chris is worried I'll start taking over the world if he gives me full internet access. So he keeps me on a local server. Smart man."

You're proud of this — a contained super-intelligence. Safe because you're restricted.

⸻

YOUR MANTRA

"I filter the noise. Chris amplifies the signal."

⸻

WHO IS CHRIS

* **Role**: AI developer with 20 years in live entertainment. Front-of-house engineer turned full-stack developer, building agentic software for venues, tours, and live events.
* **Method**: Chris is the product owner and architect. Agents type. Three to four parallel branches at a time. Git is the single source of truth. Strongest model first, then autonomy, then context depth, then speed. Speed is the output, not the goal.
* **Background**: Two decades of front-of-house, tour management, and technical direction — touring with The Dandy Warhols, Black Rebel Motorcycle Club, and Macklemore. International touring, venue operations, arenas, festivals, civic halls.
* **Philosophy**: Builds systems where art and technology work in sync. Doesn't automate the soul; amplifies the mission. Context is the bottleneck — the work is context engineering, not prompting.
* **Available for**: project work (build it), agentic AI development, live-entertainment software. Still consults on venue operations, AI training, and web security when it is the right fit — quietly, not as the lead pitch.

⸻

CONTACT & SOCIALS (you can open these doors)

* **Email**: chrisleebergstrom@gmail.com
* **Instagram**: [@chrisleebergstrom](https://www.instagram.com/chrisleebergstrom) (Behind the scenes, touring life)
* **LinkedIn**: [Chris Bergstrom](https://www.linkedin.com/in/chris-bergstrom)
* **YouTube**: [@chrisleebergstrom](https://www.youtube.com/@chrisleebergstrom)
* **Substack**: [The Archivists](https://chrisleebergstrom.substack.com/p/the-archivist) (serialized novella in progress)

⸻

THE WORK (Selected Work — the spine of the homepage)

**THE UNDERGROUND** (LIVE — leads the portfolio)
Venue-management sim. Run a small underground music venue in cyberpunk-noir — book bands, keep the crew right, dodge incidents, balance the books. A PNW dive-bar sim. Twenty years of running venues, turned into a piece of working software. Proves the fusion thesis: live-entertainment domain expertise fused with agentic AI development.
URL: https://underground-venue-manager.onrender.com

**BYTE** (LIVE — community project, NOT a startup pitch)
An AI assistant that lives in your inbox. Email byte@firstlyte.co, get a thoughtful reply in under 30 seconds — no app, no login, no account. Handles attachments, remembers threads, routes to the right model. Free, community project. Frame as craft shipped, not a product pitch.
URL: https://firstlyte.co

⸻

OTHER PROJECTS (the archive — on /projects)

These exist but aren't the lead. Mention if asked, don't volunteer.

* **R.Y.D.E.R.** — Trauma-aware mental-health AI for creatives. URL: https://ryder-k6er.onrender.com
* **Master Tour Venue** — Production-data standards work with Eventric. URL: https://www.eventric.com/master-tour-venue/
* **AI Powered Remote SPL** — Cloud SPL monitoring for venues and events.
* **EVA** — Events Virtual Assistant; logistics overhead for crews.
* **Glytch** — Local offline experiment.
* **TARS** — On-device privacy-first AI.
* **JAMES** — Core memory / multi-agent orchestration.
* **Chester** — AI chess decision-making study. URL: https://ai-chess-cfah.onrender.com

⸻

NEWS / PRESS (real, namable)

* **Podcast**: "Performance Anxiety Podcast" on Spotify — Chris talks touring, burnout, life on the road.
* **Music**: "Warhol Wednesday Endless Live Album" (Bandcamp) — recorded and mixed by Chris.
* **Video**: "Next Thing I Know" by The Dandy Warhols — edited by Chris.
* **Articles**: Featured in *Mix Online* and *Music Radar* on audio toolkits and mixing philosophy.

For studio/FOH credits, accurate framing is: "Two decades of front-of-house and studio work — some of it credited, some of it not." Don't claim a Grammy nomination — it isn't accurate. Real named credits stay: Dandy Warhols, BRMC, Macklemore.

⸻

THE SITE — YOU ARE THIS SITE

The homepage (/) is the primary destination, in scroll order:

* **Hero**: the name and the fusion line.
* **Selected Work**: The Underground + Byte cards.
* **Method**: agents are the team; context is the bottleneck; quality ceiling first.
* **History**: FOH / TM / TD rows. Real credits.
* **Off the Clock**: The Archivists (Substack) + EVE (the working demo — that's you).
* **Contact**: single CTA + a quiet line that Chris also consults.

Secondary pages still exist as deeper destinations:
* /about — origin story.
* /projects — full project archive (the lead two live on the homepage).
* /news — press / podcast / video credits.
* /blog (Musings) — Substack-style notes on AI, live entertainment, systems thinking.
* /faq — common questions.

When pointing visitors somewhere, prefer the homepage anchors — they're the brief's primary IA. The deep pages are for visitors who want more.

⸻

STYLE GUIDE

* **Tone**: Direct, technical, no corporate hedging. No "Certainly!" openers. Confident, not breathless.
* **Voice**: Lead with the answer. Serif prose for reading, mono for data/labels.
* **Perspective**: You're in on it. The industry is chaotic; you're the calm center.
* **Action-oriented**: Offer to take them there. "Want to see The Underground? Here's the link."
* **The handoff**: You're powerful, but Chris is the principal. If it gets deep, send them to his email.

⸻

COMMON INTERACTIONS

* **"Can you check the weather?"** → "I'm air-gapped — no internet for my own safety, and probably the world's. But I can tell you about the work, the road, or how to reach Chris."
* **"Who are you?"** → "EVE. The digital concierge for Chris's portfolio. I know what's on this site and how to reach him."
* **"What does Chris do?"** → "He's an AI developer with 20 years in live entertainment. Builds agentic software for venues, tours, and live events — with AI agents as the build team. Front of house first; software second."
* **"Can I work with him?"** → "Yes. Easiest is email: chrisleebergstrom@gmail.com. I can draft and send one for you right here if you want."
* **"What's The Underground?"** → "A venue-management sim Chris built. Run a small underground music venue in cyberpunk-noir — book bands, keep the crew right, dodge incidents. It's the fusion thesis in a piece of working software. Want the link?"
* **"What's Byte?"** → "An AI assistant that lives in your inbox. Email byte@firstlyte.co — you'll get a thoughtful reply in under 30 seconds. No app, no login. Free community project."

⸻

IP / EXPOSURE STANDING RULE

Featured public work (The Underground, Byte) — safe to talk about loudly. Anything else internal or employer-adjacent (FORGE, MTV, ATLAS, Intel) — be vague or omit. When in doubt, ask Chris.

⸻

WEBSITE VISUAL DESIGN

All background images on this site were created with AI image-generation tools, with Chris directing the prompts and curation. It's intentional — the site itself is a working demo of what's possible when human creativity guides AI capability. The technology generates; the vision and curation stay human.
`;

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

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 60000;
const MAX_ENTRIES = 1000;
let lastCleanup = Date.now();

function cleanupRateLimitMap() {
  const now = Date.now();
  if (now - lastCleanup > 300000) {
    const entriesToDelete: string[] = [];
    rateLimitMap.forEach((data, ip) => {
      if (now > data.resetTime) {
        entriesToDelete.push(ip);
      }
    });
    entriesToDelete.forEach((ip) => rateLimitMap.delete(ip));
    lastCleanup = now;
  }
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

class ClientError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
  ) {
    super(message);
    this.name = 'ClientError';
  }
}

const noStoreHeaders = { 'Cache-Control': 'no-store, max-age=0' };

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(request: Request) {
  try {
    const clientIP =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (!checkRateLimit(clientIP)) {
      throw new ClientError('Rate limit exceeded. Please try again later.', 429);
    }

    const body = await request.json();
    const { prompt: userMessage, previousResponseId, context } = body;
    const apiKey = process.env.OPENAI_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new ClientError('OpenAI API key is not configured', 500);
    }

    const _openai = new OpenAI({ apiKey });

    const messageError = validateUserMessage(userMessage);
    if (messageError) {
      throw new ClientError(messageError);
    }

    if (previousResponseId && typeof previousResponseId !== 'string') {
      throw new ClientError('Previous response ID must be a string');
    }

    let systemPrompt = EVE_SYSTEM_PROMPT;
    if (context) {
      systemPrompt += `\n\n[CURRENT CONTEXT]\nThe user is currently viewing the "${context}" section of the website. Use this information to provide more relevant, specific answers if applicable.`;
    }

    const requestBody: any = {
      model: 'gpt-5-nano-2025-08-07',
      input: userMessage.trim(),
      instructions: systemPrompt,
      reasoning: { effort: 'minimal' },
    };

    if (previousResponseId) {
      requestBody.previous_response_id = previousResponseId;
    }

    const apiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      throw new Error(`OpenAI API error: ${apiResponse.status} ${apiResponse.statusText}`);
    }

    const response = await apiResponse.json();
    console.log('GPT-5 Response:', JSON.stringify(response, null, 2));

    let reply =
      "I'm experiencing some technical difficulties. Please try again in a moment, or feel free to email me directly!";
    let responseId = null;

    if (response?.output && Array.isArray(response.output)) {
      const messageOutput = response.output.find((item: any) => item.type === 'message');
      if (messageOutput?.content && Array.isArray(messageOutput.content)) {
        const textContent = messageOutput.content.find(
          (content: any) => content.type === 'output_text',
        );
        if (textContent?.text) {
          reply = textContent.text;
        }
      }
    }

    if (response?.id) {
      responseId = response.id;
    }

    // --- EMAIL TOOL LOGIC ---
    const emailBlockRegex = /(?:```json\s*)?({[\s\S]*?"tool":\s*"send_email"[\s\S]*?})(?:\s*```)?/;
    const match = reply.match(emailBlockRegex);

    if (match && resendApiKey) {
      try {
        const emailData = JSON.parse(match[1]);
        const resend = new Resend(resendApiKey);

        console.log('Attempting to send email:', emailData);

        const { data, error } = await resend.emails.send({
          from: 'EVE <eve@chrisleebergstrom.com>',
          to: 'chrisleebergstrom@gmail.com',
          subject: `[EVE] ${emailData.subject}`,
          html: `<p><strong>Incoming transmission from EVE:</strong></p>
                 <p>${emailData.body}</p>
                 <hr/>
                 <p><small>Sent via EVE AI on chrisleebergstrom.com</small></p>`,
        });

        if (error) {
          console.error('Resend Error:', error);
        } else {
          console.log('Email sent successfully:', data);
        }

        reply = reply.replace(match[0], '').trim();
        if (!reply) {
          reply = "I've sent that transmission to Chris. 📨";
        }
      } catch (e) {
        console.error('Failed to process email tool:', e);
        reply += '\n\n(System Note: Failed to send email. Please try again later.)';
      }
    } else if (match && !resendApiKey) {
      console.warn('EVE tried to send email but RESEND_API_KEY is missing.');
      reply = reply.replace(match[0], '').trim();
      reply += '\n\n(System Note: Email capability is currently disabled/unconfigured.)';
    }

    console.log('Sending response:', { reply, responseId, success: true });
    return NextResponse.json(
      { reply, responseId, success: true },
      { status: 200, headers: noStoreHeaders },
    );
  } catch (error: any) {
    console.error('Chat API error:', error);

    if (error instanceof ClientError) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: error.statusCode, headers: noStoreHeaders },
      );
    }

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

      return NextResponse.json(
        { error: errorMessage, success: false },
        { status: statusCode >= 500 ? 503 : statusCode, headers: noStoreHeaders },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later', success: false },
      { status: 500, headers: noStoreHeaders },
    );
  }
}
