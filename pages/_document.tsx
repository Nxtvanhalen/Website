import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Critical CSS for immediate rendering */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                html { background-color: #000000; color: #ffffff; }
                body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; }
                .gallery-item { width: 320px; height: 240px; flex-shrink: 0; }
                .gallery-track-ticker { display: flex; animation: gallery-scroll 45s linear infinite; }
                @keyframes gallery-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(calc(-320px * 9 - 1.5rem * 8)); }
                }
                /* Cookie Consent Overrides */
                .cc-window { z-index: 999999 !important; }
                .cc-link { cursor: pointer !important; text-decoration: underline !important; }
              `,
            }}
          />
          {/* Google tag (gtag.js) - Modified to respect cookie consent */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap"
          />

          {/* Osano CookieConsent - Loaded locally to avoid ad-blockers */}
          <link rel="stylesheet" href="/static/cookieconsent.css" />
          <script src="/static/cookieconsent.js" data-cfasync="false" defer></script>

          {/* Initialize Cookie Consent with purple theme */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.addEventListener("load", function(){
              if (typeof window.cookieconsent === 'undefined') {
                console.warn('CookieConsent library not loaded');
                return;
              }
              window.cookieconsent.initialise({
                "palette": {
                  "popup": {
                    "background": "#1E1E1E",
                    "text": "#ffffff",
                    "border": "2px solid #9370DB"
                  },
                  "button": {
                    "background": "#9370DB",
                    "text": "#ffffff",
                    "border": "transparent"
                  }
                },
                "theme": "classic",
                "position": "bottom",
                "type": "opt-in",
                "content": {
                  "message": "We use cookies to enhance your experience and analyze site usage. By clicking 'Accept', you consent to our use of cookies.",
                  "allow": "Accept Cookies",
                  "deny": "Decline Cookies",
                  "link": "Cookies Policy",
                  "href": "/privacy"
                },
                "elements": {
                  "allow": '<button aria-label="Accept cookies" class="cc-btn cc-allow">{{allow}}</button>',
                  "deny": '<button aria-label="Decline cookies" class="cc-btn cc-deny">{{deny}}</button>'
                },
                onStatusChange: function(status, chosenBefore) {
                  if (status === 'allow') {
                    // Load Google Analytics only after consent
                    loadGoogleAnalytics();
                  }
                },
                onInitialise: function(status) {
                  if (status === 'allow') {
                    // Load Google Analytics if already consented
                    loadGoogleAnalytics();
                  }
                }
              });
            });
            
            // Function to load Google Analytics
            function loadGoogleAnalytics() {
              // Create GA script element
              var gaScript = document.createElement('script');
              gaScript.async = true;
              gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XZ6CF9XQD7';
              document.head.appendChild(gaScript);
              
              // Initialize gtag
              gaScript.onload = function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'G-XZ6CF9XQD7');
              };
            }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
