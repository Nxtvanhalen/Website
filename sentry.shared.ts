// Options shared by instrumentation-client.ts and sentry.server.config.ts.
//
// Sentry v11 collects request bodies, cookies and user info by default when
// `dataCollection` is unset. The EVE chat route receives visitor messages in
// its request body, so pin the restrictive (v10 `sendDefaultPii: false`)
// baseline explicitly: stack traces and URLs, no bodies, no IPs, no cookies.
const PII_HEADER_DENY = ['forwarded', '-ip', 'remote-', 'via', '-user'];

export const sentryBaseOptions = {
  dsn: 'https://5328d639c44be756c5ab5977f88a0b2f@o4510973470769152.ingest.us.sentry.io/4512165408276480',
  // Only report from real production builds; local `next dev` stays quiet.
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV || 'production',
  // Light tracing for a low-traffic portfolio. No Session Replay.
  tracesSampleRate: 0.1,
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: { request: { deny: PII_HEADER_DENY }, response: { deny: PII_HEADER_DENY } },
    httpBodies: [],
    urlQueryParams: { deny: PII_HEADER_DENY },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    queues: false,
    graphQL: { document: false, variables: false },
  },
} satisfies Parameters<typeof import('@sentry/nextjs').init>[0];
