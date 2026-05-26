import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: { absolute: 'FAQ - CLB Consulting | Operations, AI, Security & Leadership' },
  description:
    "Frequently asked questions about CLB Consulting's operational consulting, AI training, web security, and leadership coaching services for venues and live entertainment.",
  alternates: { canonical: 'https://chrisleebergstrom.com/faq' },
  openGraph: {
    title: 'FAQ | CLB Consulting',
    description:
      'Get answers about operational consulting, AI training, web security, and leadership coaching for venues and live entertainment.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/faq',
    images: [
      {
        url: '/images/profile/chris-profile-square-2.jpg',
        width: 1200,
        height: 1200,
        alt: 'Chris Lee Bergstrom - AI Strategy Consultant and Audio Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chrisleebergstrom',
    creator: '@chrisleebergstrom',
    title: 'FAQ | CLB Consulting',
    description:
      'Get answers about operational consulting, AI training, web security, and leadership coaching for venues and live entertainment.',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'Frequently Asked Questions - CLB Consulting',
  description:
    "Common questions about CLB Consulting's operational consulting, AI training, web security, and leadership coaching services",
  url: 'https://chrisleebergstrom.com/faq',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://chrisleebergstrom.com/#organization',
    name: 'CLB Consulting',
  },
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes CLB Consulting different?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chris brings 20 years of live entertainment experience across four core areas: Operational Consulting, AI Education & Training, Web & App Security, and Leadership Coaching. Where most consultants specialize narrowly, Chris sees the whole system.',
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
        text: 'Chris is in the top 3.7% of AI users worldwide, offering ethics-first implementation training, hands-on tool mastery, and AI workflows that serve your mission. Training covers foundational AI literacy to advanced multi-modal integrations.',
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
        text: 'Chris treats culture as infrastructure. His approach includes 1:1 executive coaching, team development, and organizational culture design. CLB teams are interdisciplinary by design. The goal: leaders who navigate pressure with clarity and teams that thrive.',
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
