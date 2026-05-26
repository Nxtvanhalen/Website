import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: {
    absolute: 'CLB Consulting | Chris Lee Bergstrom - AI Strategy & Entertainment Technology',
  },
  description:
    'Operations consulting, AI training, web security, and executive coaching for venues and arts organizations. 20 years of live entertainment expertise from Chris Lee Bergstrom.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  authors: [{ name: 'Chris Lee Bergstrom' }],
  keywords: [
    'AI consulting',
    'venue operations',
    'entertainment technology',
    'executive coaching',
    'web security',
    'bot protection',
    'AI training',
    'live events',
    'arts organizations',
    'Chris Lee Bergstrom',
    'CLB Consulting',
  ],
  alternates: { canonical: 'https://chrisleebergstrom.com/home' },
  openGraph: {
    title: 'CLB Consulting | Venue Operations & AI Training',
    description:
      'Operations consulting, AI training, web security, and executive coaching for venues and arts organizations. 20 years of live entertainment expertise from Chris Lee Bergstrom.',
    type: 'website',
    url: 'https://chrisleebergstrom.com',
    images: [
      {
        url: '/images/profile/chris-profile-square-2.jpg',
        width: 1200,
        height: 1200,
        alt: 'Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chrisleebergstrom',
    creator: '@chrisleebergstrom',
    title: 'CLB Consulting | Venue Operations & AI Training',
    description:
      'Operations consulting, AI training, web security, and executive coaching for venues and arts organizations. 20 years of live entertainment expertise from Chris Lee Bergstrom.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#9370DB',
  width: 'device-width',
  initialScale: 1,
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://chrisleebergstrom.com/#organization',
      name: 'CLB Consulting',
      alternateName: ['CLB Consultancy', 'Chris Lee Bergstrom Consulting'],
      url: 'https://chrisleebergstrom.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chrisleebergstrom.com/images/profile/chris-profile.jpg',
      },
      image: 'https://chrisleebergstrom.com/images/profile/chris-profile.jpg',
      description:
        'CLB Consulting is the strategic consulting practice of Chris Lee Bergstrom, specializing in AI-driven solutions for entertainment, hospitality, and live events industry',
      slogan: 'Strategy Born from the Wreckage, Intelligence Forged in the Fire',
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
                'In the top 3.7% of AI users worldwide. From ethics to implementation—practical training for teams ready to lead.',
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
      jobTitle: 'AI Strategy Consultant & Founder',
      description:
        'Grammy-nominated audio engineer turned AI consultant specializing in entertainment technology and live events. Founder and principal consultant at CLB Consulting.',
      url: 'https://chrisleebergstrom.com/about',
      image: 'https://chrisleebergstrom.com/images/profile/chris-profile.jpg',
      worksFor: {
        '@id': 'https://chrisleebergstrom.com/#organization',
      },
      owns: {
        '@id': 'https://chrisleebergstrom.com/#organization',
      },
      hasCredential: 'Grammy-nominated Audio Engineer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Professional Audio Engineering Background',
      },
      knowsAbout: [
        'AI Implementation',
        'Entertainment Industry',
        'Audio Engineering',
        'Live Sound Production',
        'Tour Management',
        'Multi-Modal AI Systems',
        'Team Cohesion Strategies',
        'SMAART System Analysis and Training',
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
      name: 'CLB Consulting',
      description: 'AI consulting for entertainment, hospitality, and live events',
      publisher: {
        '@id': 'https://chrisleebergstrom.com/#organization',
      },
      inLanguage: 'en-US',
    },
  ],
};

export default async function HomePage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        nonce={nonce}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomeClient />
      <Footer />
    </>
  );
}
