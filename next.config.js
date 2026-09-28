const { withSentryConfig } = require('@sentry/nextjs/config');

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
  async redirects() {
    return [
      {
        source: '/operations-consulting',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      // /_next/static/css/* Cache-Control: redundant — Next 16 already serves these
      // immutable with year-long caching because the build IDs make filenames content-addressed.
      // The previous override here triggered the "Custom Cache-Control headers detected" warning.
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
          }
          // Content-Security-Policy moved to proxy.ts (per-request nonce generation).
        ]
      }
    ]
  }
}

module.exports = withSentryConfig(nextConfig, {
  org: 'clb-consulting',
  project: 'clb-website',
  // Source maps upload only when SENTRY_AUTH_TOKEN is set (Render env); CI and
  // local builds skip the upload and still succeed.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Route browser events through /monitoring on our own origin: survives ad
  // blockers and keeps the CSP connect-src at 'self'.
  tunnelRoute: '/monitoring',
  telemetry: false,
})
