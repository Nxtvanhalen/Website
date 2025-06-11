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

## 🚨 CRITICAL: Development Server Issues (June 2025)

### Node.js v22 + Next.js 14 Compatibility Issue
**PROBLEM**: Using Node.js v22 with Next.js 14 causes CSS compilation failures in development mode, resulting in white screen (FOUC prevention without CSS loading).

**SYMPTOMS**:
- `body{display:none}` in HTML but no CSS files loading
- White screen in dev mode (`npm run dev`)
- Same code works perfectly in production mode and live deployment
- Background dev server (`nohup npm run dev > dev.log 2>&1 &`) fails same way

**ROOT CAUSE**: Node.js v22 incompatibility with Next.js 14 CSS compilation pipeline

**SOLUTIONS**:

#### Option 1: Use Production Mode for Local Development (RECOMMENDED)
```bash
# After making code changes:
pkill -f next                           # Stop any running servers
npm run build                          # Rebuild (takes ~30 seconds)  
nohup npm start > prod.log 2>&1 &     # Start production server
# Test at http://localhost:3000
# NO hot reload - must rebuild after each change
```

**Advantages**:
- ✅ Identical to live deployment
- ✅ Reliable CSS/styling
- ✅ No white screen issues
- ❌ Must rebuild for each change (no hot reload)

#### Option 2: Downgrade Node.js (Alternative)
```bash
# Install nvm and use Node 18 or 20
nvm install 18
nvm use 18
npm run dev  # Should work normally
```

#### Option 3: Accept Broken Dev Mode
- Use production mode for final testing
- Work with broken dev mode for rapid iteration
- Deploy frequently to test on live site

**NEVER WASTE TIME ON**:
- Clearing `.next` cache (doesn't fix the issue)
- Modifying CSS imports or FOUC prevention
- Tweaking Next.js configuration
- Different dev server start methods

**The issue is environmental, not code-related.**

---

## Recent Major Updates (December 2024 - Comprehensive Enhancement Session)

### 🎨 Mobile Purple Background & Musings Image Fix (Latest Session - January 2025)
- **Purple Mobile Safe-Area**: Fixed inconsistent purple background in mobile notch/safe-area across all pages
- **Theme-Color Consistency**: Updated all pages to use `#9370DB` theme-color for consistent mobile status bar styling
- **Musings Background Fix**: Corrected case-sensitive file reference from `musing.png` to `musing.PNG`
- **Safe-Area Header Padding**: Added `env(safe-area-inset-top)` to header padding for proper mobile notch coverage
- **Musings Image Positioning**: Fixed background image positioning using `transform: translateY(100px)` instead of CSS background-position
- **CSS Conflict Resolution**: Removed problematic broad selector `[style*="background-image"]` that was overriding positioning with `!important`
- **Background Positioning Solution**: Use CSS transform instead of background-position for reliable image positioning (CSS background-position can be blocked by existing rules)
- **Surgical Implementation**: Maintained all existing parallax backgrounds and visual effects while adding purple mobile UI

### 🛠️ RSS Integration & Background Enhancement (Previous Session)
- **Native XML Parser**: Replaced problematic rss-parser dependency with custom JavaScript RSS parser
- **Substack Integration**: Successfully integrated real-time Substack post fetching for blog page
- **Background Consistency**: Added `minHeight: '120vh'` to all pages for consistent purple overflow area on mobile
- **No Dependencies**: Eliminated external RSS parsing dependencies that caused production build failures
- **Production Ready**: RSS feed now works reliably across all deployment environments

## Previous Session Updates (December 2024)

### 🚀 Performance & SEO Optimizations
- **Resource Hints**: Added DNS prefetch, preconnect, and font preloading for faster loading
- **Sitemap**: Dynamic XML sitemap generation at `/sitemap.xml` for better search indexing
- **robots.txt**: AI-crawler friendly configuration welcoming GPTBot, Claude-Web, ChatGPT-User, etc.
- **Domain Update**: All references updated from `clbconsulting.com` to `chrisleebergstrom.com`

### 📊 Analytics & Conversion Tracking
- **Google Analytics 4**: Full integration with tracking ID `G-XZ6CF9XQD7`
- **Email Click Tracking**: Monitors all mailto link conversions with event categories
- **CTA Performance Tracking**: Specific tracking for rotating call-to-action boxes
- **Dynamic Content Tracking**: MutationObserver for tracking rotating elements
- **TypeScript Integration**: Proper gtag declarations and error handling

### ♿ Comprehensive Accessibility (WCAG Compliant)
- **Skip Navigation**: Screen reader-friendly navigation bypass links
- **ARIA Labels**: Complete semantic markup with landmarks and live regions
- **Focus Management**: High-contrast orange focus rings and keyboard navigation
- **Screen Reader Support**: Descriptive alt text and aria-live announcements
- **Semantic HTML**: Proper heading hierarchy (h1→h2→h3→h4) and role attributes

### 🎯 Enhanced User Experience
- **Rotating CTAs**: 3 value propositions (AI Integrations, Cost Efficiency, Team Building) with 7-second rotation
- **Social Media Integration**: Complete social links (Instagram, Facebook, LinkedIn, YouTube)
- **Contact Sections**: Consistent "Ready to go?" CTAs added to all pages
- **Crossfade Animations**: Smooth 1.5-second transitions for rotating content

### 🎨 Branding & Visual Identity
- **Favicon System**: Complete icon set for all platforms and PWA support
  - Location: `/public/images/Favicon/` (note: capitalized folder name)
  - Includes: favicon.ico, 16x16, 32x32, 180x180, 192x192, 512x512 sizes
  - Apple touch icons for iOS bookmarks
  - Android app icons for PWA installation
- **Progressive Web App**: Manifest file for mobile app installation
- **Theme Colors**: Molten purple (#9370DB) and black (#000000) branding

### 📱 SEO & Structured Data
- **JSON-LD Schema**: Complete structured data for Organization, Person, and WebSite
- **Open Graph Tags**: Rich social sharing previews with image and descriptions
- **Canonical URLs**: Proper URL structure for search engines
- **Meta Tags**: Comprehensive title, description, and social media optimization

### 🛠️ Technical Infrastructure
- **Build Optimization**: Production bundle maintained at ~92KB first load
- **TypeScript Safety**: All accessibility and analytics code properly typed
- **Component Architecture**: Modular, reusable components with proper semantic HTML
- **CSS Enhancements**: Added accessibility focus styles and screen reader classes

### 📈 Analytics Insights Available
- **Engagement Events**: Email button clicks with specific email addresses
- **Conversion Events**: CTA box performance with subject line tracking
- **User Behavior**: Page views, time on site, bounce rate
- **A/B Testing Ready**: Infrastructure for testing different CTA approaches

## Previous Session Updates (Earlier 2024)

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
# Recent commits (December 2024 - RSS Integration & Background Enhancement):
98ac08e - Replace rss-parser with native XML parsing solution
08bc2b2 - Fix TypeScript compilation error for rss-parser import
fcac3e8 - Fix Substack RSS parsing with proper ES6 dynamic import
ac0088f - Add consistent 120vh background height and fix Substack API resilience
05e2a4a - Fix rss-parser dependency for production deployment
5019735 - Implement comprehensive styling consistency and infrastructure improvements

# Previous session commits (December 2024 - Comprehensive Enhancement Session):
8d700ff - Add dynamic XML sitemap for improved SEO indexing
b6e05ba - Add comprehensive SEO, accessibility, and performance optimizations
409c621 - Fix CTA box positioning and optimize mobile social icons

# Previous session commits:
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
- **Mobile Chat UX**: Smart keyboard recentering system implemented for optimal mobile experience
- **CSS caching**: May require clearing `.next` cache for changes to appear
- **Navigation**: Optimized for 3 main pages (About, Projects, News/Press)
- **Profile Picture**: Properly implemented with responsive framing

### Mobile Chat Keyboard Handling
- **Auto-recentering**: When mobile keyboard disappears, chat smoothly scrolls back into view
- **Smart detection**: Only triggers when user was actively using chat input (prevents unwanted scrolling)
- **Viewport monitoring**: Uses `window.visualViewport` to detect keyboard show/hide (150px threshold)
- **Scroll offset**: 120px above EVE heading to ensure input area remains visible
- **Timing**: 200ms delay for smooth recentering, 500ms blur delay for interaction tracking
- **Target element**: Scrolls to `eve-ai-heading` for consistent positioning

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
- **Responsive Design**: Mobile-first approach with desktop enhancements

## Current Deployment & Hosting

### Platform: Render.com
- **Deployment**: Auto-deploy on git push (seamless workflow)
- **Domain**: chrisleebergstrom.com (live and working)
- **Performance**: Excellent global CDN and auto-scaling capabilities
- **Git Integration**: Direct from repository `nxtvanhalen/Website`
- **Workflow**: Code → Git Push → Auto Deploy → Live Site

### Site Status (December 2024)
- ✅ **Fully Operational**: All features working in production
- ✅ **Performance Optimized**: 92KB first load, optimized bundle
- ✅ **SEO Ready**: Sitemap, structured data, analytics active
- ✅ **Accessibility Compliant**: WCAG standards met
- ✅ **Analytics Tracking**: Google Analytics conversion tracking active
- ✅ **RSS Integration**: Native Substack feed parsing working reliably
- ✅ **Mobile UX**: Consistent purple overflow area across all pages (120vh backgrounds)
- ✅ **Professional Foundation**: Ready for consulting business growth

### Analytics Configuration
- **Google Analytics ID**: G-XZ6CF9XQD7
- **Tracking Setup**: Email clicks, CTA performance, user engagement
- **Note**: Manual GA testing tools may take 24-48 hours to recognize new sites
- **Real-time data**: Available within minutes of implementation

## Future Expansion Options
Based on solid foundation built, ready for:
- **Content Management**: Blog/insights section
- **Lead Generation**: Email capture, assessments, case studies
- **Client Portal**: Private project areas
- **A/B Testing**: CTA optimization and conversion improvement
- **Microservices**: Additional APIs and background services
- **Database Integration**: PostgreSQL/Redis when needed
- **Scaling**: Enterprise-level architecture already in place
