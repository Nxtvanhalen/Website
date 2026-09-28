import * as Sentry from '@sentry/nextjs';

export async function register() {
  // Next 16's proxy runs on the Node.js runtime, so there is no edge config.
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
