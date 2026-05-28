import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: { absolute: 'Musings | Chris Lee Bergstrom — AI, Live Entertainment, Systems Thinking' },
  description:
    'Musings on agentic AI, live entertainment technology, and the work of building software with AI as the team. Notes from Chris Lee Bergstrom.',
  alternates: { canonical: 'https://chrisleebergstrom.com/blog' },
  openGraph: {
    title: 'Musings | Chris Lee Bergstrom',
    description:
      'Notes on agentic AI, live entertainment tech, and systems thinking from Chris Lee Bergstrom.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/blog',
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
    title: 'Musings | Chris Lee Bergstrom',
    description:
      'Notes on agentic AI, live entertainment tech, and systems thinking from Chris Lee Bergstrom.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Musings — Chris Lee Bergstrom',
  description:
    'Notes on agentic AI, live entertainment tech, and systems thinking from Chris Lee Bergstrom',
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
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient />
      <Footer />
    </>
  );
}
