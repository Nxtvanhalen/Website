# CLB Consulting

**Next.js portfolio and consulting platform built through human-AI agent collaboration, featuring EVE — a self-aware AI concierge that understands her own architecture.**

Live: [chrisleebergstrom.com](https://chrisleebergstrom.com)

---

## Production Metrics

| Category | Metric | Score |
|----------|--------|-------|
| **Lighthouse** | Performance | 96 |
| | Accessibility | 95 |
| | Best Practices | 100 |
| | SEO | 100 |
| **SSL/TLS** | SSL Labs Grade | A+ |
| **Security Headers** | HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy | 6/6 |
| **Protocol** | HTTP/2 + HTTP/3 | Active |
| **Response** | Time to First Byte | 78ms |
| **Compression** | Brotli | Active |
| **HTTPS** | Enforcement | 301 + HSTS preload |

All scores verified via Lighthouse (incognito), SSL Labs, and production header inspection.

---

## What This Is

This is the production website for Chris Lee Bergstrom's consulting practice, but it's also something more: a working example of an **AI-first codebase** — a project designed from the ground up to be developed, maintained, and extended by AI coding agents with human direction.

Every document in this repository is written to be consumed by future models. The architecture is explicit, the decisions are documented with rationale, and the codebase treats AI agents as first-class collaborators rather than autocomplete tools.

### EVE — The Self-Aware Concierge

EVE (Entertainment Vision Engine) is the AI chat assistant embedded in the site. She runs on GPT-5's Responses API with reasoning capabilities, and she knows exactly what she is:

- She understands her own architecture — the API routes that power her, the frontend components that render her, the rate limits that protect her
- She knows every project, every press mention, every page on the site
- She can send emails to Chris on a visitor's behalf via Resend
- She renders markdown, maintains conversation context, and routes serious inquiries to a human
- Her persona: "I filter the noise. Chris amplifies the signal."

EVE is not a chatbot bolted onto a website. She's a demonstration of what happens when the AI layer is a first-class citizen of the architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14, TypeScript, Pages Router |
| **Styling** | Tailwind CSS + custom CSS (Space Grotesk, dual parallax system) |
| **AI Chat** | OpenAI GPT-5 Responses API with configurable reasoning effort |
| **Email** | Resend (EVE sends visitor inquiries to Chris) |
| **Analytics** | Google Analytics 4 with GDPR-compliant consent gating (Osano) |
| **Security** | Nonce-based Content Security Policy, input validation, IP rate limiting |
| **SEO** | JSON-LD structured data on every page, dynamic sitemap, Open Graph |
| **Accessibility** | WCAG 2.1 AA — skip nav, ARIA landmarks, keyboard navigation, screen reader support |
| **Performance** | Service worker with tiered caching, next/image optimization, ~97KB first load |
| **PWA** | Full manifest, offline support, installable |
| **Hosting** | Render.com with auto-deploy on push |

---

## Features

### AI Integration
- **GPT-5 Responses API** with reasoning capabilities and 400k token context
- **Conversation continuity** via response ID chaining (no thread management overhead)
- **Self-aware system prompt** — EVE knows her own capabilities, limitations, and infrastructure
- **Rate limiting** — 20 requests/minute per IP to protect API budget
- **Graceful error handling** — client-friendly messages, server-side detailed logging

### Web Platform
- **Dual parallax backgrounds** with smooth scroll transitions
- **Typewriter animation** on hero text (Framer Motion, zero re-renders via `useMotionValue`)
- **Horizontal scrolling gallery** with edge fade effects
- **Scroll-triggered video** via Intersection Observer
- **Mobile-optimized chat** with smart keyboard recentering on dismiss
- **Cookie consent** with analytics blocking until opt-in
- **Dynamic Substack RSS integration** — native XML parsing, no external dependencies

### Content & SEO
- **6 structured pages**: Landing, About, Projects, News, Blog, FAQ
- **8 AI projects showcased** with individual schema markup
- **Press coverage**: Spotify, Bandcamp, YouTube, Mix Online, Music Radar
- **Full structured data**: Organization, LocalBusiness, Person, CollectionPage, FAQPage, BreadcrumbList
- **AI-friendly robots.txt** — welcomes GPTBot, Claude-Web, ChatGPT-User

---

## AI-First Development Philosophy

This codebase is built on a specific belief: **the next maintainer of your code is more likely to be an AI agent than a junior developer.** The documentation and architecture reflect that:

- **Verbose, context-rich docs** — every document explains not just _what_ but _why_, with explicit decision rationale that gives future agents the context they need to make good choices
- **Structured reference files** — tables, code blocks, and clear section hierarchy over prose paragraphs
- **Self-documenting architecture** — the directory structure, file naming, and component organization are designed to be navigable by agents doing codebase exploration
- **No tribal knowledge** — environment quirks (like the Node.js v22 + Next.js 14 CSS issue) are documented with symptoms, root cause, and solutions rather than left as oral tradition

The `docs/` folder contains the full development knowledge base:

| Document | Purpose |
|---|---|
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | Authoritative development guide — architecture, visual system, deployment, troubleshooting |
| [`docs/GPT5_MIGRATION.md`](docs/GPT5_MIGRATION.md) | Complete GPT-5 Responses API migration reference with code patterns |
| [`docs/TYPEWRITER_ANIMATION.md`](docs/TYPEWRITER_ANIMATION.md) | Feature specification for the hero typewriter animation |
| [`docs/CTA-PAGE-TEMPLATE.md`](docs/CTA-PAGE-TEMPLATE.md) | Full blueprint for building new service CTA pages |

---

## Project Structure

```
.
├── components/          # React components (ChatPanel, Header, Marquee, TypewriterText, etc.)
├── context/             # React context (ChatContext for shared chat state)
├── pages/               # Next.js pages + API routes
│   ├── api/chat.ts      # GPT-5 endpoint with rate limiting
│   ├── api/substack.ts  # RSS feed proxy
│   ├── index.tsx        # Landing page with parallax + EVE
│   ├── about.tsx        # Bio + profile
│   ├── projects.tsx     # 8 AI projects
│   ├── news.tsx         # Press coverage
│   ├── blog.tsx         # Substack integration
│   └── faq.tsx          # FAQ with structured data
├── styles/              # Custom CSS (parallax, glow effects, animations)
├── public/              # Static assets (images, videos, favicons, service worker)
├── docs/                # AI-first documentation (see table above)
└── middleware.ts        # Next.js middleware
```

---

## Quick Start

```bash
git clone git@github.com:nxtvanhalen/Website.git
cd Website
npm install
```

Create `.env.local`:
```bash
OPENAI_API_KEY=sk-your-openai-api-key
```

```bash
npm run build && npm start
# Visit http://localhost:3000
```

> **Note**: Use Node.js 18 or 20. Node.js 22 has a known CSS compilation issue with Next.js 14 in dev mode. Production builds work fine on any version. See `docs/DEVELOPMENT.md` for details.

---

## Related Projects

| Project | Description |
|---|---|
| [**byte-email**](https://github.com/Nxtvanhalen/byte-email) | AI email assistant — email byte@firstlyte.co and get an intelligent response. Hybrid LLM routing (DeepSeek + Claude), attachment processing, conversation threading. |

---

## Author

**Chris Lee Bergstrom** — Entertainment industry consulting meets artificial intelligence.

- Web: [chrisleebergstrom.com](https://chrisleebergstrom.com)
- GitHub: [@Nxtvanhalen](https://github.com/Nxtvanhalen)
- Twitter: [@CLBergstrom](https://twitter.com/CLBergstrom)

---

## License

MIT
