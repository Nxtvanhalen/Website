# Walkthrough - Fix Canonical Tags

## Changes

### 1. Fixed `pages/home.tsx`
#### [MODIFY] [pages/home.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/home.tsx)
- **Corrected Canonical URL**: Changed `href="https://chrisleebergstrom.com"` to `href="https://chrisleebergstrom.com/home"`. This ensures search engines distinguish the Home page from the Splash page.

### 2. Added Missing Tags
#### [MODIFY] [pages/about.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/about.tsx)
- **Added Canonical URL**: Added `href="https://chrisleebergstrom.com/about"`.

#### [MODIFY] [pages/news.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/news.tsx)
- **Added Canonical URL**: Added `href="https://chrisleebergstrom.com/news"`.

## Verification Results

### Automated Tests
- **Build Verification**: Ran `npm run build` successfully.
    - Result: `Exit code: 0`

### Manual Verification
- **Code Check**: Verified that `home.tsx`, `about.tsx`, and `news.tsx` now have explicit and correct `rel="canonical"` tags.
