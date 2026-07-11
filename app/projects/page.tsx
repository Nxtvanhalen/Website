import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: { absolute: 'Projects | Chris Lee Bergstrom — AI & Entertainment Tech' },
  description:
    'Selected work and project archive from Chris Lee Bergstrom: agentic AI tools, entertainment-tech systems, and live-events software. Featuring The Underground, Byte, R.Y.D.E.R., Chester, Fuel Estimator, Beacons, EVA, and more.',
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
      name: 'The Underground',
      url: 'https://underground-venue-manager.onrender.com',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Venue-management sim in cyberpunk-noir — book bands, keep the crew right, dodge incidents, balance the books. Twenty years of running venues, turned into a game.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Byte',
      url: 'https://firstlyte.co',
      applicationCategory: 'CommunicationApplication',
      operatingSystem: 'Web / Email',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'AI assistant that lives in your inbox. Email byte@firstlyte.co for thoughtful replies in under 30 seconds — no app, no login.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'R.Y.D.E.R.',
      url: 'https://ryder-k6er.onrender.com',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Trauma-aware mental-health AI for creatives. Anonymous, reflective.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Chester',
      url: 'https://chesterchess.com',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'AI chess game built in public to explore decision-making and game theory.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Fuel Estimator',
      url: 'https://mt-fuel.onrender.com',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Tour-bus fuel cost calculator — estimate fuel spend across routes, miles, and price-per-gallon so tour budgets hold up before the wheels roll.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://chrisleebergstrom.com/#beacons',
      name: 'Beacons',
      url: 'https://beaconsio.com',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'iOS / Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      provider: { '@id': 'https://chrisleebergstrom.com/#organization' },
      keywords:
        'SPL monitoring, acoustic monitoring, sound level monitoring, noise compliance, live events, Portland Oregon',
      description:
        'iPhone-based SPL and acoustic monitoring for live events. Cloud logging, real-time analysis, predictive insight. Operated by Christopher Lee Bergstrom (CLB Consulting), Portland, Oregon.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'EVA — Events Virtual Assistant',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Logistics, routing, and crew management AI for live events.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'EVE',
      url: 'https://chrisleebergstrom.com',
      applicationCategory: 'Bot',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        "Conversational AI concierge for Chris Lee Bergstrom's portfolio — knows every page, project, and the work behind it.",
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Glytch',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Local/Offline',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Local offline AI experiment — no guardrails.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'JAMES',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Core memory and multi-agent orchestration backbone.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'TARS',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'iOS / Local',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'On-device privacy-first AI.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'LogiRoute',
      url: 'https://logi-route-a9c09ae8.base44.app',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Touring-schedule route optimization, built in the open.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Guardian',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Server-side',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Server-side bot protection and monitoring.',
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
