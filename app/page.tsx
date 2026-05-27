import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IndexClient from './IndexClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Chris Lee Bergstrom — AI Developer + 20 Years Live Entertainment',
  },
  description:
    'AI developer with 20 years in live entertainment. Building agentic software for venues, tours, and live events — front-of-house engineer turned full-stack developer, using AI agents as the build team.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  authors: [{ name: 'Chris Lee Bergstrom' }],
  keywords: [
    'Chris Lee Bergstrom',
    'AI developer',
    'agentic AI',
    'live entertainment software',
    'venue management software',
    'front-of-house engineer',
    'tour management technology',
    'AI agents development',
    'entertainment technology',
    'AI consultant for venues',
    'live events technology',
    'AI developer entertainment industry',
  ],
  alternates: { canonical: 'https://chrisleebergstrom.com' },
  openGraph: {
    title: 'Chris Lee Bergstrom — AI Developer + Live Entertainment',
    description:
      'AI developer with 20 years in live entertainment. Building agentic software for venues, tours, and live events — front-of-house engineer turned full-stack developer.',
    type: 'website',
    url: 'https://chrisleebergstrom.com',
    images: [
      {
        url: '/images/profile/chris-profile-square-2.jpg',
        width: 1200,
        height: 1200,
        alt: 'Chris Lee Bergstrom — AI developer and live entertainment veteran',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chrisleebergstrom',
    creator: '@chrisleebergstrom',
    title: 'Chris Lee Bergstrom — AI Developer + Live Entertainment',
    description:
      'AI developer with 20 years in live entertainment. Building agentic software for venues, tours, and live events.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#9370DB',
  width: 'device-width',
  initialScale: 1,
};

const landingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://chrisleebergstrom.com/#organization',
      name: 'CLB Consulting',
      alternateName: ['Chris Lee Bergstrom', 'CLB'],
      url: 'https://chrisleebergstrom.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chrisleebergstrom.com/images/profile/chris-profile.jpg',
      },
      image: 'https://chrisleebergstrom.com/images/profile/chris-profile.jpg',
      description:
        'CLB Consulting is the business entity behind Chris Lee Bergstrom — an AI developer with 20 years in live entertainment, building agentic software for venues, tours, and live events. Available for consulting on venue operations, AI training, and web security.',
      founder: {
        '@type': 'Person',
        '@id': 'https://chrisleebergstrom.com/about#person',
        name: 'Chris Lee Bergstrom',
      },
      owner: {
        '@type': 'Person',
        '@id': 'https://chrisleebergstrom.com/about#person',
        name: 'Chris Lee Bergstrom',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'chrisleebergstrom@gmail.com',
        contactType: 'Business Inquiries',
        availableLanguage: 'English',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
      priceRange: '$$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      sameAs: [
        'https://www.linkedin.com/in/chris-bergstrom',
        'https://www.instagram.com/chrisleebergstrom',
        'https://www.youtube.com/@chrisleebergstrom',
        'https://www.facebook.com/share/15a8S2BF9S/?mibextid=wwXIfr',
      ],
      knowsAbout: [
        'Venue Operations',
        'Entertainment Operations',
        'AI Education and Training',
        'Web Security',
        'Bot Protection',
        'Executive Coaching',
        'Entertainment Technology',
        'Live Events Management',
        'Audio Engineering',
        'Ticket Scalping Prevention',
        'Arts Organization Leadership',
        'Tour Management',
        'Production Infrastructure',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://chrisleebergstrom.com/about#person',
      name: 'Chris Lee Bergstrom',
      alternateName: ['Chris Bergstrom', 'CLB'],
      jobTitle: 'AI Developer',
      description:
        'AI developer with 20 years in live entertainment. Two decades of front-of-house, tour management, and technical direction — touring with The Dandy Warhols, Black Rebel Motorcycle Club, and Macklemore. Now building software with AI agents as the build team.',
      url: 'https://chrisleebergstrom.com/about',
      image: 'https://chrisleebergstrom.com/images/profile/chris-profile.jpg',
      worksFor: {
        '@id': 'https://chrisleebergstrom.com/#organization',
      },
      owns: {
        '@id': 'https://chrisleebergstrom.com/#organization',
      },
      knowsAbout: [
        'Agentic AI Development',
        'Multi-Agent Systems',
        'Live Entertainment Software',
        'Venue Operations',
        'Front-of-House Engineering',
        'Tour Management',
        'Audio Engineering',
        'AI Implementation',
        'Web Security',
      ],
      affiliation: [
        {
          '@type': 'MusicGroup',
          name: 'The Dandy Warhols',
          sameAs: 'https://en.wikipedia.org/wiki/The_Dandy_Warhols',
        },
        {
          '@type': 'MusicGroup',
          name: 'Black Rebel Motorcycle Club',
          sameAs: 'https://en.wikipedia.org/wiki/Black_Rebel_Motorcycle_Club',
        },
        {
          '@type': 'MusicGroup',
          name: 'Macklemore',
          sameAs: 'https://en.wikipedia.org/wiki/Macklemore',
        },
      ],
      sameAs: [
        'https://www.linkedin.com/in/chris-bergstrom',
        'https://www.instagram.com/chrisleebergstrom',
        'https://www.youtube.com/@chrisleebergstrom',
        'https://www.facebook.com/share/15a8S2BF9S/?mibextid=wwXIfr',
      ],
      email: 'chrisleebergstrom@gmail.com',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://chrisleebergstrom.com/#underground',
      name: 'The Underground',
      alternateName: 'The Underground — Venue Management Sim',
      description:
        'A venue-management sim. Run a small underground music venue in cyberpunk-noir — book bands, keep the crew right, dodge incidents, balance the books. Twenty years of running venues, turned into a piece of working software.',
      url: 'https://underground-venue-manager.onrender.com',
      applicationCategory: 'GameApplication',
      applicationSubCategory: 'Simulation',
      operatingSystem: 'Web Browser',
      creator: { '@id': 'https://chrisleebergstrom.com/about#person' },
      author: { '@id': 'https://chrisleebergstrom.com/about#person' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      genre: 'Management simulation',
      keywords: 'venue management, music sim, cyberpunk noir, dive bar, browser game',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://chrisleebergstrom.com/#byte',
      name: 'Byte',
      alternateName: 'Byte — AI Assistant Over Email',
      description:
        'An AI assistant that lives in your inbox. Email byte@firstlyte.co, get a thoughtful reply in under 30 seconds — no app, no login, no account. Handles attachments, remembers threads, routes to the right model. Free community project.',
      url: 'https://firstlyte.co',
      applicationCategory: 'CommunicationApplication',
      operatingSystem: 'Web / Email',
      creator: { '@id': 'https://chrisleebergstrom.com/about#person' },
      author: { '@id': 'https://chrisleebergstrom.com/about#person' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      keywords: 'AI email assistant, inbox AI, agentic AI, free community project',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://chrisleebergstrom.com/#webpage',
      url: 'https://chrisleebergstrom.com',
      name: 'Chris Lee Bergstrom — AI Developer + 20 Years Live Entertainment',
      isPartOf: { '@id': 'https://chrisleebergstrom.com/#website' },
      about: { '@id': 'https://chrisleebergstrom.com/about#person' },
      mainEntity: { '@id': 'https://chrisleebergstrom.com/about#person' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['[data-speakable]'],
      },
      mainContentOfPage: [
        { '@id': 'https://chrisleebergstrom.com/#underground' },
        { '@id': 'https://chrisleebergstrom.com/#byte' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://chrisleebergstrom.com/#website',
      url: 'https://chrisleebergstrom.com',
      name: 'Chris Lee Bergstrom',
      description: 'Personal portfolio of Chris Lee Bergstrom — AI developer with 20 years in live entertainment.',
      publisher: {
        '@id': 'https://chrisleebergstrom.com/#organization',
      },
      inLanguage: 'en-US',
    },
  ],
};

export default async function LandingPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema) }}
      />
      <Header />
      <IndexClient />
      <Footer />
    </>
  );
}
