import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: { absolute: 'Projects | Chris Lee Bergstrom — AI & Entertainment Tech' },
  description:
    'Selected work and project archive from Chris Lee Bergstrom: agentic AI tools, entertainment-tech systems, and live-events software. Featuring The Underground, Byte, Master Tour, EVA, Ryder, and more.',
  alternates: { canonical: 'https://chrisleebergstrom.com/projects' },
  openGraph: {
    title: 'Projects | Chris Lee Bergstrom',
    description:
      'Selected work from Chris Lee Bergstrom: agentic AI tools, entertainment-tech systems, and live-events software.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/projects',
    images: [
      {
        url: '/images/profile/chris-profile-square-2.jpg',
        width: 1200,
        height: 1200,
        alt: 'Chris Lee Bergstrom - AI Strategy Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chrisleebergstrom',
    creator: '@chrisleebergstrom',
    title: 'Projects | Chris Lee Bergstrom',
    description:
      'Selected work from Chris Lee Bergstrom: agentic AI tools, entertainment-tech systems, and live-events software.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects — Chris Lee Bergstrom',
  description: 'Showcase of AI, entertainment-tech, and live-events projects by Chris Lee Bergstrom.',
  url: 'https://chrisleebergstrom.com/projects',
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
        name: 'Projects',
        item: 'https://chrisleebergstrom.com/projects',
      },
    ],
  },
  hasPart: [
    {
      '@type': 'SoftwareApplication',
      name: 'Master Tour Venue',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser, iOS, Android',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'The next evolution of tech pack data for venues and artists',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'AI Powered Remote SPL',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Cloud-based SPL monitoring for events and construction',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'EVA — Events Virtual Assistant',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Logistics, routing, and crew management AI',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'R.Y.D.E.R.',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Mental Health AI for Creatives',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'EVE',
      applicationCategory: 'Bot',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        "Conversational AI concierge for Chris Lee Bergstrom's portfolio — knows every page, project, and the work behind it.",
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Glytch',
      applicationCategory: 'Bot',
      operatingSystem: 'Local/Offline',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Local AI experiment - offline, unhinged, testing the limits',
    },
  ],
};

export default async function ProjectsPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <ProjectsClient />
      <Footer />
    </>
  );
}
