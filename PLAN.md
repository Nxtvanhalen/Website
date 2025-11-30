# Implementation Plan - Refine Notification UI & Processing State

## Goal
Optimize notification layout (narrower, centered) and replace the "processing" text with a minimalist "dancing dots" animation.

## Proposed Changes

### `components/PersistentChat.tsx`
#### [MODIFY] [components/PersistentChat.tsx](file:///Users/chrisbergstrom/WEBSITE/components/PersistentChat.tsx)
- **Padding**: Change `p-4` to `p-2`.
- **Width**: Reduce `max-w-[110px]` to `max-w-[90px]`.
- **Centering**: Add `mr-[-12px]` to align visually over the button.

### `components/SectionTracker.tsx`
#### [MODIFY] [components/SectionTracker.tsx](file:///Users/chrisbergstrom/WEBSITE/components/SectionTracker.tsx)
- **Padding**: Change `p-4` to `p-2`.
- **Width**: Reduce `max-w-[110px]` to `max-w-[90px]`.
- **Positioning**: Change `right-4` to `right-[2px]`.
- **Processing UI**:
    - When `isThinking` is true:
        - Hide the standard Icon/Title/Text.
        - Render a centered "Dancing Dots" animation (3 dots bouncing sequentially).
    - When `isThinking` is false:
        - Show the standard content (Icon + Title + Message).

## Verification Plan

### Automated Tests
- **Build Verification**: Run `npm run build`.

### Manual Verification
- **Visual Check**:
    - Verify notifications are `90px` wide and centered.
    - **Thinking State**: Trigger a scroll. Verify the bubble shows ONLY bouncing dots.
    - **Message State**: Verify it transitions to the text message after thinking.
