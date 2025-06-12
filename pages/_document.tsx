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
      {/* Google tag (gtag.js) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap"
      />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XZ6CF9XQD7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XZ6CF9XQD7');
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