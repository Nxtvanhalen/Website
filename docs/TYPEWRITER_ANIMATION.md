# Typewriter Animation - Feature Specification

> Implementation plan for the Framer Motion typewriter effect on the "Chris Lee Bergstrom" title text. This document covers the component architecture, animation timeline, visual effects, and testing requirements.

## Overview

Add a sophisticated Framer Motion typewriter effect to the "Chris Lee Bergstrom" title text on the landing page, maintaining exact styling while adding an engaging animation on page load.

---

## Current State Analysis

### Existing Title Element
- **Location**: `/pages/index.tsx` (Lines 78-80)
- **Current Implementation**:
  ```tsx
  <h1 className="text-3xl md:text-4xl font-heading font-medium" 
      style={{color: 'rgba(147, 112, 219, 0.7)'}}>
    Chris Lee Bergstrom
  </h1>
  ```
- **Styling**: 
  - Font sizes: `text-3xl` (mobile) / `text-4xl` (desktop)
  - Font family: `font-heading` (Space Grotesk)
  - Color: Purple/mauve (`rgba(147, 112, 219, 0.7)`)
  - Weight: `font-medium`

### Technology Stack
- **Framer Motion**: v10.12.16 (already installed)
- **React**: v18.2.0
- **TypeScript**: v5.8.3
- **Next.js**: v14.0.0

---

## Implementation Strategy

### 1. TypewriterText Component Architecture

#### Core Features
- **Performance-First Design**: Using `useMotionValue` + `useTransform` for zero re-renders
- **Configurable Animation**: Adjustable speed, delays, and easing
- **Optional Cursor**: Blinking vertical bar with customizable appearance
- **TypeScript Support**: Full type safety with proper interfaces
- **Accessibility**: ARIA labels for screen readers

#### Technical Implementation
```typescript
// Core motion values pattern (verified for 2025)
const count = useMotionValue(0);
const rounded = useTransform(count, Math.round);
const displayText = useTransform(rounded, (latest) => 
  text.slice(0, latest)
);

// Animation configuration
animate(count, text.length, {
  type: "tween",
  duration: text.length * 0.1, // 100ms per character
  ease: "linear",
  delay: 0.5 // 500ms initial delay
});
```

#### Component Props Interface
```typescript
interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number; // ms per character
  delay?: number; // initial delay in ms
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}
```

---

### 2. Visual Effects

#### Typewriter Glow Animation
Create a purple glow effect that activates after typing completes:

```css
@keyframes typewriter-glow {
  0% { 
    text-shadow: none;
  }
  100% { 
    text-shadow: 
      0 0 10px rgba(147, 112, 219, 0.8),
      0 0 20px rgba(147, 112, 219, 0.6),
      0 0 30px rgba(147, 112, 219, 0.4);
  }
}

.typewriter-glow {
  animation: typewriter-glow 2s ease-in forwards;
  animation-delay: 2.4s; /* Triggers after typing completes */
  will-change: text-shadow;
}
```

#### Optional Cursor Animation
```css
@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.typewriter-cursor {
  animation: cursor-blink 1s infinite;
  color: rgba(147, 112, 219, 0.7);
}
```

---

## Performance Optimizations

### Motion Value Benefits (Confirmed 2025 Best Practices)
1. **Direct DOM Updates**: Bypasses React reconciliation
2. **No Re-renders**: Component doesn't re-render during animation
3. **GPU Acceleration**: Leverages hardware acceleration
4. **Smooth 60fps**: Consistent frame rate across devices

### Implementation Optimizations
- Use `will-change` CSS property for GPU optimization
- Implement proper cleanup in `useEffect` hooks
- Add error boundaries for production resilience
- Memoize expensive calculations

---

## Files to Modify/Create

### New Files
1. **`/components/TypewriterText.tsx`**
   - Reusable typewriter component
   - Full TypeScript implementation
   - Exports for use across the site

### Modified Files
1. **`/pages/index.tsx`**
   - Import TypewriterText component
   - Replace static h1 with animated version
   - Maintain all existing styles

2. **`/styles/global.css`**
   - Add typewriter-glow keyframes
   - Add cursor-blink animation (optional)
   - Ensure GPU optimization classes

---

## Animation Timeline

### Sequence of Events
1. **0ms**: Page loads, component mounts
2. **500ms**: Initial delay (configurable)
3. **500-2400ms**: Text types out (19 chars × 100ms)
4. **2400ms**: Typing completes
5. **2400-4400ms**: Glow effect fades in
6. **4400ms+**: Final state with full glow

---

## Testing Checklist

### Functionality
- [ ] Text types character by character
- [ ] Animation starts after page load
- [ ] Glow effect triggers after typing
- [ ] No performance issues or frame drops
- [ ] Proper cleanup on unmount

### Cross-Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers

### Responsive Design
- [ ] Mobile portrait (text-3xl)
- [ ] Mobile landscape
- [ ] Tablet
- [ ] Desktop (text-4xl)
- [ ] Ultra-wide screens

### Accessibility
- [ ] Screen reader compatibility
- [ ] Reduced motion preference respected
- [ ] Keyboard navigation unaffected
- [ ] ARIA labels present

---

## Future Enhancements

### Potential Additions
1. **Multiple Text Cycling**: Rotate through different titles/descriptions
2. **Backspace Effect**: Delete and retype for dynamic content
3. **Variable Speed**: Natural typing with punctuation pauses
4. **Sound Effects**: Optional typing sounds (with user preference)
5. **Advanced Cursor**: Different cursor styles (underscore, block, etc.)

### Integration Opportunities
- Apply to other text elements across the site
- Create preset animations for different use cases
- Build animation library for consistent motion design
- Add to Chester AI Chess project for typing effects

---

## Code Quality Standards

### Production Requirements (Per Chris's Preferences)
- **Resilient**: Error boundaries and fallbacks
- **Scalable**: Reusable component architecture
- **Performance**: GPU-optimized, 60fps animations
- **Elegant**: Smooth, professional animations
- **Debug-Ready**: Verbose logging in development
- **TypeScript**: Full type safety throughout

### Best Practices
- Follow existing codebase conventions
- Use existing libraries (Framer Motion v10)
- Implement proper loading states
- Add comprehensive error handling
- Include inline documentation

---

## Implementation Notes

### Key Decisions
1. **useMotionValue over useState**: Prevents re-renders, better performance
2. **Linear easing**: Consistent typing speed (can be customized)
3. **100ms per character**: Natural typing speed
4. **500ms initial delay**: Allows page to settle before animation
5. **2s glow fade**: Smooth, non-jarring effect

### References
- [Motion.dev Documentation](https://motion.dev/docs/react-typewriter)
- [Framer Motion v10 API](https://www.framer.com/motion/)
- [React 18 Best Practices](https://react.dev/)
- Current implementation: `/pages/index.tsx:78-80`

---

## Summary

This implementation creates a professional, performant typewriter animation for the "Chris Lee Bergstrom" title that:
- Maintains exact current styling and positioning
- Adds engaging motion on page load
- Follows 2025 best practices for Framer Motion
- Optimizes for production-ready performance
- Scales elegantly across all devices

The solution prioritizes performance, elegance, and maintainability while creating a memorable first impression for visitors to the CLB Consulting website.