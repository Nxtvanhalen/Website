// Cookie consent bootstrap + Google Analytics loader.
// Extracted from pages/_document.tsx so it's served from 'self' and covered
// by script-src 'self' — no need for 'unsafe-inline' on this script.
// Loaded with `defer` after /static/cookieconsent.js to preserve init order.

window.addEventListener('load', function () {
  if (typeof window.cookieconsent === 'undefined') {
    console.warn('CookieConsent library not loaded');
    return;
  }
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: '#1E1E1E',
        text: '#ffffff',
        border: '2px solid #9370DB',
      },
      button: {
        background: '#9370DB',
        text: '#ffffff',
        border: 'transparent',
      },
    },
    theme: 'classic',
    position: 'bottom',
    type: 'opt-in',
    content: {
      message:
        "We use cookies to enhance your experience and analyze site usage. By clicking 'Accept', you consent to our use of cookies.",
      allow: 'Accept Cookies',
      deny: 'Decline Cookies',
      link: 'Cookies Policy',
      href: '/privacy',
    },
    elements: {
      allow:
        '<button aria-label="Accept cookies" class="cc-btn cc-allow">{{allow}}</button>',
      deny:
        '<button aria-label="Decline cookies" class="cc-btn cc-deny">{{deny}}</button>',
    },
    onStatusChange: function (status) {
      if (status === 'allow') {
        loadGoogleAnalytics();
      }
    },
    onInitialise: function (status) {
      if (status === 'allow') {
        loadGoogleAnalytics();
      }
    },
  });
});

function loadGoogleAnalytics() {
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XZ6CF9XQD7';
  document.head.appendChild(gaScript);

  gaScript.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XZ6CF9XQD7');
  };
}
