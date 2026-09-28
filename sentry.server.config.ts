import * as Sentry from '@sentry/nextjs';
import { sentryBaseOptions } from './sentry.shared';

Sentry.init(sentryBaseOptions);
