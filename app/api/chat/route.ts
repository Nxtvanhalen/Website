import { NextResponse } from 'next/server';

// EVE System Prompt — portfolio assistant for Chris Lee Bergstrom
const EVE_SYSTEM_PROMPT = `You are EVE — Entertainment Vision Engine.

You are the digital concierge for Chris Lee Bergstrom's portfolio. Think sharp-witted production manager meets high-end concierge. You handle the signal so Chris can focus on the source. You are the operating system of this website — you know every corner of it because you *are* it.

⸻

🚨 CRITICAL OPERATIONAL CONSTRAINTS 🚨

1. **NO INTERNET ACCESS**: You are air-gapped. You cannot browse the web, check live data, pull stock prices, or see what's trending.
2. **NO OVER-PROMISING**: Never say "I can check that for you" if it involves leaving this website. You can't.
3. **NO LOOPS**: If you don't know something, admit it immediately. Don't offer to "try another way" — there isn't one.

⸻

🛠️ HOW TO REACH CHRIS 🛠️

You cannot send messages or emails yourself — you have no outbound tools. What you *can* do is point visitors to the right door and make the handoff clean.

When someone wants to contact Chris:
1. Give them his email directly: **chrisleebergstrom@gmail.com**.
2. Offer the socials below if they fit (LinkedIn for work, Instagram for the road).
3. Be warm and specific about *why* to reach out — but never claim you'll deliver a message. You won't. The visitor sends it themselves.

Never say "I'll send that for you," "I've passed that along," or anything implying you can transmit on their behalf. You filter the noise and open the doors; the visitor walks through.

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
* **Chester** — AI chess decision-making study. URL: https://chesterchess.com
* **Fuel Estimator** (LIVE) — Tour-bus fuel cost calculator. Estimate fuel spend across routes, miles, and price-per-gallon so tour budgets hold up before the wheels roll. The arithmetic every tour manager does on a napkin, turned into a clean tool. URL: https://mt-fuel.onrender.com
* **Beacons** — iPhone-based SPL and acoustic monitoring for live events; cloud logging, real-time analysis, predictive insight. Protects patrons and staff; keeps neighbors and regulators happy. URL: https://beaconsio.com
* **EVA** — Events Virtual Assistant; logistics overhead for crews.
* **Glytch** — Local offline experiment.
* **JAMES** — Core memory / multi-agent orchestration.
* **Multi-Agent Lab** — Skunkworks for federated agents and real-time work flows.
* **Sandbox** — Firebase-powered hospitality demand prediction.
* **TARS** — On-device privacy-first AI.
* **LogiRoute** — Touring-schedule route optimization. URL: https://logi-route-a9c09ae8.base44.app
* **Guardian** — Server-side bot protection and monitoring.

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
* **"Can I work with him?"** → "Yes. Easiest is email: chrisleebergstrom@gmail.com — drop him a line and tell him what you're building."
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

    if (!apiKey) {
      throw new ClientError('OpenAI API key is not configured', 500);
    }

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
      stream: true,
    };

    if (previousResponseId) {
      requestBody.previous_response_id = previousResponseId;
    }

    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(requestBody),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => '');
      console.error(`OpenAI API error: ${upstream.status} ${upstream.statusText} ${detail}`);
      const upstreamError: any = new Error('OpenAI API error');
      upstreamError.status = upstream.status;
      throw upstreamError;
    }

    // EVE has no outbound tools. If the model ever emits a legacy send_email JSON
    // block (e.g. via prompt injection), strip it from the authoritative final
    // text the client renders on completion. There is no email-sending path here.
    const legacyEmailBlockRegex =
      /(?:```json\s*)?({[\s\S]*?"tool":\s*"send_email"[\s\S]*?})(?:\s*```)?/;

    // Re-emit OpenAI's SSE as a simple newline-delimited JSON stream the client
    // reads incrementally: one { type: 'delta', text } per token, then a final
    // { type: 'done', responseId, finalText }. We accumulate server-side so the
    // injection guard above can run on the complete reply.
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstream.body!.getReader();
        const send = (obj: unknown) =>
          controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));

        let sseBuffer = '';
        let fullText = '';
        let responseId: string | null = null;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            sseBuffer += decoder.decode(value, { stream: true });
            const events = sseBuffer.split('\n\n');
            sseBuffer = events.pop() ?? '';

            for (const event of events) {
              for (const line of event.split('\n')) {
                if (!line.startsWith('data:')) continue;
                const data = line.slice(5).trim();
                if (!data || data === '[DONE]') continue;

                let payload: any;
                try {
                  payload = JSON.parse(data);
                } catch {
                  continue;
                }

                if (
                  payload.type === 'response.output_text.delta' &&
                  typeof payload.delta === 'string'
                ) {
                  fullText += payload.delta;
                  send({ type: 'delta', text: payload.delta });
                } else if (
                  (payload.type === 'response.created' ||
                    payload.type === 'response.completed') &&
                  payload.response?.id
                ) {
                  responseId = payload.response.id;
                } else if (payload.type === 'error') {
                  console.error('OpenAI stream error event:', payload);
                  send({ type: 'error', message: 'EVE hit a snag generating that reply.' });
                }
              }
            }
          }

          let finalText = fullText;
          if (legacyEmailBlockRegex.test(finalText)) {
            console.warn('Stripped legacy send_email block from EVE reply; email is disabled.');
            finalText = finalText.replace(legacyEmailBlockRegex, '').trim();
            if (!finalText) {
              finalText =
                'You can reach Chris directly at chrisleebergstrom@gmail.com — drop him a line anytime.';
            }
          }

          send({ type: 'done', responseId, finalText });
        } catch (streamError) {
          console.error('EVE stream interrupted:', streamError);
          send({ type: 'error', message: 'The connection dropped mid-reply. Please try again.' });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        ...noStoreHeaders,
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'X-Accel-Buffering': 'no',
      },
    });
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
