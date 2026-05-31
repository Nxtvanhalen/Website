'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    // Plausible's global, injected by the script tag in layout.tsx. Optional
    // because an ad-blocker may prevent the script from loading.
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export default function AnalyticsTracker() {
  useEffect(() => {
    const emailClickHandlers = new WeakMap<Element, () => void>();
    const ctaClickHandlers = new WeakMap<Element, () => void>();

    const trackEmailClicks = () => {
      document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        if (emailClickHandlers.has(link)) return;
        const handler = () => {
          const href = link.getAttribute('href') || 'unknown';
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'email_click', {
              event_category: 'engagement',
              event_label: href,
              value: 1,
            });
          }
          // Mirror to Plausible (fires for consent-decliners too — cookieless).
          window.plausible?.('Email Click', { props: { href } });
        };
        emailClickHandlers.set(link, handler);
        link.addEventListener('click', handler);
      });
    };

    const trackCTAClicks = () => {
      document.querySelectorAll('a[href*="subject=AI Project Inquiry"]').forEach((link) => {
        if (ctaClickHandlers.has(link)) return;
        const handler = () => {
          const subject = decodeURIComponent(
            link.getAttribute('href')?.match(/subject=([^&]*)/)?.[1] || 'unknown',
          );
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'cta_click', {
              event_category: 'conversion',
              event_label: subject,
              value: 1,
            });
          }
          // Mirror to Plausible — this is your highest-intent event (project inquiry).
          window.plausible?.('CTA Click', { props: { subject } });
        };
        ctaClickHandlers.set(link, handler);
        link.addEventListener('click', handler);
      });
    };

    trackEmailClicks();
    trackCTAClicks();

    const observer = new MutationObserver(() => {
      trackEmailClicks();
      trackCTAClicks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
