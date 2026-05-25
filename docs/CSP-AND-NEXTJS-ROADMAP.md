# CSP and Next.js Roadmap

> Forward-looking roadmap for Content Security Policy hardening, Next.js framework upgrades, and the architectural decisions that gate them. Captures lessons from the 2026-05-24 hardening session so future work avoids the same dead ends.

---

## Current state (as of 2026-05-24, commit `56c27e1`)

**Framework**: Next.js 14.2.35 (Pages Router), React 18, Tailwind 3.4.19, OpenAI 5.23.2, TypeScript 5.9.3. Bun 1.3.8 pinned in CI.

**Rendering**: every public page is statically pre-rendered at build time. No page uses `getServerSideProps` (only `_document.tsx` and `pages/sitemap.xml.tsx` use any SSR primitives). This is the architectural fact that gates everything else on this list.

**CSP** (set in `next.config.js` `headers()`):
- `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com`
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
- Strict non-script directives: `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`
- Image / font / connect / media src scoped to GA + Google Tag Manager origins

**Inline scripts/styles of our authorship**: zero. Cookie-consent bootstrap is in `public/static/cookieconsent-init.js`; critical CSS is in `styles/global.css`. The only remaining inline content is Next.js's `<script id="__NEXT_DATA__">` hydration blob, per-page JSON-LD blocks, and Next.js's runtime FOUC `<style data-next-hide-fouc>` tags. All require `'unsafe-inline'` and are not removable without architectural change.

**Automation**: Dependabot watches `bun` + `github-actions` weekly (Mondays 9am PT), with majors ignored for `next` / `react` / `react-dom` / `tailwindcss` / `openai` / `typescript` / `@types/*` so framework migrations land deliberately.

---

## Session log: PRs landed 2026-05-24

| # | Title | What it shipped |
|---|---|---|
| 1 | Bump deps, add Dependabot, pin Bun in CI | `fast-xml-parser` 5.2.5→5.8.0 (critical CVE), `next` 14.2.35, `openai` 5.23.2, Dependabot config, Bun pinned to 1.3.8 |
| 2 | Bump actions/checkout 4→6 | Dependabot's first auto-PR, validating the config |
| 3 | Clear lint warnings, delete unused `TypewriterText`, fix `useCallback` bug | 8 lint warnings → 0; real bug: `handlePauseVideos` re-identity caused effect to re-run every render |
| 4 | Correct README CSP claim + remove dead nonce code | README falsely claimed nonce-based CSP; `_document.tsx` had nonce code that was overridden by `next.config.js` AND wouldn't work on static pages anyway |
| 5 | Strip stale doc references | TypewriterText references in `README.md` + `docs/DEVELOPMENT.md`; deleted `docs/TYPEWRITER_ANIMATION.md` (261-line spec for a feature that never shipped) |
| 6 | Extract inline scripts/styles | Cookie-consent init → `public/static/cookieconsent-init.js`; critical CSS → `styles/global.css`; `_document.tsx` 117→22 lines |
| 7 | Hotfix: revert style-src split | PR #6 had also split `style-src` into `style-src-elem` (strict) + `style-src-attr`; broke cookie consent in prod because the library runtime-injects `<style>` elements via `document.createElement('style')` + `.sheet.insertRule(...)` |

---

## Deferred work, in priority order

### 1. App Router migration (the big one)

**Why first**: it's the single architectural change that unlocks most of the items below. Doing those items before this means writing throwaway bridge code.

**What it gets you**:
- Real nonce-based CSP (App Router threads nonces through framework-injected scripts via `next/headers`)
- React Server Components — drop ~178KB first-load JS bundle significantly
- Server Actions — `/api/chat` and Contact form become co-located server functions instead of separate API routes
- Streaming SSR + Suspense — better TTFB, granular loading states
- Partial Pre-Rendering (Next 15+) — static shell + dynamic holes in same page
- Turbopack production builds — faster dev + build cycles
- Better error boundaries via `error.tsx` / `loading.tsx` / `not-found.tsx` per route

**Scope**: ~2-3 focused days for this codebase. ~15 page files + 2 API routes + ~10 components to audit for client/server boundary. Plus regression testing every visual + interactive feature.

**Migration shape**:
- `pages/*.tsx` → `app/*/page.tsx` (folder-per-route)
- `_app.tsx` + `_document.tsx` → `app/layout.tsx` + Metadata API
- `pages/api/*.ts` → `app/api/*/route.ts` (different handler signature)
- Mark interactive components (Marquee, Contact, anything with hooks/event handlers) with `"use client"` directive
- Upgrade to Next 15 or 16 at the same time

**Should be its own scoped project, not bolted onto smaller work.**

### 2. Strip `'unsafe-inline'` from `script-src` (downstream of #1)

With App Router done, set per-request nonce in middleware via `NextResponse.next({ request: { headers: { 'x-nonce': nonce } } })` and Server Components read it via `headers()` from `next/headers`. The framework auto-threads the nonce through `__NEXT_DATA__` (or its App Router equivalent — there's an `<script>` for RSC payloads that needs the same treatment).

### 3. Replace cookie consent library (downstream of #1)

**Why**: the current Osano library does runtime `<style>` injection via `document.createElement('style')` + `.sheet.insertRule(...)`. Incompatible with strict `style-src-elem` (no `'unsafe-inline'`). Even with App Router nonces, this pattern can't be made strict-CSP-compatible — the dynamically created `<style>` element can't be nonced after creation.

**Options when ready**:
- **Roll our own** (~100-150 lines): show banner, persist consent to localStorage, fire callbacks on Accept/Deny. Full control, CSS-class-based only, no runtime style injection. This is the cleanest path.
- **vanilla-cookieconsent v3**: modern fork that uses CSS variables for theming. CSP-friendly. ~25KB.
- **Klaro**: another CSP-aware open-source option.

**Why not do this independently**: pointless until `style-src` is otherwise ready to be tightened. Until then, `'unsafe-inline'` is needed anyway (Next.js's own runtime style injection forces it), so swapping the library is no-op security-wise.

### 4. Strip `'unsafe-inline'` from `style-src` (downstream of #1 AND #3)

Requires both:
- App Router (for nonce support on Next.js's framework styles)
- Cookie consent replaced (so no library runtime-injects `<style>` elements)

Plus: audit Tailwind/CSS-in-JS interaction with nonce CSP — some setups inject `<style>` tags at runtime in dev and need explicit nonce handling.

### 5. Reduce React inline `style={{}}` usage (always-on opportunity, optional)

The site has ~149 `style={{}}` props. Most are necessary (parallax transforms, Framer Motion bindings, dynamic colors). A subset are static and could move to Tailwind classes. Net security gain: small (style-src-attr is a much lower-leverage XSS lever than script-src). Net code quality gain: moderate. **Worth doing opportunistically, not as a dedicated project.**

### 6. Other items lurking in the audit

- Lint warnings: currently 0 (cleared in #3). Keep at 0.
- Inline `style={{}}` props: see #5.
- `'unsafe-eval'` in `script-src`: needed for Framer Motion and some Next.js framework paths. Re-evaluate after App Router migration — App Router + Next 15+ may not need it.

---

## Gotchas learned this session (read before retrying)

1. **Nonce CSP on Pages Router with static pre-rendering is architecturally infeasible.** `ctx.req` is `undefined` in `_document.getInitialProps` at build time. Don't try to wire up nonces in `_document.tsx` — verified empirically; every `nonce={nonce}` rendered as `nonce=""`. See git log around 2026-05-24 for the dead-end branch.

2. **`'unsafe-inline'` is NOT just there for Google Analytics.** GA loads from `https://www.googletagmanager.com` — covered by the host allowlist, doesn't need `'unsafe-inline'`. The actual things needing `'unsafe-inline'` in script-src: Next.js's `<script id="__NEXT_DATA__">` hydration blob (`type="application/json"`) and per-page JSON-LD blocks (`type="application/ld+json"`). Both are inline data, not executable, but CSP enforces script-src on them regardless of type.

3. **`style-src-elem` strict cannot ship while the current cookie consent library is in use.** PR #6 tried it, PR #7 reverted it. The library creates `<style>` elements at runtime — strict `style-src-elem 'self'` blocks them, `element.sheet` returns `null`, `cookieconsent.initialise()` throws on `u.sheet.insertRule(...)`.

4. **Next.js emits inline `<style data-next-hide-fouc>` tags in PRODUCTION too**, not just dev. Don't assume dev-only behavior — verify in a real production build before tightening style-src.

5. **Hash-based CSP for the JSON-LD blocks is technically possible but pointless while `'unsafe-inline'` is still required for `__NEXT_DATA__`.** Adding hashes alongside `'unsafe-inline'` does nothing — browsers use the most permissive matching rule. Hashes would only become useful after App Router removes the need for `'unsafe-inline'` on `__NEXT_DATA__`.

6. **After deploys, hard-refresh in the browser before debugging "broken site" reports.** Next.js generates a new `buildId` per build. Static HTML hardcodes the buildId into asset paths. Cached old HTML → 404s on new buildId asset paths → cascade of `nosniff` rejection + router hard-navigate errors. Hard refresh (Cmd+Shift+R) clears the HTML cache.

---

## Recommended sequencing for next session

1. **Plan the App Router migration as a deliberate project.** Pick a focused 2-3 day window. Branch off `main`. Migrate one route at a time, smoke-testing each. Use Next 15 (or 16 if stable when you start) and React 19. Coordinate the deps bump in the same branch.
2. **In the App Router branch, also do nonce CSP** — they're natural together.
3. **Replace cookie consent library** in the same branch or immediately after — required to fully tighten `style-src`.
4. **Drop `'unsafe-inline'` from both `script-src` and `style-src`.** Test exhaustively before deploy. Ship behind `Content-Security-Policy-Report-Only` first if you want a safety net.
5. **Opportunistically reduce inline `style={{}}` usage** during App Router page rewrites — natural to do while the file is open anyway.

---

## Background

The hardening direction came from external reviews by Codex and Gemini, plus this assistant's analysis. The session ended with a "Gemini-corrected hybrid" approach: extract what's extractable without forcing SSR or migrating to App Router. The remaining gap (`'unsafe-inline'` for framework + library runtime styles) is intentionally deferred to App Router migration because doing it sooner would mean writing throwaway code or regressing performance via SSR-everywhere.

The full debate between Codex's plan (force SSR + nonce now), Gemini's plan (extract inline + claim JSON-LD isn't CSP-controlled), and the eventual hybrid is in the chat history for that session date if needed.
