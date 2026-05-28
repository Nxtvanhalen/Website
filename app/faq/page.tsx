import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: { absolute: 'FAQ | Chris Lee Bergstrom' },
  description:
    'Common questions about working with Chris Lee Bergstrom — agentic AI development, live-entertainment software, and the occasional consultation on venue operations, AI training, and web security.',
  alternates: { canonical: 'https://chrisleebergstrom.com/faq' },
  openGraph: {
    title: 'FAQ | Chris Lee Bergstrom',
    description:
      'Common questions about working with Chris Lee Bergstrom — AI development, live-entertainment software, and consulting.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/faq',
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
    title: 'FAQ | Chris Lee Bergstrom',
    description:
      'Common questions about working with Chris Lee Bergstrom — AI development, live-entertainment software, and consulting.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'Frequently Asked Questions — Chris Lee Bergstrom',
  description:
    'Common questions about working with Chris Lee Bergstrom — AI development, live-entertainment software, and consulting.',
  url: 'https://chrisleebergstrom.com/faq',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://chrisleebergstrom.com/#organization',
    name: 'CLB Consulting',
  },
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What do you actually do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "I'm an AI developer with 20 years in live entertainment. I build agentic software for venues, tours, and live events — using AI agents as the build team. I still consult on venue operations, AI training, and web security when it is the right fit.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does your operational consulting cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "I analyze your entire operation from load-in to load-out: staffing, safety audits, F&B flow, logistics, marketing, booking, and emergency preparedness. I've never cost a client more than I've saved them.",
      },
    },
    {
      '@type': 'Question',
      name: 'What AI education and training do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Practical AI training for teams ready to lead — ethics-first implementation, hands-on tool mastery, and AI workflows that serve your mission. Covers foundational AI literacy through advanced agentic and multi-modal integrations, drawn from years of agentic AI development in production.',
      },
    },
    {
      '@type': 'Question',
      name: 'What security services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I provide comprehensive web and app security including vulnerability assessments, penetration testing, security audits, and compliance guidance. I identify weaknesses before they become breaches.',
      },
    },
    {
      '@type': 'Question',
      name: "What's your approach to leadership and team building?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I treat culture as infrastructure. My approach includes 1:1 executive coaching, team development, and organizational culture design — interdisciplinary by design. The goal: leaders who navigate pressure with clarity and teams that thrive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'My core expertise spans entertainment, logistics, audio and acoustical analysis, and live events, but the systems-thinking approach translates across industries.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with small venues or only large productions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I work across the full spectrum—from intimate 200-seat theaters to major festival productions. Smaller venues often benefit most from systematic thinking; larger productions need it because complexity compounds fast.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer ongoing support after implementation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. I don't just build systems and walk away — I make sure they thrive. My approach includes training, optimization, and continuous improvement.",
      },
    },
  ],
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
        name: 'FAQ',
        item: 'https://chrisleebergstrom.com/faq',
      },
    ],
  },
};

export default async function FaqPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
      <Footer />
    </>
  );
}
