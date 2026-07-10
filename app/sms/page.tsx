import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const VIOLET = '#9370DB';

export const metadata: Metadata = {
  title: 'Beacons SMS Notifications',
  description:
    'How the Beacons monitoring platform, operated by Christopher Lee Bergstrom (CLB Consulting), uses SMS text notifications: who receives messages, how to opt in, message frequency, rates, and how to reply STOP or HELP.',
  robots: 'index, follow',
  alternates: { canonical: 'https://chrisleebergstrom.com/sms' },
  openGraph: {
    title: 'Beacons SMS Notifications | Chris Lee Bergstrom',
    description:
      'SMS notification terms for the Beacons monitoring platform — opt-in, message frequency, rates, STOP and HELP.',
    type: 'website',
    url: 'https://chrisleebergstrom.com/sms',
  },
};

export const viewport: Viewport = {
  themeColor: '#9370DB',
  width: 'device-width',
  initialScale: 1,
};

export default function SmsPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="relative bg-black text-white"
        aria-label="Beacons SMS Notifications"
      >
        {/* Header */}
        <section className="relative px-6 pt-32 pb-8 md:pt-40 md:pb-12">
          <div className="mx-auto max-w-3xl">
            <p
              className="font-mono text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: VIOLET }}
            >
              Beacons
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white">
              SMS Notifications
            </h1>
          </div>
        </section>

        {/* Body */}
        <section className="relative px-6 pb-20">
          <div
            className="mx-auto max-w-3xl font-body text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.85)' }}
          >
            <p>
              Beacons, operated by Christopher Lee Bergstrom (CLB Consulting), sends automated
              account and system-health notification text messages to the platform&apos;s
              administrators during active monitoring sessions — for example, when a monitoring node
              goes offline or a critical condition is detected.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="font-heading text-lg md:text-xl uppercase tracking-tight text-white mb-1">
                  Who receives messages
                </dt>
                <dd>
                  Only the platform&apos;s named administrators. There is no public sign-up;
                  recipients are added individually after opting in.
                </dd>
              </div>

              <div>
                <dt className="font-heading text-lg md:text-xl uppercase tracking-tight text-white mb-1">
                  How you opt in
                </dt>
                <dd>
                  Administrators opt in verbally, in person; a number is added only after the person
                  agrees.
                </dd>
              </div>

              <div>
                <dt className="font-heading text-lg md:text-xl uppercase tracking-tight text-white mb-1">
                  Message frequency
                </dt>
                <dd>Varies based on system events.</dd>
              </div>

              <div>
                <dt className="font-heading text-lg md:text-xl uppercase tracking-tight text-white mb-1">
                  Cost
                </dt>
                <dd>Message and data rates may apply.</dd>
              </div>

              <div>
                <dt className="font-heading text-lg md:text-xl uppercase tracking-tight text-white mb-1">
                  Opt out / help
                </dt>
                <dd>
                  Reply STOP to unsubscribe at any time, or HELP for help. You can also contact{' '}
                  <a
                    href="mailto:chris@blackeyedproductionsusa.com"
                    className="transition-colors hover:text-white"
                    style={{ color: VIOLET }}
                  >
                    chris@blackeyedproductionsusa.com
                  </a>
                  .
                </dd>
              </div>

              <div>
                <dt className="font-heading text-lg md:text-xl uppercase tracking-tight text-white mb-1">
                  Privacy
                </dt>
                <dd>
                  We will not share your mobile information with third parties for marketing
                  purposes. See our{' '}
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-white"
                    style={{ color: VIOLET }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </dd>
              </div>
            </dl>

            <div className="mt-16 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-colors hover:text-white"
                style={{ color: VIOLET }}
              >
                ← Back to the work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
