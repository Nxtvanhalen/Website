# Implementation Plan - Fix Canonical Tags

## Goal
Fix invalid `rel=canonical` tags to ensure each page points to its own specific URL, satisfying Lighthouse best practices and improving SEO.

## Proposed Changes

### `pages/home.tsx`
#### [MODIFY] [pages/home.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/home.tsx)
- Change `<link rel="canonical" href="https://chrisleebergstrom.com" />` to `<link rel="canonical" href="https://chrisleebergstrom.com/home" />`.

### `pages/about.tsx`
#### [MODIFY] [pages/about.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/about.tsx)
- Add `<link rel="canonical" href="https://chrisleebergstrom.com/about" />` to the `<Head>` section.

### `pages/news.tsx`
#### [MODIFY] [pages/news.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/news.tsx)
- Add `<link rel="canonical" href="https://chrisleebergstrom.com/news" />` to the `<Head>` section.

## Verification Plan

### Automated Tests
- **Build Verification**: Run `npm run build` to ensure no syntax errors.

### Manual Verification
- **Code Review**: Verify that each file has the correct canonical URL matching its route.
