import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Consulting Services for Venues & Arts Organizations',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              '@id': 'https://chrisleebergstrom.com/#operational-consulting',
              name: 'Operational Consulting',
              description:
                'The whole venue, not just the stage. Booking, marketing, F&B, security, and safety—analyzed from load in to load out.',
              url: 'https://chrisleebergstrom.com/operations-consulting',
              provider: { '@id': 'https://chrisleebergstrom.com/#organization' },
              serviceType: 'Venue Operations Consulting',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              '@id': 'https://chrisleebergstrom.com/#ai-training',
              name: 'AI Education & Training',
              description:
                'Practical AI training for teams ready to lead — from ethics to implementation, drawn from years of agentic AI development in production.',
              provider: { '@id': 'https://chrisleebergstrom.com/#organization' },
              serviceType: 'AI Training and Education',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              '@id': 'https://chrisleebergstrom.com/#web-security',
              name: 'Guardian / Web Security',
              description:
                'Bot protection, ticket scalping protection, security hardening, and accessibility for venue websites.',
              provider: { '@id': 'https://chrisleebergstrom.com/#organization' },
              serviceType: 'Web Security and Accessibility',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              '@id': 'https://chrisleebergstrom.com/#executive-coaching',
              name: 'Executive Coaching',
              description:
                'Strategic guidance for arts leaders navigating growth and change. Governance, leadership development, boards, budgets.',
              provider: { '@id': 'https://chrisleebergstrom.com/#organization' },
              serviceType: 'Executive Coaching for Arts Leaders',
            },
          },
        ],
      },
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
      sameAs: [
        'https://www.linkedin.com/in/chris-bergstrom',
        'https://www.instagram.com/chrisleebergstrom',
        'https://www.youtube.com/@chrisleebergstrom',
        'https://www.facebook.com/share/15a8S2BF9S/?mibextid=wwXIfr',
      ],
      email: 'chrisleebergstrom@gmail.com',
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
      <IndexClient />
    </>
  );
}
