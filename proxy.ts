import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 0. THE WHITELIST: Known Good Bots & AI Crawlers
// These bypass ALL security checks - let them in immediately
const ALLOWED_USER_AGENTS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'Claude-Web',
  'ChatGPT-User',
  'anthropic-ai',
  'PerplexityBot',
  'CCBot',
  'Google-Extended',
  'Applebot',
  'DuckDuckBot',
  'Slackbot',
  'facebookexternalhit',
  'LinkedInBot',
  'TwitterBot',
  'Twitterbot',
  'Bard',
  'YouBot',
  'Cohere-ai',
  'SemrushBot',
  'AhrefsBot',
  'Baiduspider',
  'YandexBot',
];

// 1. THE BLACKLIST: Known Bad IPs
const BLOCKED_IPS = [
  '45.148.10.205',
  '99.79.71.152',
  '43.131.26.226',
  '43.156.156.96',
  '170.106.35.187',
  '135.181.4.161',
  '193.233.203.251',
  '208.84.101.102',
  '106.196.84.153',
  '49.51.38.193',
  '43.156.232.190',
  '49.51.47.100',
  '43.135.183.82',
  '170.106.193.108',
  '150.109.46.88',
  '43.165.65.180',
  '73.240.0.112',
  '43.130.67.33',
  '24.20.186.46',
  '43.159.145.153',
  '136.144.43.216',
  '185.39.19.47',
  '202.178.119.130',
  '43.159.143.187',
  '43.159.139.164',
  '68.218.100.201',
  '197.156.242.209',
  '104.23.160.84',
];

// 2. THE BAD AGENTS
const BLOCKED_USER_AGENTS = [
  'VertexWP',
  'Go-http-client',
  'Python/3.10',
  'aiohttp',
  'httpx',
  'python-httpx',
  'curl',
  'wget',
  'CCleaner',
];

// 3. BAD PATHS
const BLOCKED_PATHS = [
  '/wp-admin',
  '/wp-login.php',
  '/wp-includes',
  '/wp-content',
  '/xmlrpc.php',
  '/wlwmanifest.xml',
  '/.env',
  '/.git',
  '/phpinfo',
];

// 4. KNOWN CLOUD SUBNETS
const DATA_CENTER_RANGES = [
  '43.131.',
  '43.156.',
  '170.106.',
  '45.148.',
  '99.79.',
  '110.166.',
  '49.51.',
  '43.135.',
  '150.109.',
  '43.165.',
  '43.130.',
  '43.159.',
];

function buildCspHeader(nonce: string, isHttps: boolean): string {
  const isDev = process.env.NODE_ENV === 'development';
  const directives = [
    `default-src 'self'`,
    // 'strict-dynamic' lets framework scripts loaded via the nonced bootstrap also execute.
    // The host allowlist (googletagmanager, google-analytics) is kept as a fallback for browsers
    // that don't support 'strict-dynamic'. 'unsafe-eval' stays in dev only (React Refresh).
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
    // style-src split into -elem and -attr. Modern browsers honor the split; the parent
    // style-src is only a fallback for browsers that don't recognize the granular directives.
    // -elem strict prevents <style> tag injection in production (the real XSS vector); in dev
    // we relax to 'unsafe-inline' because Turbopack injects HMR styles inline without nonces.
    // -attr keeps 'unsafe-inline' so React's inline `style={{}}` props continue to work
    // without per-element nonces.
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `style-src-elem 'self'${isDev ? " 'unsafe-inline'" : ''} https://fonts.googleapis.com`,
    `style-src-attr 'unsafe-inline'`,
    `img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com`,
    `media-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
  ];
  // upgrade-insecure-requests forces the browser to rewrite every http:// subresource
  // URL to https://. Critical in production but breaks local HTTP development — Safari
  // is strictest about this. Only emit when the request itself was over HTTPS (Render
  // terminates TLS upstream and sets x-forwarded-proto: https).
  if (isHttps) {
    directives.push('upgrade-insecure-requests');
  }
  return directives.join('; ');
}

export function proxy(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.nextUrl.pathname;

  // --- CHECK 0: WHITELIST - Known Good Bots (Bypass all security) ---
  if (ALLOWED_USER_AGENTS.some((allowedUA) => userAgent.includes(allowedUA))) {
    console.log(`[ALLOWED] Good bot detected: ${userAgent.substring(0, 50)} from ${ip}`);
    return NextResponse.next();
  }

  // --- CHECK 1: Explicit IP Blocks ---
  if (BLOCKED_IPS.includes(ip)) {
    return new NextResponse(JSON.stringify({ error: 'Access Denied' }), { status: 403 });
  }

  // --- CHECK 2: Bad User Agents ---
  if (BLOCKED_USER_AGENTS.some((ua) => userAgent.includes(ua))) {
    return new NextResponse(JSON.stringify({ error: 'Bot Detected' }), { status: 403 });
  }

  // --- CHECK 3: Bad Paths ---
  if (BLOCKED_PATHS.some((path) => url.startsWith(path) || url.includes(path))) {
    console.log(`[BLOCKED] Bad Path Requested: ${url} from ${ip}`);
    return new NextResponse(JSON.stringify({ error: 'Invalid Request' }), { status: 403 });
  }

  // --- CHECK 4: Fake Mobile Detector ---
  const isClaimingToBeMobile = userAgent.includes('iPhone') || userAgent.includes('Android');
  const isFromDataCenter = DATA_CENTER_RANGES.some((range) => ip.startsWith(range));

  if (isClaimingToBeMobile && isFromDataCenter) {
    return new NextResponse(JSON.stringify({ error: 'VPN/Proxy Detected' }), { status: 403 });
  }

  // --- NONCE + CSP ---
  // Generate a per-request nonce, thread it through request headers so server components
  // can read it via `headers()` from 'next/headers', and set the CSP response header.
  // Set CSP_REPORT_ONLY=true in the environment to ship the policy in report-only mode
  // (header name flips, browser logs violations but doesn't block).
  const nonce = btoa(crypto.randomUUID());
  const isHttps =
    request.headers.get('x-forwarded-proto') === 'https' ||
    request.nextUrl.protocol === 'https:';
  const csp = buildCspHeader(nonce, isHttps);
  const cspHeaderName =
    process.env.CSP_REPORT_ONLY === 'true'
      ? 'Content-Security-Policy-Report-Only'
      : 'Content-Security-Policy';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(cspHeaderName, csp);
  return response;
}

export const config = {
  // Skip static assets and metadata files (CSP irrelevant; saves nonce generation).
  // The `missing` clause skips prefetch-only requests so we don't waste nonces on
  // RSC payload prefetches that don't render HTML.
  matcher: [
    {
      source:
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|site.webmanifest|sw.js|manifest.json|static).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
