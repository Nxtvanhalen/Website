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
      name: 'What does Chris actually do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chris is an AI developer with 20 years in live entertainment. He builds agentic software for venues, tours, and live events — using AI agents as the build team. He still consults on venue operations, AI training, and web security when it is the right fit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does your operational consulting cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chris analyzes your entire operation from load-in to load-out: staffing, safety audits, F&B flow, logistics, marketing, booking, and emergency preparedness. He's never cost a client more than he's saved them.",
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
        text: 'Chris provides comprehensive web and app security including vulnerability assessments, penetration testing, security audits, and compliance guidance. He identifies weaknesses before they become breaches.',
      },
    },
    {
      '@type': 'Question',
      name: "What's your approach to leadership and team building?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chris treats culture as infrastructure. His approach includes 1:1 executive coaching, team development, and organizational culture design — interdisciplinary by design. The goal: leaders who navigate pressure with clarity and teams that thrive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chris's core expertise spans entertainment, logistics, audio and acoustical analysis, and live events, but his systems-thinking approach translates across industries.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with small venues or only large productions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chris works across the full spectrum—from intimate 200-seat theaters to major festival productions. Smaller venues often benefit most from systematic thinking; larger productions need it because complexity compounds fast.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer ongoing support after implementation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. Chris doesn't just build systems and walk away—he ensures they thrive. His approach includes training, optimization, and continuous improvement.",
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
      <Footer />
    </>
  );
}
