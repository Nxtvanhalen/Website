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
│   ├── Footer.tsx (responsive footer)
│   ├── Header.tsx (enhanced with social + navigation)
│   └── Marquee.tsx (hero + gallery + chat)
├── pages/
│   ├── _app.tsx (Next.js app wrapper)
│   ├── index.tsx (main page with dual parallax)
│   ├── about.tsx (comprehensive about page with profile pic)
│   ├── projects.tsx (8 current projects with glowing titles)
│   ├── news.tsx (multimedia press coverage)
│   └── api/chat.ts (EVE AI chat endpoint)
├── public/
│   ├── images/
│   │   ├── gallery/ (Project1.webp - Project6.webp)
│   │   ├── profile/ (chris-profile.jpg)
│   │   ├── parallax-bg1.jpeg
│   │   └── parallax-bg2.webp
│   └── videos/ (IMG_0279.mov)
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
  - `glow`: Standard intensity for project names and special text
  - `glow-subtle`: Gentle effect for main headings (Chris Lee Bergstrom, CLB Consultancy)
- **Animations**: Pulsing underline with `animate-pulse-width` (7s duration, 37% max width)

### Content Structure
1. **Header**: Logo + social icons (top), navigation links (bottom)
2. **Marquee**: Hero section with Chris Lee Bergstrom + gallery + EVE chat
3. **CLB Consultancy**: Tagline section (reduced spacing)
4. **Video**: Scroll-triggered with Intersection Observer
5. **Ethos**: Centered content, no bullet points
6. **Contact**: Simplified with personal messaging

## Page Structure

### Homepage (`index.tsx`)
- **Header**: Enhanced two-row layout with social media and navigation
- **Hero**: Chris Lee Bergstrom with quote
- **Gallery**: Horizontal scrolling image ticker with blue edge effects
- **Chat**: EVE AI interface with reduced spacing below
- **CLB Section**: Company tagline with optimized spacing
- **Video**: Auto-play on scroll trigger
- **Ethos & Contact**: Supporting content sections

### About Page (`about.tsx`)
- **Header**: Consistent with homepage
- **Profile Section**: Name + tagline + circular profile picture
  - **Mobile**: Stacked layout with smaller profile pic (96px)
  - **Desktop**: Side-by-side with larger profile pic (128px)
- **Content Cards**: 3 sections with gradient backgrounds and hover effects
- **Professional Bio**: Rich content about Chris's experience and approach

### Projects Page (`projects.tsx`)
- **8 Current Projects**: Each with glowing titles matching EVE AI glow effect
- **Project Structure**: Numbered list with descriptions
- **Responsive Design**: Card-based layout with hover effects
- **Projects Include**: AI Consulting Sandbox, EVA, R.Y.D.E.R., EVE, Byte, Glytch, Multi-Agent Lab, JAMES

### News/Press Page (`news.tsx`)
- **Multimedia Showcase**: 4 different content types
- **Spotify Podcast**: Performance Anxiety podcast feature with green branding
- **Bandcamp Release**: The Dandy Warhols live album with blue branding
- **YouTube Video**: Official music video with red branding
- **Press Articles**: Mix Online and Music Radar coverage with professional styling

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

## Recent Major Updates (Latest Session)

### Navigation Improvements
- **Removed**: "How I Can Help" page and navigation link
- **Enhanced**: Remaining navigation links with larger font sizes
  - Desktop: 1.4rem (up from 1.2rem) with 20px padding
  - Mobile: 1.1rem (up from 0.9rem) with 12px padding
- **Responsive**: Better mobile navigation without overflow issues

### Content Enhancements
- **Projects Page**: Added comprehensive project descriptions
  - 8 current projects with glowing titles
  - Professional card-based layout with hover effects
  - Detailed descriptions for each AI system/project
- **About Page**: Rich biographical content
  - Professional profile picture implementation
  - Three content sections with gradient backgrounds
  - Responsive layout with mobile optimization

### Profile Picture Implementation
- **Location**: `/public/images/profile/chris-profile.jpg`
- **Styling**: Circular with molten border, responsive sizing
- **Framing**: `object-top` for proper head positioning
- **Fallback**: Graceful fallback to placeholder if image fails to load
- **TypeScript**: Proper null checking for deployment compatibility

### Spacing Optimizations
- **Chat to CLB Section**: Reduced spacing by 75% total
  - Chat box margin: `mb-8` → `mb-2` (32px → 8px)
  - CLB section padding: `pt-32` → `pt-8` (128px → 32px)
- **Improved Visual Flow**: Better content density and user experience

### Deployment Fixes
- **TypeScript Error**: Fixed `nextElementSibling` null check in profile picture fallback
- **Build Cache**: Resolved corrupted cache issues with force cache-clear commits
- **Production Ready**: All TypeScript errors resolved for successful deployment

### Testing & Building
```bash
# Test build before committing
npm run build

# Test connection
curl -s http://127.0.0.1:3000 | head -5
```

### Git Workflow & Commits
```bash
# Recent commits (latest session):
fe66e16 - Force cache clear for deployment
3991bf7 - Fix TypeScript error in profile picture fallback  
c438c0d - Enhance navigation, content, and add profile picture
302a455 - Add comprehensive site enhancements: navigation, gallery, pages, and press coverage
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

### Deployment Issues & Solutions
**Common Deployment Problems**:
1. **Corrupted Build Cache**: Clear cache on deployment platform
2. **TypeScript Errors**: Ensure proper null checks and type safety
3. **Missing Files**: Verify all assets are properly committed and pushed

**Solutions**:
1. **Manual Cache Clear**: Use platform's "Clear build cache & deploy" option
2. **Force Cache Clear**: Add cache-busting commits with timestamp
3. **TypeScript Compliance**: Add proper null checks and type assertions

## Known Issues & Considerations

### Current Status
- **Parallax system**: Stable and functioning correctly
- **Page loading**: Chat auto-focus properly disabled, no page jump issues
- **CSS caching**: May require clearing `.next` cache for changes to appear
- **Navigation**: Optimized for 3 main pages (About, Projects, News/Press)
- **Profile Picture**: Properly implemented with responsive framing

### Best Practices
- Commit frequently with descriptive messages
- Always test mobile responsiveness
- Clear build cache if CSS changes aren't appearing
- Test builds before committing
- Use proper TypeScript null checks for deployment compatibility
- Verify all assets are in public directory before committing

### Technical Considerations
- **Mobile Navigation**: Responsive text shortening and font scaling
- **Image Optimization**: Use WebP format where possible for better performance
- **TypeScript**: Maintain strict type checking for production builds
- **Caching**: Be aware of potential build cache corruption on deployment platforms

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
- Professional presentation with theatrical flair

### Visual Consistency
- **Glow Effects**: Used strategically for emphasis (project names, key phrases)
- **Molten Color**: Primary accent for borders, highlights, and call-to-action elements
- **Gradient Backgrounds**: Subtle gradients for content cards and sections
- **Responsive Design**: Mobile-first approach with desktop enhancements# Force cache clear Sat May 31 01:15:09 PDT 2025
