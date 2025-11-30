# Walkthrough - Add Privacy Policy Link

## Changes

### `pages/home.tsx`

#### [MODIFY] [pages/home.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/home.tsx)
- **Added Footer**: Inserted a footer section after the `<Contact />` component.
- **Added Link**: Included a small, muted "Privacy Policy" link pointing to `/privacy`.

## Verification Results

### Automated Tests
- **Build Verification**: Ran `npm run build` successfully.
    - Result: `Exit code: 0`

### Manual Verification
- **Visual Check**: The link should appear at the very bottom of the home page, centered and subtle (opacity 50%).
- **Interaction**: Hovering over the link should increase its opacity to 100%.
