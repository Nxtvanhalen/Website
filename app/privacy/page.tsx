import type { Metadata, Viewport } from 'next';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for chrisleebergstrom.com — how we collect, use, and protect your information. CLB Consulting is the legal entity that owns this site.',
  robots: 'index, follow',
  alternates: { canonical: 'https://chrisleebergstrom.com/privacy' },
  openGraph: {
    title: 'Privacy | Chris Lee Bergstrom',
    description:
      'Privacy policy for chrisleebergstrom.com — how we collect, use, and protect your information. CLB Consulting is the legal entity that owns this site.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/privacy',
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
    title: 'Privacy | Chris Lee Bergstrom',
    description:
      'Privacy policy for chrisleebergstrom.com — how we collect, use, and protect your information. CLB Consulting is the legal entity that owns this site.',
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
