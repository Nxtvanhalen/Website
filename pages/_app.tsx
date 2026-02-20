import '../styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PersistentChat from '../components/PersistentChat';
import { ChatProvider } from '../context/ChatContext';

// Google Analytics tracking ID
const _GA_TRACKING_ID = 'G-XZ6CF9XQD7';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLandingPage = router.pathname === '/';
  useEffect(() => {
    // Store event listeners for proper cleanup
    const emailClickHandlers = new WeakMap();
    const ctaClickHandlers = new WeakMap();

    // Track email clicks for conversion analytics
    const trackEmailClicks = () => {
      document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        // Skip if already has a handler
        if (emailClickHandlers.has(link)) return;

        const handler = () => {
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'email_click', {
              event_category: 'engagement',
              event_label: link.getAttribute('href') || 'unknown',
              value: 1,
            });
          }
        };

        emailClickHandlers.set(link, handler);
        link.addEventListener('click', handler);
      });
    };

    // Track CTA button clicks specifically
    const trackCTAClicks = () => {
      // Track rotating CTA box clicks
      document.querySelectorAll('a[href*="subject=AI Project Inquiry"]').forEach((link) => {
        // Skip if already has a handler
        if (ctaClickHandlers.has(link)) return;

        const handler = () => {
          if (typeof window.gtag !== 'undefined') {
            const subject = link.getAttribute('href')?.match(/subject=([^&]*)/)?.[1] || 'unknown';
            window.gtag('event', 'cta_click', {
              event_category: 'conversion',
              event_label: decodeURIComponent(subject),
              value: 1,
            });
          }
        };

        ctaClickHandlers.set(link, handler);
        link.addEventListener('click', handler);
      });
    };

    // Initialize tracking after component mounts
    trackEmailClicks();
    trackCTAClicks();

    // Re-run tracking when new content is dynamically added (for rotating CTA boxes)
    const observer = new MutationObserver(() => {
      trackEmailClicks();
      trackCTAClicks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      // Note: WeakMaps will automatically clean up when elements are removed from DOM
    };
  }, []);

  return (
    <>
      <Head>
        {/* Resource hints for performance - only critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/images/Favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/Favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/Favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Favicon/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/Favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/images/Favicon/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <ChatProvider>
        {!isLandingPage && <Header />}
        <Component {...pageProps} />
        <PersistentChat />
        {!isLandingPage && <Footer />}
      </ChatProvider>
    </>
  );
}
