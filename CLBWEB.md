# CLB Consulting Website - Development Guide

## Project Overview

Chris Lee Bergstrom's theatrical consulting website - positioned as revolutionary/disruptive consulting, not corporate vanilla.

**Brand Voice**: "Strategy Born from the Wreckage, Intelligence Forged in the Fire"
- Tone: Confrontational, theatrical, systems-thinking
- Key messaging: "We don't just optimize—we intervene"
- AI positioning: Tool for empowerment, not replacement

## Development Environment

### Directory Structure
```
Working Directory: /Users/chrisbergstrom/Documents/WEBSITE/frontend/repo-fix
├── components/
│   ├── ChatPanel.tsx (transparent styling)
│   ├── Contact.tsx (simplified messaging)  
│   ├── Ethos.tsx (revolutionary content)
│   ├── Header.tsx (clean logo only)
│   └── Marquee.tsx (hero + chat)
├── pages/index.tsx (dual parallax setup)
└── styles/global.css (all custom styling)
```

**Important**: 
- ONLY `repo-fix` directory is git-connected (pushes to `nxtvanhalen/Website`)
- Main `/frontend` directory is NOT git-connected
- Always work in `repo-fix` for all development

### Tech Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + custom CSS in `styles/global.css`
- **Font**: Space Grotesk (Google Fonts)
- **Animations**: Pure CSS only (NO Framer Motion)
- **Color Scheme**: Molten (#F8F6F0) accent on black background

## Visual System

### Background & Parallax
- **Dual parallax system**: `parallax-bg1.jpeg` + `parallax-bg2.webp`
- **CSS classes**: `.parallax-bg` and `.parallax-bg-2`
- **Status**: Stable with smooth background transitions on scroll

### Design Language
- **Transparent UI**: Chat interface with molten borders
- **No solid backgrounds**: All CTAs are transparent with border styling
- **Glow effects** (separate classes): 
  - `glow`: Standard intensity for "EVE AI" text
  - `glow-subtle`: Gentle effect for main headings (Chris Lee Bergstrom, CLB Consultancy)
- **Animations**: Pulsing underline with `animate-pulse-width` (7s duration, 37% max width)

### Content Structure
1. **Marquee**: Hero section with Chris Lee Bergstrom + EVE chat
2. **CLB Consultancy**: Tagline section  
3. **Experience**: Mobile responsive paragraph (`max-w-4xl px-4`)
4. **Video**: Scroll-triggered with Intersection Observer
5. **Ethos**: Centered content, no bullet points
6. **Contact**: Simplified with personal messaging

## Development Workflow

### Starting Dev Server
```bash
# SOLUTION: Use background process method (solves binding issues)
cd /Users/chrisbergstrom/Documents/WEBSITE/frontend/repo-fix
nohup npx next dev > next.log 2>&1 & 
sleep 3
curl -s http://localhost:3000 | head -5  # Verify it's working

# If still having issues, try:
pkill -f next
npx next dev --hostname 0.0.0.0 --port 3000
```

### Recent Development Updates

#### Gallery Implementation
- **Location**: Added horizontal scrolling gallery in Marquee component after experience paragraph
- **Images**: `/public/images/gallery/` - Project1.webp through Project6.webp
- **Animation**: 45-second ticker scroll with seamless looping and blue edge effects
- **Styling**: Molten borders, hover effects, mobile responsive

#### Header Enhancements  
- **Social Media Icons**: Instagram, Facebook, LinkedIn with hover effects
- **Navigation Links**: "About Chris", "Projects", "How I Can Help", "News/Press"
- **Layout**: Two-row header design with navigation bar below main header
- **Effects**: White glow and subtle glitch animation on hover
- **Font**: Space Grotesk matching header logo

#### Content Updates
- **Ask EVE Section**: Consolidated and repositioned above chat interface
- **Gallery Integration**: Seamless integration with existing parallax system
- **Header Spacing**: Adjusted marquee padding (pt-40) for proper header clearance

### Testing & Building
```bash
# Test build before committing
npm run build

# Test connection
curl -s http://127.0.0.1:3000 | head -5
```

### Troubleshooting Dev Server Issues
**Problem**: Server appears to start but doesn't bind to port

**Root Cause**: Next.js sometimes fails to properly bind to port when run interactively

**Solution**: Use background process method (documented above)
1. Start as background process: `nohup npx next dev > next.log 2>&1 &`
2. Wait for startup: `sleep 3`
3. Verify with curl: `curl -s http://localhost:3000 | head -5`

**Fallback methods**:
1. Kill existing processes: `pkill -f next`
2. Clean build artifacts: `rm -rf .next` (optional)
3. Use explicit hostname: `--hostname 0.0.0.0 --port 3000`

**Debugging commands**:
- Check port listening: `lsof -ti:3000`
- Test connection: `curl -v http://localhost:3000`
- Kill processes: `pkill -f next && sleep 3`

## Known Issues & Considerations

### Current Status
- **Parallax system**: Stable and functioning correctly
- **Page loading**: Chat auto-focus properly disabled, no page jump issues
- **CSS caching**: May require clearing `.next` cache for changes to appear

### Best Practices
- Commit frequently with descriptive messages
- Always test mobile responsiveness
- Clear build cache if CSS changes aren't appearing
- Test builds before committing

## Brand Guidelines

### Voice & Messaging
- **Chris Lee Bergstrom**: "Crew Whisperer" - theater meets systems logic
- **Positioning**: Revolutionary consulting, artistic/disruptive edge
- **Avoid**: Generic corporate consultancy language
- **Embrace**: Confrontational, theatrical, systems-thinking approach

### Content Hierarchy
- Maintain the revolutionary edge in all copy
- AI as empowerment tool, not replacement narrative
- Focus on intervention and transformation over optimization