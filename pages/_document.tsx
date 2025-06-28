import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      {/* Critical CSS for immediate rendering */}
      <style dangerouslySetInnerHTML={{
        __html: `
          html { background-color: #1E1E1E; color: #ffffff; }
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; }
          .gallery-item { width: 320px; height: 240px; flex-shrink: 0; }
          .gallery-track-ticker { display: flex; animation: gallery-scroll 45s linear infinite; }
          @keyframes gallery-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-320px * 9 - 1.5rem * 8)); }
          }
        `
      }} />
      {/* Google tag (gtag.js) - Modified to respect cookie consent */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap"
      />
      
      {/* Osano CookieConsent - Must load before GA */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" 
      />
      <link 
        rel="stylesheet" 
        href="/styles/cookieconsent-overrides.css" 
      />
      <script 
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" 
        data-cfasync="false"
      ></script>
      
      {/* Initialize Cookie Consent with purple theme */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener("load", function(){
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
                  "allow": "Accept",
                  "deny": "Decline",
                  "link": "Learn more",
                  "href": "/privacy"
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
  )
}