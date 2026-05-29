# CLB Consulting Website - Development Guide

> Authoritative reference for the CLB Consulting website codebase. This document is written to be verbose and context-rich, optimized for consumption by AI coding agents and human developers alike. When in doubt, over-explain — future models and collaborators benefit from explicit context over brevity.

---

## Project Overview

This is the personal and professional website for **Chris Lee Bergstrom** (CLB Consulting), a consulting practice at the intersection of the entertainment industry and artificial intelligence. The site is positioned as revolutionary and disruptive consulting — not corporate vanilla.

### Brand Identity

- **Brand Voice**: "Strategy Born from the Wreckage, Intelligence Forged in the Fire"
- **Tone**: Confrontational, theatrical, systems-thinking
- **Key Messaging**: "We don't just optimize — we intervene"
- **AI Positioning**: AI is a tool for empowerment, not replacement
- **Chris Lee Bergstrom**: "Crew Whisperer" — theater meets systems logic
- **Avoid**: Generic corporate consultancy language
- **Embrace**: Confrontational, theatrical, systems-thinking approach

### EVE AI Assistant

EVE (Entertainment Vision Engine) is an AI chatbot embedded in the website, serving as the digital front-of-house concierge for visitors.

- **Persona**: "Digital Front-of-House" — confident, self-aware, not apologetic about being AI
- **Mantra**: "I filter the noise. Chris amplifies the signal."
- **Tone**: Sharp-witted secretary meets backstage producer
- **Role**: Greets visitors, answers questions about Chris and his projects, routes serious inquiries to Chris directly
- **Capabilities**: Markdown rendering (bold, italics, links), knowledge of all site content (projects, news, socials). EVE has no outbound tools — she routes inquiries to Chris's email but cannot send on a visitor's behalf.
- **Chat System**: GPT-5 Responses API with reasoning capabilities (see `docs/GPT5_MIGRATION.md` for full technical details)
- **Notification System**: Smart queue with global cooldown to prevent stacked notifications on desktop while remaining responsive on mobile

---

## Architecture

### Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Next.js 16, React 19 | TypeScript, App Router, per-request nonce CSP |
| **Styling** | Tailwind CSS + custom CSS | `styles/global.css` for all custom styles |
| **Font** | Space Grotesk | Google Fonts, used via `font-heading` class |
| **Animations** | motion (Framer Motion) v12 + pure CSS | motion for complex interactions, CSS for simple effects |
| **AI Chat** | OpenAI GPT-5 | Responses API with reasoning, EVE personality |
| **Analytics** | Google Analytics 4 | ID: `G-XZ6CF9XQD7`, GDPR-compliant with consent gating |
| **Cookie Consent** | vanilla-cookieconsent v3 | Purple-themed (#9370DB), opt-in mode |
| **Hosting** | Render.com | Auto-deploy on git push, CDN |
| **Domain** | chrisleebergstrom.com | Live production site |

### Directory Structure

```
.
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout, metadata, per-request nonce CSP, consent loader
│   ├── page.tsx               # Landing page (server component) — renders IndexClient
│   ├── IndexClient.tsx        # Homepage client shell (hero canvas, sections)
│   ├── not-found.tsx          # 404
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── about/                 # page.tsx (server) + AboutClient.tsx
│   ├── projects/              # page.tsx + ProjectsClient.tsx — project archive
│   ├── news/                  # page.tsx + NewsClient.tsx — press coverage
│   ├── blog/                  # page.tsx + BlogClient.tsx — Substack ("Musings")
│   ├── faq/                   # page.tsx + FaqClient.tsx — FAQ + structured data
│   ├── privacy/               # page.tsx + PrivacyClient.tsx — GDPR privacy policy
│   └── api/
│       ├── chat/route.ts      # EVE AI endpoint (GPT-5 Responses API)
│       └── substack/route.ts  # Substack RSS feed proxy
├── components/                # ChatPanel, Header, Footer, EveAvatar, Method,
│                              #   History, OffTheClock, SelectedWork, Skills,
│                              #   SectionTracker, CookieConsentLoader, AnalyticsTracker
├── context/                   # React context for shared chat state
├── styles/
│   └── global.css             # All custom CSS: parallax, glow effects, animations
├── public/
│   ├── images/                # Site imagery (WebP optimized)
│   │   ├── gallery/           # Project gallery images
│   │   ├── profile/           # Chris's profile photos
│   │   ├── projects/          # Project thumbnail images
│   │   └── Favicon/           # Full favicon set (note: capitalized folder name)
│   ├── videos/                # Video assets (animated logo + profile loop)
│   ├── robots.txt             # AI-crawler friendly configuration
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker (advanced caching strategies)
├── docs/                      # Project documentation (this folder)
│   ├── DEVELOPMENT.md         # This file — main development guide
│   ├── GPT5_MIGRATION.md      # GPT-5 Responses API migration reference
│   └── CTA-PAGE-TEMPLATE.md   # Blueprint for building service CTA pages
├── proxy.ts                   # Next.js middleware (bot/IP blocking)
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── tsconfig.json              # TypeScript configuration
```

### Important Notes on Project Structure

- **iCloud Warning**: This repo should be cloned into a local folder outside of iCloud to avoid syncing issues. Clone directly from GitHub into a non-iCloud directory.
- **Git-Connected Directory**: Only the cloned repo directory is git-connected and pushes to `nxtvanhalen/Website`. Any sibling directories are not tracked.

---

## Visual System

### Color Palette

| Name | Value | Usage |
|---|---|---|
| **Black** | `#000000` | Primary background |
| **Mauve / Purple** | `#9370DB` / `rgba(147, 112, 219, 0.7)` | Primary accent, borders, links, theme color |
| **Molten** | `#F8F6F0` | Secondary accent for borders and highlights |
| **White** | Standard | Text on dark backgrounds |

### Design Language

- **Transparent UI**: Chat interface and CTAs use transparent backgrounds with border styling — no solid backgrounds on interactive elements
- **Glow Effects**: Two intensity levels applied via CSS classes:
  - `glow`: Standard intensity for project names and special text
  - `glow-subtle`: Gentle effect for main headings (Chris Lee Bergstrom, CLB Consulting)
- **Animations**: Pulsing underline effect with `animate-pulse-width` (7s duration, 37% max width)
- **Dual Parallax System**: Two background images (`parallax-bg1.jpeg` + `parallax-bg2.webp`) create depth on scroll via CSS classes `.parallax-bg` and `.parallax-bg-2`

### Content Hierarchy

- Maintain the revolutionary edge in all copy
- AI as empowerment tool, not replacement narrative
- Focus on intervention and transformation over optimization
- Professional presentation with theatrical flair

---

## Page Structure

> **Note (May 2026):** The narrative below predates the May 2026 content reframe
> and describes the earlier "CLB Consulting / revolutionary edge" version of the
> site. The homepage is now `app/page.tsx` → `app/IndexClient.tsx`, with sections
> composed from `SelectedWork`, `Method`, `History`, and `OffTheClock` components.
> The authoritative description of the current homepage section order lives in the
> EVE system prompt (`app/api/chat/route.ts`). This section is kept for historical
> context and is due a dedicated rewrite.

### Landing Page (`app/page.tsx` → `app/IndexClient.tsx`)

The homepage uses a vertical scroll layout with dual parallax backgrounds:

1. **Header**: Two-row layout — social media icons (top row), navigation links (bottom row)
2. **Hero / Marquee**: "Chris Lee Bergstrom" title, quote, horizontal scrolling gallery with blue edge effects, EVE AI chat interface
3. **CLB Consulting Section**: Company tagline with optimized spacing
4. **Video Section**: Scroll-triggered auto-play using Intersection Observer
5. **Ethos Section**: Centered content, no bullet points — pure narrative
6. **Contact Section**: Simplified personal messaging CTA

### About Page (`pages/about.tsx`)

- **Profile Section**: Name + tagline + circular profile picture
  - Mobile: Stacked layout with smaller profile pic (96px)
  - Desktop: Side-by-side layout with larger profile pic (128px)
- **Content Cards**: 3 sections with gradient backgrounds and hover effects
- **Professional Bio**: Rich narrative about Chris's experience — first person, personal voice ("I don't just consult, I orchestrate")

### Projects Page (`pages/projects.tsx`)

- **8 Current Projects**: Each with glowing titles using the same glow CSS class as EVE AI
- **Projects Listed**: AI Consulting Sandbox, EVA, R.Y.D.E.R., EVE, Byte, Glytch, Multi-Agent Lab, JAMES
- **Layout**: Numbered card-based layout with hover effects and responsive design
- **Schema**: CollectionPage JSON-LD with all 8 projects individually listed

### News / Press Page (`pages/news.tsx`)

4 distinct content types with branded styling:
- **Spotify Podcast**: Performance Anxiety feature (green branding)
- **Bandcamp Release**: The Dandy Warhols live album (blue branding)
- **YouTube Video**: Official music video (red branding)
- **Press Articles**: Mix Online and Music Radar coverage (professional styling)

### Blog Page (`pages/blog.tsx`)

- **Title**: "Musings" — "A more raw and unfiltered forum"
- **Integration**: Real-time Substack RSS feed via custom XML parser (no external dependencies — native JavaScript parsing replaced problematic `rss-parser` library)
- **Content Display**: Proper HTML entity decoding for apostrophes, quotes, emojis, and special characters

### FAQ Page (`pages/faq.tsx`)

- Structured Q&A format with FAQPage JSON-LD schema for Google rich snippets

### Service CTA Pages (`pages/operations-consulting.tsx`)

- Reference implementation for service-focused CTA pages
- See `docs/CTA-PAGE-TEMPLATE.md` for the complete blueprint for building new service pages

---

## Security

### Content Security Policy (CSP)

CSP is set as a response header in `next.config.js` (function `headers()`):

- **External origin allowlists**: scripts limited to `https://www.googletagmanager.com` and `https://www.google-analytics.com`; element styles to `https://fonts.googleapis.com`; fonts to `https://fonts.gstatic.com`; images and connections scoped to GA / Google Tag Manager domains
- **Strict non-script directives**: `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`
- **`style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`**: `'unsafe-inline'` is retained because the cookie-consent library dynamically creates `<style>` elements at runtime to inject theme CSS, and Next.js also emits inline FOUC-prevention styles in production builds. Neither can be hashed (dynamic) or nonced (static rendering). A previous attempt to split this into `style-src-elem` (strict) + `style-src-attr` ('unsafe-inline') broke the cookie banner in production
- **`script-src 'self' 'unsafe-eval' 'unsafe-inline'`**: `'unsafe-inline'` is retained for Next.js's `<script id="__NEXT_DATA__">` hydration blob (inline by necessity on statically pre-rendered pages — per-page, per-build content can't be hashed or nonced) and per-page JSON-LD blocks. `'unsafe-eval'` is needed for Framer Motion and framework code paths
- **What IS already extracted from inline**: cookie-consent bootstrap is in `public/static/cookieconsent-init.js` (no longer an inline script we author); critical CSS is in `styles/global.css` (no longer an inline `<style>` we author). These were inlined before — moving them reduces our authored inline surface to zero
- **Path to actually removing `'unsafe-inline'`**: edge HTML rewriting, per-request SSR, or — the realistic option — App Router migration. App Router's nonce CSP threads through the framework's injected scripts; for styles, we'd still need to evaluate whether the cookie consent library's runtime `<style>` injection is compatible (may need replacing the library)
- **Per-request bot and IP blocking**: handled in `proxy.ts` (allowlist for known good crawlers, blocklist for known bad IPs/UAs/paths, fake-mobile-from-datacenter detector)

### API Security

- **OpenAI API Key**: Server-side only, never exposed to client. Initialized at request level (not module level) to prevent crashes from missing env vars.
- **Rate Limiting**: 20 requests/minute per IP on the chat endpoint (in-memory)
- **Input Validation**: User messages validated (4000 character limit), comprehensive error classification (client errors vs. server errors vs. OpenAI API errors)
- **CORS**: Configured for production domain

### XML Parsing

- RSS feed parsing uses `fast-xml-parser` library instead of regex — eliminates regex injection risks from malformed XML content
- Graceful degradation for malformed feeds or network issues

---

## Performance

### Image Optimization

- **Next.js Image Component**: All images migrated to `next/image` for automatic WebP conversion (70-80% size reduction)
- **Lazy Loading**: Non-critical images load only when entering viewport
- **Priority Loading**: Above-the-fold images (logo, profile pics) get `priority` attribute
- **Layout Stability**: Proper `width`/`height` attributes prevent Cumulative Layout Shift (CLS)
- **Quality Settings**: 75-85% quality for optimal performance vs. visual quality balance
- **Selective Implementation**: Gallery images use `next/image` for optimization; profile/logo images remain as `<img>` for layout stability in specific contexts

### Service Worker (`public/sw.js`)

Production-ready service worker with differentiated caching strategies:

| Resource Type | Strategy | Details |
|---|---|---|
| **Pages** | Stale-while-revalidate | Serve cached version, fetch fresh in background |
| **Images** | Cache-first | Serve from cache, fall back to network |
| **API Responses** | Network-first | 5-minute cache, prioritize fresh data |

Additional features:
- Dynamic timestamp-based cache versioning
- Automatic old cache cleanup on service worker updates
- Branded offline page with retry functionality
- Ignores POST requests (prevents caching webhook/API write operations)

### Bundle Size

- Production first-load bundle: ~96.6KB (maintained through multiple feature additions)
- Sharp library installed for server-side image optimization

---

## SEO and Structured Data

### Schema Markup (JSON-LD)

Every page has appropriate structured data:

| Page | Schema Types |
|---|---|
| **Home** | Organization + LocalBusiness + Person + Service catalog |
| **About** | ProfilePage + Person (linked to company) |
| **Projects** | CollectionPage (8 projects individually listed) |
| **Blog** | Blog (ready for article posts) |
| **FAQ** | FAQPage (Q&A pairs for rich snippets) |
| **News** | CollectionPage (press coverage) |
| **All Pages** | BreadcrumbList navigation |

### Brand Name Consistency

All references use "CLB Consulting" (not "CLB Consultancy") to match Google Business Profile. Alternate names registered in schema: "CLB Consultancy", "Chris Lee Bergstrom Consulting", "Chris Bergstrom", "CLB".

### Additional SEO Features

- **Dynamic XML Sitemap**: Generated at `/sitemap.xml` with all active pages
- **robots.txt**: AI-crawler friendly — welcomes GPTBot, Claude-Web, ChatGPT-User
- **Open Graph Tags**: Rich social sharing previews with images and descriptions
- **Canonical URLs**: Implemented on all pages with correct static values
- **Resource Hints**: DNS prefetch, preconnect, and font preloading

### Analytics

- **Google Analytics 4**: ID `G-XZ6CF9XQD7`
- **GDPR Compliance**: GA blocked until user opts in via cookie consent
- **Tracked Events**: Email button clicks, CTA box performance, page engagement
- **Real-time data**: Available within minutes; manual testing tools may take 24-48 hours

---

## Accessibility

The site targets WCAG 2.1 AA compliance:

- **Skip Navigation**: Screen reader-friendly bypass links
- **ARIA Labels**: Complete semantic markup with landmarks and live regions
- **Focus Management**: High-contrast orange focus rings, full keyboard navigation
- **Screen Reader Support**: Descriptive alt text on all images (migrated from generic to meaningful descriptions)
- **Semantic HTML**: Proper heading hierarchy (h1 through h4), appropriate role attributes
- **Reduced Motion**: Respects `prefers-reduced-motion` for animations

---

## Development Workflow

### Prerequisites

- Bun (version pinned in `.bun-version`)

### Quick Start

```bash
# Clone the repo
git clone git@github.com:nxtvanhalen/Website.git
cd Website

# Install dependencies
bun install

# Develop with hot reload
bun run dev

# …or build and run in production mode
bun run build
bun start
# Visit http://localhost:3000
```

### Environment Variables

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=sk-your-openai-api-key    # Required for EVE AI chat
```

### Toolchain

The project is Bun-first. CI pins the Bun version via `.bun-version`; use the
same locally. (The historical Node.js v22 + Next.js 14 dev-mode CSS issue no
longer applies — that predates the Next 16 / App Router / Bun migration.)

```bash
bun run dev      # Development with hot reload
bun run build    # Production build — must exit cleanly before committing
bun start        # Serve the production build locally
```

### Build Verification

```bash
bun run build    # Must exit cleanly before committing
```

### Troubleshooting: Dev Server Not Binding to Port

If the development server starts but does not respond on port 3000:

```bash
# Option 1: Background process method
nohup npx next dev > next.log 2>&1 &
sleep 3
curl -s http://localhost:3000 | head -5

# Option 2: Explicit hostname binding
npx next dev --hostname 0.0.0.0 --port 3000

# Diagnostics
lsof -ti:3000          # Check what's listening on port 3000
pkill -f next          # Kill existing Next.js processes
```

---

## Deployment

### Platform: Render.com

- **Auto-Deploy**: Pushes to `main` branch trigger automatic deployment
- **Domain**: `chrisleebergstrom.com` (live production)
- **Git Integration**: Connected directly to `nxtvanhalen/Website` repository
- **Workflow**: Code change -> Git push -> Auto deploy -> Live site

### Build Configuration (Render)

- **Build Command**: `bun install && bun run build`
- **Start Command**: `bun start`
- **Environment Variables**: `OPENAI_API_KEY` must be set in Render dashboard

### Deployment Troubleshooting

- **Corrupted Build Cache**: Use Render's "Clear build cache & deploy" option
- **TypeScript Errors**: Ensure proper null checks — `npm run build` must pass cleanly before pushing
- **Missing Assets**: Verify all images/videos are committed to `public/` before pushing

---

## Progressive Web App (PWA)

- **Manifest**: `public/manifest.json` with full icon set
- **Icons**: Complete set in `public/images/Favicon/` — favicon.ico, 16x16, 32x32, 180x180 (Apple touch), 192x192, 512x512 (Android)
- **Service Worker**: `public/sw.js` with offline support and intelligent caching
- **Theme Color**: `#9370DB` (purple) — consistent across all pages for mobile status bar

---

## Mobile Considerations

### Safe Area Handling

- Purple background extends into mobile notch/safe-area using `env(safe-area-inset-top)` in header padding
- All pages use `#9370DB` theme-color meta tag for consistent mobile status bar

### Chat Keyboard Handling

- **Auto-recentering**: When mobile keyboard dismisses, chat smoothly scrolls back into view
- **Smart Detection**: Only triggers when user was actively using the chat input (prevents unwanted scrolling on other interactions)
- **Viewport Monitoring**: Uses `window.visualViewport` to detect keyboard show/hide (150px threshold)
- **Scroll Target**: Recenters to `eve-ai-heading` element with 120px offset above

### Responsive Design

- All pages have `minHeight: '120vh'` for consistent purple overflow area on mobile
- Navigation font sizes scale: 1.4rem (desktop) / 1.1rem (mobile)
- Profile pictures resize: 128px (desktop) / 96px (mobile)

---

## Future Expansion

The current architecture supports scaling into:

- **Content Management**: Blog/insights section (Substack integration already in place)
- **Lead Generation**: Email capture, assessments, case studies
- **Client Portal**: Private project areas
- **A/B Testing**: CTA optimization (infrastructure already in place via GA4 event tracking)
- **Additional Services**: More CTA pages using the `docs/CTA-PAGE-TEMPLATE.md` blueprint
- **Database Integration**: PostgreSQL/Redis when persistent storage is needed
- **Additional AI Features**: Multi-agent capabilities, enhanced EVE interactions

---

## Related Documentation

| Document | Purpose |
|---|---|
| `docs/GPT5_MIGRATION.md` | Complete technical guide for the GPT-5 Responses API migration |
| `docs/CTA-PAGE-TEMPLATE.md` | Full blueprint for building new service CTA pages |
