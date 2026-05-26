'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
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

    const trackCTAClicks = () => {
      document.querySelectorAll('a[href*="subject=AI Project Inquiry"]').forEach((link) => {
        if (ctaClickHandlers.has(link)) return;
        const handler = () => {
          if (typeof window.gtag !== 'undefined') {
            const subject =
              link.getAttribute('href')?.match(/subject=([^&]*)/)?.[1] || 'unknown';
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
