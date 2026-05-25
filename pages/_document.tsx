import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap"
          />

          {/* Osano CookieConsent - Loaded locally to avoid ad-blockers */}
          <link rel="stylesheet" href="/static/cookieconsent.css" />
          <script src="/static/cookieconsent.js" data-cfasync="false" defer></script>
          {/* Init script extracted to /static/cookieconsent-init.js so script-src 'self' covers it */}
          <script src="/static/cookieconsent-init.js" defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
