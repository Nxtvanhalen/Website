# Implementation Plan - Add Privacy Policy Link

## Goal
Add a small "Privacy Policy" link at the very bottom of the home page (`/home`).

## Proposed Changes

### `pages/home.tsx`

#### [MODIFY] [pages/home.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/home.tsx)
- Add a footer section after the `<Contact />` component.
- Include a link to `/privacy` with the text "Privacy Policy".
- Style it to be small, centered, and consistent with the site's aesthetic (likely muted color).

## Verification Plan

### Automated Tests
- **Build Verification**: Run `npm run build` to ensure no syntax errors.

### Manual Verification
- **Visual Check**: Verify the link appears at the bottom of the page.
- **Link Check**: Verify clicking it navigates to `/privacy`.
