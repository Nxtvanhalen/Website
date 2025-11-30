# Walkthrough - Refine Notification UI & Processing State

## Changes

### 1. `components/PersistentChat.tsx` & `components/SectionTracker.tsx`
#### [MODIFY] [components/PersistentChat.tsx](file:///Users/chrisbergstrom/WEBSITE/components/PersistentChat.tsx)
#### [MODIFY] [components/SectionTracker.tsx](file:///Users/chrisbergstrom/WEBSITE/components/SectionTracker.tsx)
- **Layout Refinement**:
    - **Width**: Reduced to **`90px`** for an ultra-slim profile.
    - **Padding**: Reduced to **`p-2`** to maximize content space within the narrow bubble.
    - **Centering**: Adjusted margins (`mr-[-12px]`) and positioning (`right-[2px]`) to align the bubble visually over the EVE button.
- **Thinking Animation (SectionTracker)**:
    - Replaced the "Processing..." text and spinner with a **minimalist "Dancing Dots" animation**.
    - When EVE is thinking, the bubble shows *only* three purple dots bouncing in sequence.
    - Once processing is complete, it transitions to the standard message layout.

## Verification Results

### Automated Tests
- **Build Verification**: Ran `npm run build` successfully.
    - Result: `Exit code: 0`

### Manual Verification
- **Visual Check**:
    - Notifications should be `90px` wide and centered over the button.
    - **Thinking**: Should show 3 bouncing dots (no text).
    - **Message**: Should show Icon + Title + Text after thinking.
