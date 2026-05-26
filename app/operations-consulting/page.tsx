import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import OperationsConsultingClient from './OperationsConsultingClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Operations Consulting | Venue & Entertainment Operations - CLB Consulting',
  },
  description:
    'Expert operations consulting for venues and live entertainment. Find hidden losses, fix labor inefficiencies, prevent safety issues, and optimize your bottom line. 20 years of hands-on experience.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  authors: [{ name: 'Chris Lee Bergstrom' }],
  keywords: [
    'operations consulting',
    'venue operations',
    'entertainment consulting',
    'labor efficiency',
    'safety compliance',
    'logistics optimization',
    'production management',
    'venue management',
    'live events consulting',
    'Chris Lee Bergstrom',
    'CLB Consulting',
  ],
  alternates: { canonical: 'https://chrisleebergstrom.com/operations-consulting' },
  openGraph: {
    title: 'Operations Consulting | CLB Consulting',
    description:
      'Expert operations consulting for venues and live entertainment. Find hidden losses, fix labor inefficiencies, prevent safety issues, and optimize your bottom line.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/operations-consulting',
    images: [
      {
        url: '/images/operational.webp',
        width: 1200,
        height: 630,
        alt: 'Operations Consulting - CLB Consulting by Chris Lee Bergstrom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chrisleebergstrom',
    creator: '@chrisleebergstrom',
    title: 'Operations Consulting | CLB Consulting',
    description:
      'Expert operations consulting for venues and live entertainment. Find hidden losses, fix labor inefficiencies, prevent safety issues, and optimize your bottom line.',
    images: ['/images/operational.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#9370DB',
  width: 'device-width',
  initialScale: 1,
};

const operationsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://chrisleebergstrom.com/operations-consulting#service',
  name: 'Operations Consulting',
  description:
    'Expert operations consulting for venues and live entertainment. Comprehensive audits, strategic solutions, risk prevention, and measurable cost savings.',
  provider: {
    '@type': 'Organization',
    '@id': 'https://chrisleebergstrom.com/#organization',
    name: 'CLB Consulting',
  },
  serviceType: 'Venue Operations Consulting',
  areaServed: 'Worldwide',
  audience: {
    '@type': 'Audience',
    audienceType: 'Venues, Arts Organizations, Live Entertainment Companies',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Operations Consulting Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Operational Audit',
          description:
            'Review schedules, settlements, vendor contracts, and crew logs to identify cost leaks',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Strategic Solutions',
          description:
            'Proven methodologies addressing root causes of operational inefficiencies',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Risk Prevention',
          description:
            'Identify compliance gaps and safety issues before they become costly problems',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Measurable Results',
          description: 'Cost savings that consistently exceed consulting fees',
        },
      },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://chrisleebergstrom.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Operations Consulting',
        item: 'https://chrisleebergstrom.com/operations-consulting',
      },
    ],
  },
};

export default async function OperationsConsultingPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        nonce={nonce}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(operationsSchema) }}
      />
      <OperationsConsultingClient />
      <Footer />
    </>
  );
}
