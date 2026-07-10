'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const VIOLET = '#9370DB';

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-heading text-2xl md:text-3xl uppercase tracking-tight mb-4 mt-12"
      style={{ color: VIOLET }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-lg md:text-xl uppercase tracking-tight text-white mb-2 mt-6">
      {children}
    </h3>
  );
}

export default function PrivacyClient() {
  return (
    <main
      id="main-content"
      className="relative bg-black text-white"
      aria-label="Privacy Policy"
    >
      {/* Header */}
      <section className="relative px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <motion.p
            className="font-mono text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: VIOLET }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Legal
          </motion.p>
          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            className="font-mono text-[10px] tracking-[0.3em] uppercase mt-6 text-white/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Last updated ·{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </motion.p>
        </div>
      </section>

      {/* Body */}
      <section className="relative px-6 pb-16">
        <div
          className="mx-auto max-w-3xl font-body text-base md:text-lg leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.82)' }}
        >
          <p>
            At CLB Consulting ("we," "our," or "us"), we respect your privacy and are committed to
            protecting your personal data. This privacy policy explains how we collect, use, and
            safeguard your information when you visit our website chrisleebergstrom.com.
          </p>
          <p className="mt-4">
            This policy covers chrisleebergstrom.com and the Beacons monitoring platform, operated
            by Christopher Lee Bergstrom (CLB Consulting). We will not share your mobile information
            with third parties for marketing purposes.
          </p>

          <H2>Information We Collect</H2>
          <H3>Information You Provide</H3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact information when you reach out via email</li>
            <li>Any information you provide through our AI chat assistant (EVE)</li>
            <li>Professional information shared during consultations</li>
          </ul>

          <H3>Information Collected Automatically</H3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>IP address (anonymized)</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
          </ul>

          <H2>Cookies and Tracking</H2>
          <p>
            We use cookies and similar tracking technologies to improve your experience on our
            site. These include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="text-white">Essential cookies</strong> — required for the website
              to function properly.
            </li>
            <li>
              <strong className="text-white">Analytics cookies</strong> — help us understand how
              visitors use the site (Google Analytics).
            </li>
            <li>
              <strong className="text-white">Preference cookies</strong> — remember your settings
              and preferences.
            </li>
          </ul>
          <p className="mt-4">
            You can control cookie preferences through our cookie-consent banner when you first
            visit the site.
          </p>

          <H2>How We Use Your Information</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and improve our services</li>
            <li>To respond to your inquiries and communications</li>
            <li>To analyze website usage and improve user experience</li>
            <li>To send relevant updates about our services (with your consent)</li>
            <li>To comply with legal obligations</li>
          </ul>

          <H2>Data Sharing and Third Parties</H2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may
            share your information only:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              With service providers who assist in operating our website (under strict
              confidentiality agreements)
            </li>
            <li>When required by law or to protect our rights</li>
            <li>With your explicit consent</li>
          </ul>

          <H2>Data Security</H2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <H2>Your Rights</H2>
          <p>Under GDPR and other privacy laws, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <H2>AI Assistant (EVE)</H2>
          <p>
            Our AI assistant EVE processes conversations in real time to provide helpful
            responses. Conversations may be logged for quality improvement but are not linked to
            personal identifiers unless you explicitly provide such information.
          </p>

          <H2>Mobile / SMS Messaging</H2>
          <p>
            The Beacons monitoring platform, operated by Christopher Lee Bergstrom (CLB Consulting),
            sends automated account and system-health notification text messages (SMS) to the
            platform's named administrators during active monitoring sessions. Recipients opt in
            individually, in person; there is no public sign-up. Message frequency varies based on
            system events, and message and data rates may apply. You can reply STOP to unsubscribe
            at any time or HELP for help.
          </p>
          <p className="mt-4">
            <strong className="text-white">
              We will not share your mobile information with third parties for marketing purposes.
            </strong>{' '}
            Full SMS notification terms are available on our{' '}
            <Link
              href="/sms"
              className="transition-colors hover:text-white"
              style={{ color: VIOLET }}
            >
              SMS Notifications
            </Link>{' '}
            page.
          </p>

          <H2>Children's Privacy</H2>
          <p>
            Our services are not directed to individuals under 16. We do not knowingly collect
            personal information from children under 16.
          </p>

          <H2>Changes to This Policy</H2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <H2>Contact</H2>
          <p>
            If you have questions about this privacy policy or your personal data, please contact
            us:
          </p>
          <div
            className="mt-6 rounded-sm bg-black/40 backdrop-blur-md p-6"
            style={{ border: '1px solid rgba(147, 112, 219, 0.3)' }}
          >
            <p className="font-heading uppercase tracking-tight text-white">CLB Consulting</p>
            <p className="mt-3">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/55">
                Email ·{' '}
              </span>
              <a
                href="mailto:chrisleebergstrom@gmail.com"
                className="transition-colors hover:text-white"
                style={{ color: VIOLET }}
              >
                chrisleebergstrom@gmail.com
              </a>
            </p>
            <p className="mt-1">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/55">
                Site ·{' '}
              </span>
              <a
                href="https://chrisleebergstrom.com"
                className="transition-colors hover:text-white"
                style={{ color: VIOLET }}
              >
                chrisleebergstrom.com
              </a>
            </p>
          </div>

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
  );
}
