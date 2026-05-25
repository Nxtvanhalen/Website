/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: false,
  compress: true, // Enable gzip compression
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: "/_next/static/css/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()"
          },
          {
            // 'unsafe-inline' is retained in both script-src and style-src because:
            // - script-src: Next.js injects <script id="__NEXT_DATA__"> inline on every
            //   statically pre-rendered page (per-page, per-build content — can't be hashed
            //   or nonced without App Router migration). JSON-LD blocks are also inline.
            // - style-src: the cookieconsent library dynamically creates <style> elements at
            //   runtime to inject its theme CSS, and Next.js also emits inline FOUC styles
            //   in production builds. Neither can be hashed (dynamic) or nonced (static).
            // All scripts WE author are loaded from 'self' or whitelisted origins; cookie
            // consent bootstrap is in public/static/cookieconsent-init.js; critical CSS is
            // in styles/global.css. Removing 'unsafe-inline' from either directive requires
            // App Router migration.
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig