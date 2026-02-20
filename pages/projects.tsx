import { motion } from 'motion/react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import SectionTracker from '../components/SectionTracker';

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - CLB Consulting | AI & Entertainment Tech</title>
        <meta
          name="description"
          content="Explore CLB Consulting's projects in AI, entertainment technology, and system architecture. Featuring Master Tour, EVA, Ryder, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Projects | CLB Consulting" />
        <meta
          property="og:description"
          content="Explore CLB Consulting's projects in AI, entertainment technology, and system architecture. Featuring Master Tour, EVA, Ryder, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/projects" />
        <meta
          property="og:image"
          content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@chrisleebergstrom" />
        <meta name="twitter:creator" content="@chrisleebergstrom" />
        <meta name="twitter:title" content="Projects | CLB Consulting" />
        <meta
          name="twitter:description"
          content="Explore CLB Consulting's projects in AI, entertainment technology, and system architecture. Featuring Master Tour, EVA, Ryder, and more."
        />
        <meta
          name="twitter:image"
          content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg"
        />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant" />

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/images/Favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/Favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/Favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Favicon/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/Favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/images/Favicon/android-chrome-512x512.png"
        />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/projects" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Projects - CLB Consulting',
              description: 'Showcase of AI and entertainment technology projects by CLB Consulting',
              url: 'https://chrisleebergstrom.com/projects',
              author: {
                '@type': 'Person',
                '@id': 'https://chrisleebergstrom.com/about#person',
                name: 'Chris Lee Bergstrom',
              },
              about: {
                '@type': 'Organization',
                '@id': 'https://chrisleebergstrom.com/#organization',
                name: 'CLB Consulting',
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://chrisleebergstrom.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Projects',
                    item: 'https://chrisleebergstrom.com/projects',
                  },
                ],
              },
              hasPart: [
                {
                  '@type': 'SoftwareApplication',
                  name: 'Master Tour Venue',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web Browser, iOS, Android',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  description: 'The next evolution of tech pack data for venues and artists',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'AI Powered Remote SPL',
                  applicationCategory: 'UtilityApplication',
                  operatingSystem: 'Web Browser',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  description: 'Cloud-based SPL monitoring for events and construction',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'EVA — Events Virtual Assistant',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web Browser',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  description: 'Logistics, routing, and crew management AI',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'R.Y.D.E.R.',
                  applicationCategory: 'HealthApplication',
                  operatingSystem: 'Web Browser',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  description: 'Mental Health AI for Creatives',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'EVE',
                  applicationCategory: 'Bot',
                  operatingSystem: 'Web Browser',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  description:
                    'Conversational AI for CLB Consulting - knows every page, service, and project',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'Glytch',
                  applicationCategory: 'Bot',
                  operatingSystem: 'Local/Offline',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  description: 'Local AI experiment - offline, unhinged, testing the limits',
                },
              ],
            }),
          }}
        />
      </Head>

      <Header />

      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <video
          autoPlay
          loop
          muted
          playsInline
          ref={(el) => {
            if (el) el.playbackRate = 0.5;
          }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: 0,
            width: '100%',
            height: '120vh',
            objectFit: 'cover',
            filter: 'brightness(0.3) saturate(1.0)',
            opacity: 0.6,
            transform: 'scale(1.1)',
          }}
        >
          <source src="/videos/theater-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <main className="min-h-screen bg-transparent text-white pt-24 md:pt-52 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-heading mb-4 glow-subtle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Current Projects
            </motion.h1>
            <motion.p
              className="text-xl font-bold"
              style={{ color: '#F5F5DC' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              CLB Consulting
            </motion.p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {/* Project 1 */}
            <SectionTracker
              name="Projects - Master Tour"
              butlerMessage="Master Tour Venue is revolutionizing how touring teams and venues share production data. No more spreadsheet chaos."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-[#FF0000]/50 p-8 hover:border-[#FF0000] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.1)] hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2
                      className="text-2xl font-heading mb-2"
                      style={{ color: '#FF0000', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}
                    >
                      Master Tour Venue
                    </h2>
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color: '#FF0000', opacity: 0.9 }}
                    >
                      Industry-leading event production data standards revolutionizing venue
                      collaboration.
                    </p>
                    <p
                      className="text-sm leading-relaxed opacity-80 mb-2"
                      style={{ color: '#F5F5DC' }}
                    >
                      <strong>The Problem:</strong> Outdated workflows, endless emails, spreadsheet
                      chaos causing costly event mistakes.
                    </p>
                    <p
                      className="text-sm leading-relaxed opacity-90 mb-3"
                      style={{ color: '#F5F5DC' }}
                    >
                      <strong>The Solution:</strong> Shared source-of-truth production data
                      connecting touring teams with venues seamlessly.
                    </p>
                    <a
                      href="https://www.eventric.com/master-tour-venue/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:text-white transition-colors duration-200 text-sm"
                      style={{ color: '#FF0000' }}
                    >
                      Visit Master Tour Venue →
                    </a>
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src="/videos/mt-thumb.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </motion.div>
            </SectionTracker>

            {/* Project 2 */}
            <SectionTracker
              name="Projects - Remote SPL"
              butlerMessage="SPL exposure affects staff and patrons alike. Effective monitoring, logging, and analysis keeps everyone safe and compliant."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-1" style={{ color: '#F5F5DC' }}>
                      AI Powered Remote SPL
                    </h2>
                    <div
                      className="text-sm font-normal mb-3"
                      style={{ color: '#F5F5DC', opacity: 0.6 }}
                    >
                      (Sound Pressure Level)
                    </div>
                    <p
                      className="text-sm leading-relaxed opacity-80 mb-2"
                      style={{ color: '#F5F5DC' }}
                    >
                      Controlling SPL exposure for both patrons and staff isn't optional—it's
                      essential for safety and compliance.
                    </p>
                    <p className="text-sm leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                      Cloud-based monitoring with effective logging, real-time analysis, and
                      predictive insights. Protect your people, meet regulations, keep the neighbors
                      happy.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src="/videos/spl-thumb.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </motion.div>
            </SectionTracker>

            {/* Project 3 */}
            <SectionTracker
              name="Projects - EVA"
              butlerMessage="EVA doesn't replace your crew—she reduces their cognitive load. Humans run the show, AI handles the overhead."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#F5F5DC' }}>
                      EVA — Events Virtual Assistant
                    </h2>
                    <p
                      className="text-sm leading-relaxed opacity-80 mb-2"
                      style={{ color: '#F5F5DC' }}
                    >
                      EVA doesn't replace crew—she reduces cognitive stress. Let humans focus on the
                      show while AI handles the logistics overhead.
                    </p>
                    <p className="text-sm leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                      The orchestration core for routing, scheduling, and crew management.
                      Customizable, scalable, show-ready.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src="/videos/eva-thumb.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </motion.div>
            </SectionTracker>

            {/* Project 4 */}
            <SectionTracker
              name="Projects - Ryder"
              butlerMessage="Ryder is special. A safe space for creatives to check in. Want to try a session?"
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-[#00ff00]/50 p-8 hover:border-[#00ff00] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,0,0.1)] hover:shadow-[0_0_25px_rgba(0,255,0,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2
                      className="text-2xl font-heading mb-3"
                      style={{ color: '#00ff00', textShadow: '0 0 10px rgba(0,255,0,0.5)' }}
                    >
                      R.Y.D.E.R. — Mental Health AI for Creatives
                    </h2>
                    <p
                      className="text-base leading-relaxed opacity-90 mb-3"
                      style={{ color: '#F5F5DC' }}
                    >
                      Trauma-aware AI for the industry. Anonymous, reflective, and emotionally
                      attuned. Not therapy—a check-in with soul.
                    </p>
                    <a
                      href="https://ryder-k6er.onrender.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:text-white transition-colors duration-200 text-sm"
                      style={{ color: '#00ff00' }}
                    >
                      Chat with Ryder now! →
                    </a>
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                    <Image
                      src="/images/projects/Ryder.png"
                      alt="R.Y.D.E.R. - Mental Health AI for Creatives"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top"
                      quality={75}
                    />
                  </div>
                </div>
              </motion.div>
            </SectionTracker>

            {/* Project 5 */}
            <SectionTracker
              name="Projects - EVE"
              butlerMessage="That's me! I know this entire website inside and out. Ask me anything—I'm here to help."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#F5F5DC' }}>
                      EVE — Conversational AI for CLB
                    </h2>
                    <p
                      className="text-sm leading-relaxed opacity-80 mb-2"
                      style={{ color: '#F5F5DC' }}
                    >
                      EVE runs this website. She knows every page, every service, every project—and
                      she's ready to help you navigate it all.
                    </p>
                    <p
                      className="text-sm leading-relaxed opacity-90 mb-3"
                      style={{ color: '#F5F5DC' }}
                    >
                      Your front-of-house concierge with full backstage access. Ask her anything
                      about operations consulting, AI training, security, leadership coaching—or
                      maybe even some tales from the road.
                    </p>
                    <a
                      href="/#eve-chat"
                      className="text-molten font-bold hover:text-white transition-colors duration-200 text-sm"
                    >
                      Chat with EVE now! →
                    </a>
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                    <video
                      src="/videos/eve-avatar.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </SectionTracker>

            {/* Project 6 */}
            <SectionTracker
              name="Projects - Glytch"
              butlerMessage="Glytch is the wild one. Local, offline, no guardrails. We're testing the limits."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#F5F5DC' }}>
                      Glytch — Local AI Experiment
                    </h2>
                    <p className="text-sm leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                      Glytch is the experiment. Local AI, fully offline, unhinged and sarcastic—an
                      ongoing test to see what can be achieved when you take the guardrails off.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                    <video
                      src="/videos/robot-animation-compressed.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </SectionTracker>

            {/* Project 7 */}
            <SectionTracker
              name="Projects - Multi-Agent Lab"
              butlerMessage="This is where we experiment. Agents talking to agents. It gets wild."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-heading" style={{ color: '#F5F5DC' }}>
                    Multi-Agent Intelligence Lab
                  </h2>
                </div>
                <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                  The CLB skunkworks. Prototyping federated agents and real-time consulting flows.
                  Future interface, real execution.
                </p>
              </motion.div>
            </SectionTracker>

            {/* Project 9 */}
            <SectionTracker
              name="Projects - JAMES"
              butlerMessage="JAMES is the memory. The backbone. He remembers everything so we don't have to."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-heading" style={{ color: '#F5F5DC' }}>
                    JAMES — Core Memory & Strategic AI Backbone
                  </h2>
                </div>
                <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                  The cognitive backbone. Long-term memory and multi-agent orchestration. Ensuring
                  CLB isn't just smart—it's alive.
                </p>
              </motion.div>
            </SectionTracker>

            {/* Project 10 */}
            <SectionTracker
              name="Projects - Sandbox"
              butlerMessage="Testing ground for hospitality AI. Real data, real insights."
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-heading" style={{ color: '#F5F5DC' }}>
                    AI Consulting Sandbox
                  </h2>
                </div>
                <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                  Firebase-powered hospitality strategy. Analyzing sales data to predict demand and
                  turn noise into insight.
                </p>
              </motion.div>
            </SectionTracker>
          </div>

          <div className="text-center py-12 mt-16">
            <p className="text-lg opacity-70 italic" style={{ color: '#F5F5DC' }}>
              Strategy Born from the Wreckage, Intelligence Forged in the Fire
            </p>
          </div>

          {/* Contact Section */}
          <section className="py-12 px-6 text-center">
            <div className="max-w-lg mx-auto space-y-6">
              <div className="space-y-4">
                <a
                  href="mailto:chrisleebergstrom@gmail.com?subject=AI Project Inquiry - Let's Build Something Amazing"
                  className="group block relative overflow-hidden py-4 px-8 bg-transparent text-white font-bold rounded-lg border border-molten hover:border-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <div className="relative flex flex-col items-center justify-center text-center">
                    <div className="text-lg font-bold" style={{ color: '#F5F5DC' }}>
                      Ready to go?
                    </div>
                    <div className="text-sm opacity-80" style={{ color: '#F5F5DC' }}>
                      chrisleebergstrom@gmail.com
                    </div>
                  </div>
                </a>
                <p className="text-sm" style={{ color: '#F5F5DC', opacity: 0.7 }}>
                  Let's discuss your project needs
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
