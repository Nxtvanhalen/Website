import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: {
    absolute: 'About Chris Lee Bergstrom | Sound Engineer to AI Strategist - CLB Consulting',
  },
  description:
    'From live sound engineering to AI systems architecture. Two decades of global entertainment experience. The origin story behind CLB Consulting.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  authors: [{ name: 'Chris Lee Bergstrom' }],
  keywords: [
    'Chris Lee Bergstrom',
    'audio engineer',
    'AI strategist',
    'live sound',
    'entertainment technology',
    'CLB Consulting',
    'Grammy nominated',
    'tour management',
    'systems architecture',
  ],
  alternates: { canonical: 'https://chrisleebergstrom.com/about' },
  openGraph: {
    title: 'About | CLB Consulting',
    description:
      'From live sound engineering to AI systems architecture. Two decades of global entertainment experience. The origin story behind CLB Consulting.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/about',
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
    title: 'About | CLB Consulting',
    description:
      'From live sound engineering to AI systems architecture. Two decades of global entertainment experience. The origin story behind CLB Consulting.',
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
    jobTitle: 'AI Strategy Consultant & Founder of CLB Consulting',
    description:
      'Grammy-nominated audio engineer turned AI consultant specializing in entertainment technology and live events. Founder and principal consultant at CLB Consulting.',
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
    hasCredential: 'Grammy-nominated Audio Engineer',
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient />
      <Footer />
    </>
  );
}
