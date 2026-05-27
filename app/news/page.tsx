import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NewsClient from './NewsClient';

export const metadata: Metadata = {
  title: { absolute: 'News & Press | Chris Lee Bergstrom' },
  description:
    'Press coverage, podcast appearances, and music/video credits featuring Chris Lee Bergstrom — AI developer and 20-year live entertainment veteran.',
  alternates: { canonical: 'https://chrisleebergstrom.com/news' },
  openGraph: {
    title: 'News | Chris Lee Bergstrom',
    description:
      'Press coverage, podcast appearances, and credits featuring Chris Lee Bergstrom.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/news',
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
    title: 'News | Chris Lee Bergstrom',
    description:
      'Press coverage, podcast appearances, and credits featuring Chris Lee Bergstrom.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#9370DB',
  width: 'device-width',
  initialScale: 1,
};

const newsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'News & Press — Chris Lee Bergstrom',
  description:
    'Latest news, press coverage, and media appearances featuring Chris Lee Bergstrom',
  url: 'https://chrisleebergstrom.com/news',
  author: {
    '@type': 'Person',
    '@id': 'https://chrisleebergstrom.com/about#person',
    name: 'Chris Lee Bergstrom',
  },
  about: {
    '@type': 'Organization',
    '@id': 'https://chrisleebergstrom.com/#organization',
    name: 'CLB Consulting',
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
        name: 'News/Press',
        item: 'https://chrisleebergstrom.com/news',
      },
    ],
  },
};

export default async function NewsPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        nonce={nonce}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      <NewsClient />
      <Footer />
    </>
  );
}
