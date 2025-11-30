# Implementation Plan - Slide Content Up

## Goal
Move the entire content block (profile picture and text) closer to the header on mobile, reducing the top buffer.

## Proposed Changes

### `components/Marquee.tsx`
#### [MODIFY] [components/Marquee.tsx](file:///Users/chrisbergstrom/WEBSITE/components/Marquee.tsx)
- **Reduce Top Padding**: Change `pt-40` to `pt-36` (or back to `pt-32` if `pt-40` was too much). Since the header is now more compact, we can afford to be tighter. I'll try `pt-36` as a middle ground.

## Verification Plan

### Automated Tests
- **Build Verification**: Run `npm run build`.

### Manual Verification
- **Visual Check**: Verify the content sits higher up, closer to the header, without overlapping.
