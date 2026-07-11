import type { Metadata, Viewport } from 'next';
import { Chakra_Petch, JetBrains_Mono, Newsreader } from 'next/font/google';
import { headers } from 'next/headers';
import AnalyticsTracker from '../components/AnalyticsTracker';
import CookieConsentLoader from '../components/CookieConsentLoader';
import PersistentChat from '../components/PersistentChat';
import { ChatProvider } from '../context/ChatContext';
import '../styles/global.css';

// Plausible Analytics — privacy-first, cookieless, and consent-free, so unlike
// GA (which is gated behind CookieConsentLoader) it runs for every visitor.
// Loaded in production only. New per-site Plausible script — this URL is unique
// to the chrisleebergstrom.com site (Plausible → Site Settings → General →
// Site Installation).
const PLAUSIBLE_SRC = 'https://plausible.io/js/pa-MldANz3p0vcZConl9x759.js';
const isProd = process.env.NODE_ENV === 'production';

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
  // Site-wide fallback share image. Without one, any page missing its own
  // openGraph.images makes link previews (iMessage etc.) scrape the page and
  // pick the transparent header logo, which renders on a checkerboard.
  openGraph: {
    images: [
      {
        url: '/images/profile/chris-profile-square-2.jpg',
        width: 1200,
        height: 1200,
        alt: 'Chris Lee Bergstrom — AI developer and live entertainment veteran',
      },
    ],
  },
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Per-request nonce threaded through by proxy.ts — required so the Plausible
  // <script> tags satisfy the 'strict-dynamic' CSP (an unnonced tag would be
  // blocked). Same pattern as the per-page JSON-LD scripts.
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      style={{ background: '#000' }}
    >
      <body style={{ background: '#000' }}>
        {isProd && (
          <>
            <script defer src={PLAUSIBLE_SRC} nonce={nonce} />
            {/* New Plausible bootstrap + init — defines window.plausible (so the
                email/CTA events in AnalyticsTracker keep working) and starts
                auto pageview capture. Nonced to satisfy the strict-dynamic CSP. */}
            <script
              nonce={nonce}
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html:
                  'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()',
              }}
            />
          </>
        )}
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
