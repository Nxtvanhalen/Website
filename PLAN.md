# Implementation Plan - Add Missing JSON-LD

## Goal
Add structured data (JSON-LD) to `projects.tsx` and `index.tsx` to improve search engine understanding of the content.

## Proposed Changes

### `pages/projects.tsx`
#### [MODIFY] [pages/projects.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/projects.tsx)
- Add `CollectionPage` schema listing the projects (Master Tour, EVA, Ryder, etc.) as `hasPart` or `mainEntity`.

### `pages/index.tsx`
#### [MODIFY] [pages/index.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/index.tsx)
- Add `Organization` and `WebSite` schema (similar to `home.tsx` but simplified for the splash page) to establish the brand entity at the root domain.

## Verification Plan

### Automated Tests
- **Build Verification**: Run `npm run build`.

### Manual Verification
- **Code Review**: Verify the JSON-LD structure is valid.
