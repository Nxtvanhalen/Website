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
            // script-src 'unsafe-inline' is retained for Next.js's <script id="__NEXT_DATA__">
            // hydration blob, which is inline by necessity on statically pre-rendered pages
            // (per-page, per-build content — can't be hashed or nonced without App Router).
            // All scripts WE author are loaded from 'self' or whitelisted origins.
            //
            // style-src split: style-src-elem is strict ('self' + Google Fonts only),
            // style-src-attr keeps 'unsafe-inline' for React's runtime style={{}} props
            // which are required for parallax transforms and other dynamic values.
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src-elem 'self' https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig