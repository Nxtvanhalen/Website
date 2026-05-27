'use client';

import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-XZ6CF9XQD7';

function loadGoogleAnalytics() {
  if (window.gtag) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  s.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
  };
  document.head.appendChild(s);
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function CookieConsentLoader() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const CookieConsent = await import('vanilla-cookieconsent');
      await import('vanilla-cookieconsent/dist/cookieconsent.css');
      if (cancelled) return;

      await CookieConsent.run({
        guiOptions: {
          consentModal: { layout: 'bar', position: 'bottom center', equalWeightButtons: false, flipButtons: false },
        },
        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: { enabled: false },
        },
        language: {
          default: 'en',
          translations: {
            en: {
              consentModal: {
                title: 'Cookies',
                description:
                  'We use cookies to enhance your experience and analyze site usage. Read our <a href="/privacy">cookie policy</a>.',
                acceptAllBtn: 'Accept Cookies',
                acceptNecessaryBtn: 'Decline Cookies',
              },
              preferencesModal: {
                title: 'Cookie preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Decline all',
                savePreferencesBtn: 'Save preferences',
                closeIconLabel: 'Close',
                sections: [
                  {
                    title: 'Strictly necessary',
                    description:
                      'These cookies are essential for the website to function and cannot be disabled.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Analytics',
                    description:
                      'Help us understand how visitors use the site so we can improve it (Google Analytics).',
                    linkedCategory: 'analytics',
                  },
                ],
              },
            },
          },
        },
        onConsent: () => {
          if (CookieConsent.acceptedCategory('analytics')) {
            loadGoogleAnalytics();
          }
        },
        onChange: () => {
          if (CookieConsent.acceptedCategory('analytics')) {
            loadGoogleAnalytics();
          }
        },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
