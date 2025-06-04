import '../styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Google Analytics tracking ID
const GA_TRACKING_ID = 'G-XZ6CF9XQD7';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Track email clicks for conversion analytics
    const trackEmailClicks = () => {
      document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'email_click', {
              event_category: 'engagement',
              event_label: link.getAttribute('href') || 'unknown',
              value: 1
            });
          }
        });
      });
    };

    // Track CTA button clicks specifically
    const trackCTAClicks = () => {
      // Track rotating CTA box clicks
      document.querySelectorAll('a[href*="subject=AI Project Inquiry"]').forEach(link => {
        link.addEventListener('click', () => {
          if (typeof window.gtag !== 'undefined') {
            const subject = link.getAttribute('href')?.match(/subject=([^&]*)/)?.[1] || 'unknown';
            window.gtag('event', 'cta_click', {
              event_category: 'conversion',
              event_label: decodeURIComponent(subject),
              value: 1
            });
          }
        });
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
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/images/Favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/Favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/Favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/Favicon/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#9370DB" />
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true
            });
          `}
        </Script>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}