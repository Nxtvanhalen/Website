import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: {
    absolute: 'About | Chris Lee Bergstrom — Front-of-House Engineer Turned AI Developer',
  },
  description:
    'Origin story: 20 years in live entertainment — front of house, tour management, technical direction with The Dandy Warhols, Black Rebel Motorcycle Club, and Macklemore. Now building the software.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  authors: [{ name: 'Chris Lee Bergstrom' }],
  keywords: [
    'Chris Lee Bergstrom',
    'AI developer',
    'front-of-house engineer',
    'live sound engineer',
    'tour manager',
    'technical director',
    'agentic AI',
    'entertainment technology',
    'Dandy Warhols front of house',
    'BRMC tour manager',
    'Macklemore tour',
  ],
  alternates: { canonical: 'https://chrisleebergstrom.com/about' },
  openGraph: {
    title: 'About | Chris Lee Bergstrom',
    description:
      'Origin story: 20 years in live entertainment — front of house, tour management, technical direction. Now building the software.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/about',
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
    title: 'About | Chris Lee Bergstrom',
    description:
      'Origin story: 20 years in live entertainment — front of house, tour management, technical direction. Now building the software.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#9370DB',
  width: 'device-width',
  initialScale: 1,
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://chrisleebergstrom.com/about#person',
    name: 'Chris Lee Bergstrom',
    alternateName: ['Chris Bergstrom', 'CLB'],
    jobTitle: 'AI Developer',
    description:
      'AI developer with 20 years in live entertainment. Two decades of front-of-house, tour management, and technical direction — touring with The Dandy Warhols, Black Rebel Motorcycle Club, and Macklemore. Now building software with AI agents as the build team.',
    image: 'https://chrisleebergstrom.com/images/profile/chris-profile.jpg',
    email: 'chrisleebergstrom@gmail.com',
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://chrisleebergstrom.com/#organization',
      name: 'CLB Consulting',
    },
    founder: {
      '@type': 'Organization',
      '@id': 'https://chrisleebergstrom.com/#organization',
      name: 'CLB Consulting',
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
        name: 'About',
        item: 'https://chrisleebergstrom.com/about',
      },
    ],
  },
};

export default async function AboutPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient />
      <Footer />
    </>
  );
}
