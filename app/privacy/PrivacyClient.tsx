'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function PrivacyClient() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center glow-subtle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <p className="text-xl text-gray-300 mb-8">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <p>
              At CLB Consulting ("we," "our," or "us"), we respect your privacy and are committed
              to protecting your personal data. This privacy policy explains how we collect, use,
              and safeguard your information when you visit our website chrisleebergstrom.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-2">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information when you reach out via email</li>
              <li>Any information you provide through our AI chat assistant (EVE)</li>
              <li>Professional information shared during consultations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              Information Collected Automatically
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address (anonymized)</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to improve your experience on our
              site. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
                (Google Analytics)
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and preferences
              </li>
            </ul>
            <p className="mt-4">
              You can control cookie preferences through our cookie consent banner when you first
              visit our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our consulting services</li>
              <li>To respond to your inquiries and communications</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To send relevant updates about our services (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">
              Data Sharing and Third Parties
            </h2>
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
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">Your Rights</h2>
            <p>Under GDPR and other privacy laws, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">AI Assistant (EVE)</h2>
            <p>
              Our AI assistant EVE processes conversations in real-time to provide helpful
              responses. Conversations may be logged for quality improvement but are not linked to
              personal identifiers unless you explicitly provide such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 16. We do not knowingly collect
              personal information from children under 16.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#9370DB]">Contact Us</h2>
            <p>
              If you have questions about this privacy policy or your personal data, please
              contact us at:
            </p>
            <div className="mt-4 p-6 border-2 border-[#9370DB] rounded-lg">
              <p className="font-semibold">CLB Consulting</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:chrisleebergstrom@gmail.com"
                  className="text-[#9370DB] hover:underline"
                >
                  chrisleebergstrom@gmail.com
                </a>
              </p>
              <p>
                Website:{' '}
                <a
                  href="https://chrisleebergstrom.com"
                  className="text-[#9370DB] hover:underline"
                >
                  chrisleebergstrom.com
                </a>
              </p>
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link href="/" className="text-[#9370DB] hover:underline">
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
