import type { Metadata, Viewport } from 'next';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for CLB Consulting - How we collect, use, and protect your information',
  robots: 'index, follow',
  alternates: { canonical: 'https://chrisleebergstrom.com/privacy' },
  openGraph: {
    title: 'Privacy | CLB Consulting',
    description:
      'Privacy Policy for CLB Consulting - How we collect, use, and protect your information',
    type: 'website',
    url: 'https://chrisleebergstrom.com/privacy',
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
    title: 'Privacy | CLB Consulting',
    description:
      'Privacy Policy for CLB Consulting - How we collect, use, and protect your information',
    images: ['/images/profile/chris-profile-square-2.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#9370DB',
  width: 'device-width',
  initialScale: 1,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <PrivacyClient />
      <Footer />
    </>
  );
}
