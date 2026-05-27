import type { Metadata, Viewport } from 'next';
import { Chakra_Petch, JetBrains_Mono, Newsreader } from 'next/font/google';
import AnalyticsTracker from '../components/AnalyticsTracker';
import CookieConsentLoader from '../components/CookieConsentLoader';
import PersistentChat from '../components/PersistentChat';
import { ChatProvider } from '../context/ChatContext';
import '../styles/global.css';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-chakra-petch',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chrisleebergstrom.com'),
  title: {
    default: 'Chris Lee Bergstrom — AI Developer + 20 Years Live Entertainment',
    template: '%s | Chris Lee Bergstrom',
  },
  description:
    'AI developer with 20 years in live entertainment. Building agentic software for venues, tours, and live events — front-of-house engineer turned full-stack developer, using AI agents as the build team.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/images/Favicon/favicon.ico' },
      { url: '/images/Favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/Favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/images/Favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/images/Favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: { url: '/images/Favicon/apple-touch-icon.png', sizes: '180x180' },
  },
  other: {
    'msapplication-TileColor': '#000000',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// Force every route to render dynamically per request so framework scripts get the
// per-request nonce from proxy.ts. Without this, statically prerendered pages would
// ship unnonced <script> tags and all framework JS would be blocked by 'strict-dynamic'.
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      style={{ background: '#000' }}
    >
      <body style={{ background: '#000' }}>
        <ChatProvider>
          {children}
          <PersistentChat />
        </ChatProvider>
        <AnalyticsTracker />
        <CookieConsentLoader />
      </body>
    </html>
  );
}
