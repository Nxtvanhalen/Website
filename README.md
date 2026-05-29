# CLB Consulting

**Next.js portfolio and consulting platform built through human-AI agent collaboration, featuring EVE — a self-aware AI concierge that understands her own architecture.**

Live: [chrisleebergstrom.com](https://chrisleebergstrom.com)

[![CI](https://github.com/Nxtvanhalen/Website/actions/workflows/ci.yml/badge.svg)](https://github.com/Nxtvanhalen/Website/actions/workflows/ci.yml)

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
- She renders markdown, maintains conversation context, and routes serious inquiries to Chris directly (she points visitors to his email — she has no outbound tools of her own)
- Her persona: "I filter the noise. Chris amplifies the signal."

EVE is not a chatbot bolted onto a website. She's a demonstration of what happens when the AI layer is a first-class citizen of the architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript, App Router |
| **Styling** | Tailwind CSS + custom CSS (Space Grotesk, dual parallax system) |
| **AI Chat** | OpenAI GPT-5 Responses API with configurable reasoning effort |
| **Analytics** | Google Analytics 4 with GDPR-compliant consent gating (vanilla-cookieconsent v3) |
| **Security** | Strict CSP with allowlisted external origins, edge middleware bot/IP blocking, input validation |
| **SEO** | JSON-LD structured data on every page, dynamic sitemap, Open Graph |
| **Accessibility** | WCAG 2.1 AA — skip nav, ARIA landmarks, keyboard navigation, screen reader support |
| **Performance** | Service worker with tiered caching, next/image optimization, ~97KB first load |
| **PWA** | Full manifest, offline support, installable |
| **Linting** | Biome (lint + format) |
| **CI/CD** | GitHub Actions (lint + build on every push and PR) |
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
- **No tribal knowledge** — environment quirks and CSP/nonce decisions are documented with symptoms, root cause, and solutions rather than left as oral tradition

The `docs/` folder contains the full development knowledge base:

| Document | Purpose |
|---|---|
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | Authoritative development guide — architecture, visual system, deployment, troubleshooting |
| [`docs/GPT5_MIGRATION.md`](docs/GPT5_MIGRATION.md) | Complete GPT-5 Responses API migration reference with code patterns |
| [`docs/CTA-PAGE-TEMPLATE.md`](docs/CTA-PAGE-TEMPLATE.md) | Full blueprint for building new service CTA pages |

---

## Project Structure

```
.
├── app/                      # Next.js App Router (routes, layouts, API routes)
│   ├── layout.tsx            # Root layout + per-request nonce CSP
│   ├── page.tsx              # Landing page (server) + IndexClient
│   ├── about/                # page.tsx (server) + AboutClient.tsx
│   ├── projects/             # Project archive
│   ├── news/                 # Press coverage
│   ├── blog/                 # Substack integration
│   ├── faq/                  # FAQ with structured data
│   ├── privacy/              # Privacy policy
│   └── api/
│       ├── chat/route.ts     # GPT-5 endpoint with rate limiting
│       └── substack/route.ts # RSS feed proxy
├── components/               # React components (ChatPanel, Header, etc.)
├── context/                  # React context (shared chat state)
├── styles/                   # Custom CSS (parallax, glow effects, animations)
├── public/                   # Static assets (images, videos, favicons, service worker)
├── docs/                     # AI-first documentation (see table above)
└── proxy.ts                  # Next.js middleware (bot/IP blocking)
```

---

## Quick Start

```bash
git clone git@github.com:nxtvanhalen/Website.git
cd Website
bun install
```

Create `.env.local`:
```bash
OPENAI_API_KEY=sk-your-openai-api-key
```

```bash
bun run dev
# Visit http://localhost:3000
```

> **Note**: The toolchain is Bun-first (CI pins the version via `.bun-version`). Use `bun run dev` for development and `bun run build && bun start` for a production build.

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

AGPL-3.0 — See [LICENSE](LICENSE) for details.
