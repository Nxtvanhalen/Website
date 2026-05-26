import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: { absolute: 'Musings - CLB Consulting Blog | AI Insights & Industry Analysis' },
  description:
    "Strategic insights, AI analysis, and industry musings from CLB Consulting. Explore our thoughts on entertainment technology, team dynamics, and systems thinking.",
  alternates: { canonical: 'https://chrisleebergstrom.com/blog' },
  openGraph: {
    title: 'Musings | CLB Consulting',
    description:
      'Strategic insights and industry musings on AI, entertainment technology, and systems thinking from Chris Lee Bergstrom.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/blog',
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
    title: 'Musings | CLB Consulting',
    description:
      'Strategic insights and industry musings on AI, entertainment technology, and systems thinking from Chris Lee Bergstrom.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Musings - CLB Consulting Blog',
  description:
    'Strategic insights on AI, entertainment technology, and systems thinking from Chris Lee Bergstrom',
  url: 'https://chrisleebergstrom.com/blog',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://chrisleebergstrom.com/#organization',
    name: 'CLB Consulting',
  },
  author: {
    '@type': 'Person',
    '@id': 'https://chrisleebergstrom.com/about#person',
    name: 'Chris Lee Bergstrom',
  },
  blogPost: [],
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
        name: 'Blog',
        item: 'https://chrisleebergstrom.com/blog',
      },
    ],
  },
};

export default async function BlogPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        nonce={nonce}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient />
      <Footer />
    </>
  );
}
