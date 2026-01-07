# CTA Page Template Documentation

This document serves as the complete blueprint for creating service-focused CTA (Call-to-Action) pages on the CLB Consulting website. Reference this template when creating new service pages.

**Example Reference Page**: `/pages/operations-consulting.tsx`

---

## Table of Contents
1. [File Structure & Imports](#file-structure--imports)
2. [Head / Meta Tags / SEO](#head--meta-tags--seo)
3. [Page Layout Structure](#page-layout-structure)
4. [Design System & Styling](#design-system--styling)
5. [Component Patterns](#component-patterns)
6. [Image Guidelines](#image-guidelines)
7. [Section Organization](#section-organization)
8. [Butler Notifications (SectionTracker)](#butler-notifications-sectiontracker)
9. [EVE Chat Integration](#eve-chat-integration)
10. [Animations & Motion](#animations--motion)
11. [Responsive Design](#responsive-design)
12. [Content Guidelines](#content-guidelines)

---

## File Structure & Imports

### Required Imports
```typescript
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import Header from '../components/Header';
import { motion } from 'motion/react';
import SectionTracker from '../components/SectionTracker';
```

### Component Structure
```typescript
export default function [ServiceName]() {
  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.[service]-parallax-bg') as HTMLElement;

      if (parallaxBg) {
        const speed = 0.5;
        parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>{/* SEO Tags */}</Head>
      <Header />
      {/* Parallax Background */}
      <main>{/* Content */}</main>
    </>
  );
}
```

---

## Head / Meta Tags / SEO

### Required Meta Tags
```typescript
<Head>
  {/* Primary Meta Tags */}
  <title>[Service Name] | [Tagline] - CLB Consulting</title>
  <meta name="description" content="[150-160 character description]" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="author" content="Chris Lee Bergstrom" />
  <meta name="keywords" content="[comma, separated, keywords, relevant, to, service]" />

  {/* PWA Meta */}
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#9370DB" />

  {/* Favicon Set (Standard across all pages) */}
  <link rel="icon" type="image/x-icon" href="/images/Favicon/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="/images/Favicon/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/images/Favicon/favicon-32x32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/images/Favicon/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/images/Favicon/android-chrome-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/images/Favicon/android-chrome-512x512.png" />
  <meta name="msapplication-TileColor" content="#000000" />

  {/* Open Graph Tags (Social Sharing) */}
  <meta property="og:title" content="[Service Name] | CLB Consulting" />
  <meta property="og:description" content="[Same as meta description or tailored for social]" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://chrisleebergstrom.com/[service-slug]" />
  <meta property="og:image" content="https://chrisleebergstrom.com/images/[service-hero-image].webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="[Descriptive alt text for social preview]" />

  {/* Twitter Card Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@chrisleebergstrom" />
  <meta name="twitter:creator" content="@chrisleebergstrom" />
  <meta name="twitter:title" content="[Service Name] | CLB Consulting" />
  <meta name="twitter:description" content="[Same as meta description]" />
  <meta name="twitter:image" content="https://chrisleebergstrom.com/images/[service-hero-image].webp" />
  <meta name="twitter:image:alt" content="[Descriptive alt text]" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://chrisleebergstrom.com/[service-slug]" />

  {/* JSON-LD Structured Data - See section below */}
</Head>
```

### JSON-LD Structured Data Template
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://chrisleebergstrom.com/[service-slug]#service",
      "name": "[Service Name]",
      "description": "[Comprehensive service description]",
      "provider": {
        "@type": "Organization",
        "@id": "https://chrisleebergstrom.com/#organization",
        "name": "CLB Consulting"
      },
      "serviceType": "[Service Type Category]",
      "areaServed": "Worldwide",
      "audience": {
        "@type": "Audience",
        "audienceType": "[Target Audience Description]"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "[Service Name] Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "[Sub-service 1]",
              "description": "[Description]"
            }
          },
          // ... repeat for each deliverable/offering
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://chrisleebergstrom.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "[Service Name]",
            "item": "https://chrisleebergstrom.com/[service-slug]"
          }
        ]
      }
    })
  }}
/>
```

**Notes:**
- Replace all `[placeholders]` with service-specific content
- Ensure `@id` values are unique per page
- Include 2-4 key offerings in `hasOfferCatalog`

---

## Page Layout Structure

### Parallax Background (Fixed)
```tsx
{/* Parallax Background */}
<div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
  <div
    className="[service]-parallax-bg absolute inset-0 bg-top bg-cover md:bg-fixed"
    style={{
      backgroundImage: "url('/images/[service-background].webp')",
      minHeight: '300vh',
      top: '-80vh'
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
</div>
```

**Parameters:**
- **Background image**: AI-generated or relevant service photo (webp format, optimized)
- **minHeight**: `300vh` (extends beyond viewport for parallax effect)
- **top**: `-80vh` (starting offset for parallax)
- **Gradient overlay**: Adjust opacity as needed (`from-black/70 via-black/60 to-black/70`)

### Main Content Container
```tsx
<main className="min-h-screen bg-transparent text-white pt-24 md:pt-40 px-6 relative z-10">
  <div className="max-w-5xl mx-auto">
    {/* All sections go here */}
  </div>
</main>
```

**Parameters:**
- **pt-24 md:pt-40**: Top padding (accounts for header height)
- **px-6**: Horizontal padding (responsive)
- **max-w-5xl**: Content max-width (consistent across CTA pages)
- **z-10**: Ensures content sits above parallax background

---

## Design System & Styling

### Color Palette
```css
/* Primary Colors */
--molten: #FF6B35       /* Accent color (CTA buttons, highlights) */
--mauve: #9370DB        /* Brand purple (borders, glows) */
--beige: #F5F5DC        /* Text color (body copy) */

/* Backgrounds */
--black: #000000        /* Base background */
--black-80: rgba(0, 0, 0, 0.8)   /* Card backgrounds */

/* Gradients */
bg-gradient-to-br from-gray-900/60 to-black/60   /* Skill/service cards */
bg-gradient-to-b from-black/70 via-black/60 to-black/70  /* Parallax overlay */
```

### Typography
```tsx
{/* Headings */}
<h1 className="text-3xl md:text-5xl font-heading mb-6">
<h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
<h3 className="text-xl font-bold mb-3" style={{ color: '#F5F5DC' }}>

{/* Body Text */}
<p className="text-base md:text-lg font-body leading-relaxed max-w-3xl mx-auto"
   style={{ color: '#F5F5DC' }}>

{/* Stats/Numbers */}
<div className="text-4xl md:text-5xl font-heading text-molten mb-2">10-20%</div>

{/* Captions */}
<p className="text-sm font-body" style={{ color: '#F5F5DC', opacity: 0.85 }}>
```

**Font Families:**
- **font-heading**: Display font (larger, bold headlines)
- **font-body**: Body copy font (paragraphs, descriptions)

### Box/Card Styling
```tsx
{/* Primary Card Style */}
<div className="bg-black/80 rounded-lg border-2 border-mauve/50 p-8 md:p-12
     shadow-[0_0_30px_rgba(147,112,219,0.4)]
     hover:shadow-[0_0_40px_rgba(147,112,219,0.6)]
     transition-shadow duration-300">
  {/* Content */}
</div>

{/* Secondary Card Style (without glow) */}
<div className="bg-gradient-to-br from-gray-900/60 to-black/60
     rounded-lg border border-molten/30 p-6
     hover:border-molten/60 transition-all duration-300">
  {/* Content */}
</div>
```

**Key Elements:**
- **Purple glow**: `shadow-[0_0_30px_rgba(147,112,219,0.4)]`
- **Border**: `border-2 border-mauve/50`
- **Hover effects**: Increase glow intensity on hover
- **Padding**: `p-8 md:p-12` (responsive)

### Spacing System
```tsx
{/* Vertical Spacing Between Sections */}
<div className="mb-16">  {/* 4rem / 64px */}

{/* Horizontal Container */}
<div className="max-w-5xl mx-auto">  {/* Page width */}
<div className="max-w-3xl mx-auto">  {/* Text width */}
<div className="max-w-2xl mx-auto">  {/* Stats/CTAs width */}

{/* Grid Gaps */}
<div className="grid md:grid-cols-2 gap-6">  {/* 1.5rem / 24px */}
<div className="grid grid-cols-4 gap-2">     {/* 0.5rem / 8px for photo grids */}
```

---

## Component Patterns

### 1. Hero Section
```tsx
<SectionTracker
  name="[Service] - Hero"
  butlerMessage="[Contextual butler message about this section]"
>
  <div className="text-center mb-16">
    <motion.h1
      className="text-3xl md:text-5xl font-heading mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      [Main Headline - Value Proposition]
    </motion.h1>

    {/* Optional: 4-Photo Gallery */}
    <div className="w-full max-w-xl mx-auto my-6">
      <div className="grid grid-cols-4 gap-2">
        {/* See Image Guidelines section */}
      </div>
    </div>

    <motion.p
      className="text-base md:text-lg font-body leading-relaxed max-w-3xl mx-auto"
      style={{ color: '#F5F5DC' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      [Supporting paragraph - elaborates on the headline]
    </motion.p>
  </div>
</SectionTracker>
```

### 2. Problem/Agitation Section
```tsx
<SectionTracker
  name="[Service] - Problem"
  butlerMessage="[Butler insight about the problem being solved]"
>
  <div className="mb-16">
    <motion.div
      className="bg-black/80 rounded-lg border-2 border-mauve/50 p-8 md:p-12
           shadow-[0_0_30px_rgba(147,112,219,0.4)]
           hover:shadow-[0_0_40px_rgba(147,112,219,0.6)]
           transition-shadow duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
        [Problem Statement Headline]
      </h2>
      <p className="text-base font-body leading-relaxed text-center max-w-3xl mx-auto mb-8"
         style={{ color: '#F5F5DC' }}>
        [Primary problem description]
      </p>
      <p className="text-base font-body leading-relaxed text-center max-w-3xl mx-auto mb-10"
         style={{ color: '#F5F5DC', opacity: 0.85 }}>
        [Secondary elaboration or consequences]
      </p>

      {/* Stats Grid (Optional) */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <motion.div
          className="text-center p-6 bg-black/80 rounded-lg border-2 border-mauve/50
               shadow-[0_0_30px_rgba(147,112,219,0.4)]
               hover:shadow-[0_0_40px_rgba(147,112,219,0.6)]
               transition-shadow duration-300"
          whileHover={{ scale: 1.03, borderColor: 'rgba(147, 112, 219, 0.5)' }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl md:text-5xl font-heading text-molten mb-2">[Stat]</div>
          <div className="text-sm font-body" style={{ color: '#F5F5DC' }}>[Stat Label]</div>
          <div className="text-xs mt-1" style={{ color: '#F5F5DC', opacity: 0.7 }}>[Context]</div>
        </motion.div>
        {/* Repeat for second stat */}
      </div>
    </motion.div>
  </div>
</SectionTracker>
```

### 3. Pain Points Grid Section
```tsx
<SectionTracker
  name="[Service] - Pain Points"
  butlerMessage="[Butler commentary on pain points]"
>
  <div className="mb-16">
    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
      [Pain Points Section Title]
    </h2>

    {/* Optional: Featured Image */}
    <div className="w-full max-w-sm mx-auto my-6">
      <motion.div
        className="border-none rounded-lg overflow-hidden bg-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src="/images/[image].webp"
          alt="[Descriptive alt text]"
          width={800}
          height={600}
          className="w-full h-auto object-cover opacity-70"
          quality={85}
          loading="lazy"
        />
      </motion.div>
    </div>

    {/* Pain Points Grid */}
    <div className="grid md:grid-cols-2 gap-6">
      {painPoints.map((point, index) => (
        <motion.div
          key={index}
          className="bg-black/80 rounded-lg border-2 border-mauve/50 p-6
               shadow-[0_0_30px_rgba(147,112,219,0.4)]
               hover:shadow-[0_0_40px_rgba(147,112,219,0.6)]
               transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-bold mb-3" style={{ color: '#F5F5DC' }}>
            {point.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#F5F5DC', opacity: 0.85 }}>
            {point.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</SectionTracker>
```

**Data Structure:**
```typescript
const painPoints = [
  {
    title: "Pain Point Title",
    description: "Detailed description of the pain point and its impact."
  },
  // ... 3-4 pain points total
];
```

### 4. Approach/Philosophy Section
```tsx
<SectionTracker
  name="[Service] - Approach"
  butlerMessage="[Butler message about methodology]"
>
  <div className="mb-16">
    <motion.div
      className="bg-black/80 rounded-lg border-2 border-mauve/50 p-8 md:p-12 text-center
           shadow-[0_0_30px_rgba(147,112,219,0.4)]
           hover:shadow-[0_0_40px_rgba(147,112,219,0.6)]
           transition-shadow duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
        [Approach/Methodology Headline]
      </h2>
      <p className="text-base font-body leading-relaxed max-w-3xl mx-auto"
         style={{ color: '#F5F5DC' }}>
        [Detailed explanation of approach, philosophy, or unique methodology]
      </p>
    </motion.div>
  </div>
</SectionTracker>
```

### 5. Solutions/Deliverables Grid Section
```tsx
<SectionTracker
  name="[Service] - Solutions"
  butlerMessage="[Butler message about deliverables]"
>
  <div className="mb-16">
    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
      [Deliverables Section Title]
    </h2>

    {/* Optional: Featured Image */}
    <div className="w-full max-w-sm mx-auto my-6">
      {/* Same pattern as Pain Points image */}
    </div>

    {/* Solutions Grid */}
    <div className="grid md:grid-cols-2 gap-6">
      {solutions.map((solution, index) => (
        <motion.div
          key={index}
          className="bg-black/80 rounded-lg border-2 border-mauve/50 p-6
               shadow-[0_0_30px_rgba(147,112,219,0.4)]
               hover:shadow-[0_0_40px_rgba(147,112,219,0.6)]
               transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-bold mb-3" style={{ color: '#F5F5DC' }}>
            {solution.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#F5F5DC', opacity: 0.85 }}>
            {solution.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</SectionTracker>
```

### 6. Tagline Divider
```tsx
<div className="text-center py-12">
  <p className="text-xl italic font-heading" style={{ color: '#F5F5DC', opacity: 0.8 }}>
    Strategy Born from the Wreckage, Intelligence Forged in the Fire
  </p>
  <div className="mt-8">
    <span className="block h-0.5 bg-molten w-32 mx-auto animate-pulse-width"></span>
  </div>
</div>
```

**Notes:**
- Standard tagline used across service pages
- Animated line (`animate-pulse-width`) - ensure this animation is defined in global CSS

### 7. Contact CTA Section
```tsx
<SectionTracker name="[Service] - Contact">
  <section className="py-12 px-6 text-center">
    <div className="max-w-lg mx-auto space-y-6">
      <div className="space-y-4">
        <a
          href="mailto:chrisleebergstrom@gmail.com?subject=[Service] Inquiry - [Custom Subject]"
          className="group block relative overflow-hidden py-4 px-8
               bg-transparent text-white font-bold rounded-lg
               border border-molten hover:border-white
               transition-all duration-300
               hover:scale-105 hover:-translate-y-0.5 active:scale-95"
        >
          <div className="relative flex flex-col items-center justify-center text-center">
            <div className="text-lg font-bold">[CTA Text - e.g., "Ready to see the difference?"]</div>
            <div className="text-sm opacity-80">chrisleebergstrom@gmail.com</div>
          </div>
        </a>
        <p className="text-sm text-molten/70">
          [Supporting text - e.g., "Let's discuss your operational challenges"]
        </p>
      </div>
    </div>
  </section>
</SectionTracker>
```

**Email Subject Guidelines:**
- Format: `[Service Name] Inquiry - [Action-oriented subject]`
- Examples:
  - "Operations Consulting Inquiry - Let's Find the Leaks"
  - "AI Training Inquiry - Ready to Lead with AI"

---

## Image Guidelines

### Image Optimization Standards
- **Format**: WebP (convert from JPG/PNG)
- **Quality**: 75-85% (use `cwebp -q 75`)
- **Max Dimensions**:
  - Hero/Featured: 2000px width max
  - Gallery thumbnails: 800px width max
- **Target File Sizes**:
  - Hero images: <500KB
  - Gallery images: <150KB each
  - Featured section images: <100KB

### Compression Command
```bash
cwebp -q 75 -resize 800 0 /path/to/image.jpg -o /path/to/image.webp
```

### 4-Photo Gallery Pattern (Hero Section)
```tsx
<div className="w-full max-w-xl mx-auto my-6">
  <div className="grid grid-cols-4 gap-2">
    {[
      { src: '/images/image1.webp', alt: 'Descriptive alt text 1' },
      { src: '/images/image2.webp', alt: 'Descriptive alt text 2' },
      { src: '/images/image3.webp', alt: 'Descriptive alt text 3' },
      { src: '/images/image4.webp', alt: 'Descriptive alt text 4' }
    ].map((img, index) => (
      <motion.div
        key={index}
        className="border-none rounded-lg overflow-hidden bg-transparent cursor-pointer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
        whileHover={{ scale: 1.08 }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={128}
          height={128}
          className="w-full h-auto object-cover aspect-video opacity-70"
          quality={85}
          loading="lazy"
        />
      </motion.div>
    ))}
  </div>
</div>
```

**Image Positioning:**
- Default: `object-cover` (center)
- Top alignment: Add `object-top` to className
- Bottom alignment: Add `object-bottom` to className
- Custom: Use `object-[center_20%]` syntax

### Single Featured Image Pattern
```tsx
<div className="w-full max-w-sm mx-auto my-6">
  <motion.div
    className="border-none rounded-lg overflow-hidden bg-transparent"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    whileHover={{ scale: 1.05 }}
  >
    <Image
      src="/images/[image].webp"
      alt="[Descriptive alt text]"
      width={800}
      height={600}
      className="w-full h-auto object-cover opacity-70"
      quality={85}
      loading="lazy"
    />
  </motion.div>
</div>
```

### Alt Text Best Practices
- Be descriptive and specific (not generic)
- Include context relevant to the service
- Examples:
  - Good: "Large concert in Michigan from FOH perspective"
  - Bad: "Concert photo"
- Include location, event type, and technical context where relevant

---

## Section Organization

### Recommended Section Flow
1. **Hero** - Main value proposition + optional photo gallery
2. **Problem** - Articulate the pain/challenge (with stats if applicable)
3. **Pain Points** - Specific challenges (grid format, optional featured image)
4. **Approach** - Philosophy/methodology (single centered card)
5. **Solutions** - Deliverables/outcomes (grid format, optional featured image)
6. **Tagline Divider** - Brand statement
7. **Contact CTA** - Email link with compelling copy

### Section Count Guidelines
- **Minimum**: 5 sections (Hero, Problem, Pain Points, Solutions, Contact)
- **Maximum**: 8 sections (avoid overwhelming the user)
- **Ideal**: 6-7 sections

---

## Butler Notifications (SectionTracker)

### Purpose
Butler notifications provide contextual commentary to EVE (the chat AI) about what section the user is viewing. They appear as notifications when users scroll through sections.

### Implementation Pattern
```tsx
<SectionTracker
  name="[Service] - [Section Name]"
  butlerMessage="[Contextual message about this section from Butler's perspective]"
>
  {/* Section content */}
</SectionTracker>
```

### Naming Convention
- Format: `"[Service Name] - [Section Identifier]"`
- Examples:
  - `"Operations - Hero"`
  - `"Operations - Problem"`
  - `"Operations - Pain Points"`
  - `"Operations - Solutions"`
  - `"Operations - Contact"`

### Butler Message Guidelines
**Tone**: Witty, insightful, slightly cheeky British butler
**Length**: 1-2 sentences, concise
**Content**: Contextual insight, not just description

**Examples:**
- Hero: `"Twenty years finding where the money disappears. Chris doesn't audit from a conference room—he walks your load-ins."`
- Problem: `"10-20% budget overruns are the industry norm. But it doesn't have to be your norm."`
- Pain Points: `"Labor, safety, logistics, forecasting—these are the four horsemen of production chaos."`
- Solutions: `"Audit, strategy, risk prevention, results. The full operational toolkit."`
- Contact: `"Ready to have Chris find the leaks? The inbox is open."`

---

## EVE Chat Integration

### Automatic Integration
EVE chat widget is automatically available on all pages via the global layout. No per-page configuration needed.

### Updating EVE's Knowledge Base
When creating a new CTA page, update EVE's system prompt in `/pages/api/chat.ts`:

#### Location in chat.ts
Look for the section: `[WEBSITE CTA OFFERINGS - "The Front Door"]` or `[WEBSITE STRUCTURE - "The Floorplan"]`

#### Template for New Service
```typescript
// Add to CTA OFFERINGS section:
X. **[SERVICE NAME]** → /[service-slug]
   [One-line service description]

   **DEDICATED PAGE CONTENT**: [Main value proposition/headline from hero section]

   **Key Pain Points Addressed**:
   - [Pain Point 1]: [Description]
   - [Pain Point 2]: [Description]
   - [Pain Point 3]: [Description]
   - [Pain Point 4]: [Description]

   **What Chris Delivers**:
   - [Deliverable 1]: [Description]
   - [Deliverable 2]: [Description]
   - [Deliverable 3]: [Description]
   - [Deliverable 4]: [Description]

   **Stats/Key Facts**: [Any notable statistics or industry data referenced on the page]

// Add to WEBSITE STRUCTURE section:
**[SERVICE NAME] PAGE** (/[service-slug]) - "[Butler-style tagline]"
1. **Hero Section**: "[Main headline]" - [Brief description]
   - **[Photo Gallery/Images if applicable]**: [Descriptions with alt text]
2. **Problem Section**: "[Problem headline]"
   - [Key stats or facts]
3. **Pain Points Section**: "[Pain points headline]"
   - **[Featured Image if applicable]**: [Image description]
   - [List pain points]
4. **[Other sections as applicable]**
5. **Contact CTA**: "[CTA text]" with email link
```

#### Images in EVE Knowledge
If page includes images, document them:
```typescript
- **4-Photo Gallery**: Grid of [context] photos:
  * [Alt text 1]
  * [Alt text 2]
  * [Alt text 3]
  * [Alt text 4]

- **Featured Image**: [Alt text with context]
```

---

## Animations & Motion

### Animation Library
All animations use `framer-motion` (imported as `motion`)

### Standard Animation Patterns

#### 1. Fade In with Y Translation (Headlines, Text)
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Headline
</motion.h1>
```

**Variations:**
- Add `delay: 0.2` for staggered animations
- Increase `y: 40` for more dramatic entrance

#### 2. Fade In with Scale (Cards, Boxes)
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Card content
</motion.div>
```

**Notes:**
- `whileInView` triggers on scroll
- `viewport={{ once: true }}` prevents re-animation on scroll up

#### 3. Staggered Grid Items
```tsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    {item.content}
  </motion.div>
))}
```

**Parameters:**
- `delay: index * 0.1` creates cascade effect (0s, 0.1s, 0.2s, etc.)
- `whileHover={{ scale: 1.02 }}` adds subtle hover growth

#### 4. Photo Gallery Items
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
  whileHover={{ scale: 1.08 }}
>
  <Image ... />
</motion.div>
```

#### 5. Hover Effects
```tsx
// Subtle scale + border color change
<motion.div
  whileHover={{ scale: 1.03, borderColor: 'rgba(147, 112, 219, 0.5)' }}
  transition={{ duration: 0.3 }}
>

// Button hover
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
>
```

### Transition Timing
- **Fast interactions**: 0.2-0.3s (hover, tap)
- **Standard entrance**: 0.4-0.6s (text, cards)
- **Dramatic entrance**: 0.8-1.0s (hero elements)

### GPU Acceleration
All transforms (`scale`, `translateY`, `opacity`) are GPU-accelerated for smooth 60fps animations.

---

## Responsive Design

### Breakpoint System (Tailwind)
- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)

### Common Responsive Patterns

#### Text Sizing
```tsx
{/* Headings */}
className="text-3xl md:text-5xl"  // Mobile: 1.875rem, Desktop: 3rem
className="text-2xl md:text-3xl"  // Mobile: 1.5rem, Desktop: 1.875rem
className="text-xl"                // Fixed across breakpoints

{/* Body */}
className="text-base md:text-lg"  // Mobile: 1rem, Desktop: 1.125rem
className="text-sm"                // Fixed: 0.875rem
className="text-xs"                // Fixed: 0.75rem
```

#### Padding/Spacing
```tsx
className="p-6 md:p-12"     // Mobile: 1.5rem, Desktop: 3rem
className="pt-24 md:pt-40"  // Top padding (header offset)
className="px-6"            // Horizontal: 1.5rem (consistent)
className="py-12"           // Vertical: 3rem (consistent)
```

#### Grid Layouts
```tsx
{/* 2-column on desktop, 1-column on mobile */}
className="grid md:grid-cols-2 gap-6"

{/* 4-column (photo gallery) */}
className="grid grid-cols-4 gap-2"  // Fixed 4 columns (images scale down)

{/* Stats */}
className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
```

#### Container Widths
```tsx
className="max-w-5xl"   // Page container: 64rem (1024px)
className="max-w-3xl"   // Text container: 48rem (768px)
className="max-w-2xl"   // Stats/CTAs: 42rem (672px)
className="max-w-xl"    // Photo gallery: 36rem (576px)
className="max-w-sm"    // Single images: 24rem (384px)
```

### Mobile-First Approach
- Base styles target mobile
- Use `md:` prefix for tablet/desktop overrides
- Test all layouts at 375px (iPhone), 768px (iPad), 1440px (desktop)

### Parallax Background Responsiveness
```tsx
className="bg-top bg-cover md:bg-fixed"
```
- **Mobile**: `bg-scroll` (default, better performance)
- **Desktop**: `bg-fixed` (parallax effect)

---

## Content Guidelines

### Writing Style
- **Tone**: Professional, confident, direct (not corporate or salesy)
- **Voice**: First-person from Chris ("I find...", "I deliver...")
- **Length**:
  - Headlines: 5-10 words
  - Paragraphs: 2-4 sentences
  - Pain points/Solutions: 1-2 sentences each

### Value Proposition Formula
**Headline**: [Outcome/Promise] + [Differentiator]
- Example: "I've Never Cost a Client More Than I've Saved Them"

**Supporting Paragraph**: [Experience] + [Method] + [Benefit]
- Example: "Twenty years on stages... taught me where money disappears—and how to stop it. I find the overtime leaks... before they become six-figure problems."

### Pain Points Structure
- **Title**: Specific problem (2-4 words)
- **Description**: Impact/consequence (1-2 sentences, focus on cost/risk)
- **Count**: 4 pain points (fits 2x2 grid)

### Solutions Structure
- **Title**: Deliverable name (2-3 words)
- **Description**: What it includes and its value (1-2 sentences)
- **Count**: 4 solutions (mirrors pain points grid)

### Stats/Data Guidelines
- Use industry-standard data when available
- Present as ranges (e.g., "10-20%") for credibility
- Include context label + small supporting text
- Source data internally or from reputable industry sources

### CTA Copy
- **Primary**: Action-oriented question ("Ready to see the difference?")
- **Secondary**: Value restatement ("Let's discuss your operational challenges")
- Keep it conversational, not pushy

---

## Checklist for New CTA Page

### Pre-Development
- [ ] Define service name and URL slug
- [ ] Write value proposition (headline + supporting paragraph)
- [ ] Identify 4 pain points with descriptions
- [ ] Identify 4 solutions/deliverables with descriptions
- [ ] Gather or create background image (AI-generated or photo)
- [ ] Collect service photos (4 for gallery + 2 featured, if applicable)
- [ ] Research relevant stats/industry data

### Development
- [ ] Create new page file: `/pages/[service-slug].tsx`
- [ ] Copy template structure from `operations-consulting.tsx`
- [ ] Update all imports
- [ ] Implement parallax background with service-specific image
- [ ] Configure Head section (title, meta tags, OG tags)
- [ ] Create JSON-LD structured data
- [ ] Build Hero section with headline and optional photo gallery
- [ ] Build Problem section with stats
- [ ] Build Pain Points grid with optional featured image
- [ ] Build Approach/Philosophy section
- [ ] Build Solutions grid with optional featured image
- [ ] Add Tagline divider
- [ ] Add Contact CTA with custom subject line
- [ ] Configure SectionTracker for each section with Butler messages
- [ ] Add all motion/animation effects
- [ ] Test responsive layouts (mobile, tablet, desktop)

### Image Optimization
- [ ] Convert all images to WebP format
- [ ] Compress to target file sizes (<500KB hero, <150KB gallery)
- [ ] Verify image quality at 75-85% compression
- [ ] Write descriptive alt text for all images
- [ ] Test image loading performance

### EVE Integration
- [ ] Update `/pages/api/chat.ts` EVE_SYSTEM_PROMPT
- [ ] Add service to CTA OFFERINGS section
- [ ] Add page structure to WEBSITE STRUCTURE section
- [ ] Document all images with alt text in EVE knowledge
- [ ] Test EVE responses about the new page

### Testing
- [ ] Verify all links work
- [ ] Test email CTA (check subject line pre-fills)
- [ ] Validate parallax scroll effect
- [ ] Test all animations (entrance, hover, scroll-triggered)
- [ ] Check mobile responsiveness (375px, 768px, 1440px)
- [ ] Verify no console errors
- [ ] Test SectionTracker notifications
- [ ] Validate JSON-LD with Google Rich Results Test
- [ ] Check meta tags with social media preview tools

### Deployment
- [ ] Commit changes with descriptive message
- [ ] Push to repository
- [ ] Verify build succeeds
- [ ] Test live URL
- [ ] Add to navigation if applicable

---

## Example Data Structures

### Pain Points Array
```typescript
const painPoints = [
  {
    title: "Problem Title 1",
    description: "Detailed description of the problem and its consequences. Focus on impact."
  },
  {
    title: "Problem Title 2",
    description: "Detailed description of the problem and its consequences. Focus on impact."
  },
  {
    title: "Problem Title 3",
    description: "Detailed description of the problem and its consequences. Focus on impact."
  },
  {
    title: "Problem Title 4",
    description: "Detailed description of the problem and its consequences. Focus on impact."
  }
];
```

### Solutions Array
```typescript
const solutions = [
  {
    title: "Solution Name 1",
    description: "What this deliverable includes and the value it provides to the client."
  },
  {
    title: "Solution Name 2",
    description: "What this deliverable includes and the value it provides to the client."
  },
  {
    title: "Solution Name 3",
    description: "What this deliverable includes and the value it provides to the client."
  },
  {
    title: "Solution Name 4",
    description: "What this deliverable includes and the value it provides to the client."
  }
];
```

---

## Quick Reference Commands

### Image Compression
```bash
# Single image
cwebp -q 75 -resize 800 0 /path/to/image.jpg -o /path/to/image.webp

# Batch compression
for f in *.jpg; do cwebp -q 75 -resize 800 0 "$f" -o "${f%.jpg}.webp"; done
```

### Development Server
```bash
bun run dev     # Start dev server
npm run build   # Production build
npm run lint    # Check code quality
```

### Git Workflow
```bash
git status
git add .
git commit -m "Add [Service Name] CTA page with optimized images and EVE knowledge"
git push
```

---

## Notes & Best Practices

1. **Consistency**: Maintain visual and structural consistency with existing CTA pages
2. **Performance**: Always optimize images—page speed affects SEO and UX
3. **Accessibility**: Use semantic HTML, descriptive alt text, and proper heading hierarchy
4. **SEO**: Complete all meta tags, JSON-LD, and ensure unique content per page
5. **EVE Knowledge**: Keep EVE's knowledge base updated—she's a key part of the UX
6. **Butler Personality**: Write Butler messages with wit and insight, not just description
7. **Mobile First**: Always design and test mobile layouts before desktop
8. **Animation Balance**: Use animations to enhance, not distract—keep them subtle
9. **Content Clarity**: Every section should have a clear purpose in the conversion funnel
10. **Testing**: Test across devices, browsers, and with tools (Lighthouse, PageSpeed Insights)

---

**End of Template Documentation**

*Last Updated: January 6, 2025*
*Reference Page: `/pages/operations-consulting.tsx`*
*Maintainer: CLB Consulting Development Team*
