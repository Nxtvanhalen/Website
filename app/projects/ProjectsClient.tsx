'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const VIOLET = '#9370DB';

type LiveCardProps = {
  code: string;
  title: string;
  kind: string;
  blurb: string;
  stat: string;
  href: string;
  visual: React.ReactNode;
};

function LiveCard({ code, title, kind, blurb, stat, href, visual }: LiveCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-sm bg-black/40 backdrop-blur-md transition-all duration-500"
      style={{ border: '1px solid rgba(147, 112, 219, 0.25)' }}
      whileHover={{
        scale: 1.01,
        borderColor: 'rgba(147, 112, 219, 0.9)',
        boxShadow: '0 0 40px rgba(147, 112, 219, 0.35)',
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
        {visual}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(180deg, rgba(147,112,219,0) 60%, rgba(147,112,219,0.15) 100%)',
          }}
        />
      </div>

      <div className="p-6 lg:p-8">
        <div className="mb-4 flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.3em]">
          <span className="text-white/50">
            {code} · {kind}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[9px] font-bold"
            style={{ borderColor: VIOLET, color: VIOLET }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: VIOLET, boxShadow: `0 0 6px ${VIOLET}` }}
            />
            Live
          </span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-tight leading-none text-white">
          {title}
        </h3>

        <p
          className="font-body text-base mt-5 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.82)' }}
        >
          {blurb}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-mono uppercase tracking-[0.25em]">
          <span style={{ color: VIOLET }}>{stat}</span>
          <span
            className="inline-flex items-center gap-2 text-white/70 transition-all duration-300 group-hover:gap-3 group-hover:text-white"
            aria-hidden="true"
          >
            Visit
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

type ArchiveCardProps = {
  code: string;
  title: string;
  kind: string;
  blurb: string;
  href?: string;
  delay?: number;
};

function ArchiveCard({ code, title, kind, blurb, href, delay = 0 }: ArchiveCardProps) {
  const inner = (
    <>
      <div className="mb-3 flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
        <span>
          {code} · {kind}
        </span>
        {href && (
          <span
            aria-hidden="true"
            className="text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
          >
            →
          </span>
        )}
      </div>
      <h3 className="font-heading text-xl md:text-2xl uppercase tracking-tight leading-snug text-white">
        {title}
      </h3>
      <p
        className="font-body text-base mt-3 leading-relaxed"
        style={{ color: 'rgba(245, 245, 220, 0.78)' }}
      >
        {blurb}
      </p>
    </>
  );

  const motionProps = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay },
  } as const;

  const sharedClass =
    'group relative block rounded-sm bg-black/40 backdrop-blur-md p-6 lg:p-7 transition-all duration-500';
  const sharedStyle = { border: '1px solid rgba(147, 112, 219, 0.22)' } as const;
  const hoverStyle = {
    borderColor: 'rgba(147, 112, 219, 0.7)',
    boxShadow: '0 0 28px rgba(147, 112, 219, 0.2)',
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
        style={sharedStyle}
        whileHover={hoverStyle}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={sharedClass}
      style={sharedStyle}
      whileHover={hoverStyle}
      {...motionProps}
    >
      {inner}
    </motion.div>
  );
}

export default function ProjectsClient() {
  return (
    <main
      id="main-content"
      className="relative bg-black text-white"
      aria-label="Projects by Chris Lee Bergstrom"
    >
      {/* Header */}
      <section className="relative px-6 pt-32 pb-12 md:pt-40 md:pb-16 lg:pt-48 lg:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.p
            className="font-mono text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: VIOLET }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.p>
          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            The Full Workshop
          </motion.h1>
          <motion.p
            className="font-body text-base md:text-lg lg:text-xl max-w-3xl mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.85)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The two cards on the homepage are the spine. Everything below is the archive — shipped
            work, internal infrastructure, and ongoing experiments. Each line a different way of
            asking: what does it look like when twenty years of running shows meets an AI build
            team?
          </motion.p>
        </div>
      </section>

      {/* Live spine */}
      <section className="relative px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="font-heading text-2xl md:text-3xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            Live
          </motion.h2>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <LiveCard
              code="01"
              title="The Underground"
              kind="Venue-management sim"
              href="https://underground-venue-manager.onrender.com"
              stat="Live · Browser game"
              blurb="Run a small underground music venue — book bands, keep the crew right, dodge incidents, balance the books. A PNW dive-bar sim in cyberpunk-noir. Twenty years of running venues, turned into a game."
              visual={
                <Image
                  src="/images/COVER.jpg"
                  alt="The Underground — cyberpunk-noir illustration of a neon-lit dive bar"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              }
            />
            <LiveCard
              code="02"
              title="Byte"
              kind="AI assistant over email"
              href="https://firstlyte.co"
              stat="Live · firstlyte.co"
              blurb="An AI assistant that lives in your inbox. Email byte@firstlyte.co, get a thoughtful reply in under 30 seconds — no app, no login, no account. Handles attachments, remembers threads, routes to the right model."
              visual={
                <Image
                  src="/images/ByteEdit.jpeg"
                  alt="Byte — AI assistant over email; brand sheet showing the BYTE wordmark, the B logo, and the prioritize / understand / remember / act process flow"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              }
            />
            <LiveCard
              code="03"
              title="R.Y.D.E.R."
              kind="Mental-health AI for creatives"
              href="https://ryder-k6er.onrender.com"
              stat="Live · ryder-k6er.onrender.com"
              blurb="Trauma-aware AI for the industry. Anonymous, reflective, and emotionally attuned — not therapy, a check-in with soul. Built for the people who keep the show running when nobody else sees them break."
              visual={
                <Image
                  src="/images/projects/Ryder.png"
                  alt="R.Y.D.E.R. — Mental-health AI for creatives"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              }
            />
            <LiveCard
              code="04"
              title="Chester"
              kind="AI chess study"
              href="https://chesterchess.com"
              stat="Live · chesterchess.com"
              blurb="An AI chess game built in public to explore decision-making architecture and game theory. Powered by Deepseek so the consumer version stays free."
              visual={
                <div
                  className="relative h-full w-full"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(147,112,219,0.18) 0%, rgba(0,0,0,1) 70%)',
                  }}
                >
                  <Image
                    src="/images/CHESTER.png"
                    alt="Chester — chibi robot king with chess pieces, AI Chess Coach wordmark"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="relative px-6 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="font-heading text-2xl md:text-3xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            Archive
          </motion.h2>
          <motion.p
            className="font-body text-base max-w-3xl mt-4 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.7)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Shipped tools, internal infrastructure, and experiments that informed the live work.
          </motion.p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <ArchiveCard
              code="05"
              title="Beacons"
              kind="Venue safety / IoT"
              blurb="iPhone-based SPL and acoustic monitoring for live events. Cloud-based logging, real-time analysis, and predictive insight. Protects patrons and staff; keeps neighbors and regulators happy. Cloud-to-edge-to-physical-world."
              delay={0}
            />
            <ArchiveCard
              code="06"
              title="EVA"
              kind="Events virtual assistant"
              blurb="Logistics overhead reducer for crews — routing, scheduling, crew management. Doesn't replace humans, lowers their cognitive load."
              delay={0.05}
            />
            <ArchiveCard
              code="07"
              title="EVE"
              kind="Portfolio concierge"
              blurb="The site's own AI concierge. Knows every page, the work, the road. A working demo of the same agentic stack used to build the rest of the portfolio."
              href="/"
              delay={0.1}
            />
            <ArchiveCard
              code="08"
              title="Glytch"
              kind="Local AI experiment"
              blurb="Local, offline, no guardrails. An ongoing test of what's possible when an LLM runs on your own machine with full freedom."
              delay={0.15}
            />
            <ArchiveCard
              code="09"
              title="JAMES"
              kind="Memory backbone"
              blurb="Core memory and multi-agent orchestration. Long-term context and cross-agent state so the system learns instead of forgetting."
              delay={0.2}
            />
            <ArchiveCard
              code="10"
              title="Multi-Agent Lab"
              kind="Skunkworks"
              blurb="Prototyping federated agents and real-time work flows. Agents talking to agents, with humans in the loop where it matters."
              delay={0.25}
            />
            <ArchiveCard
              code="11"
              title="Sandbox"
              kind="Hospitality AI"
              blurb="Firebase-powered demand prediction for hospitality and venue strategy. Turns sales noise into operational insight."
              delay={0.3}
            />
            <ArchiveCard
              code="12"
              title="TARS"
              kind="Local privacy-first AI"
              blurb="On-device intelligence — your data, your hardware, your control. Pushes the privacy ceiling for sensitive workflows."
              delay={0.35}
            />
            <ArchiveCard
              code="13"
              title="LogiRoute"
              kind="Touring logistics"
              blurb="Complex route optimization for touring schedules. Built in the open as a working logistics agent."
              href="https://logi-route-a9c09ae8.base44.app"
              delay={0.4}
            />
            <ArchiveCard
              code="14"
              title="Guardian"
              kind="Web security"
              blurb="Server-side bot protection and monitoring. The defense layer that keeps the surface clean."
              delay={0.45}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="font-heading text-3xl md:text-4xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            Something here look interesting?
          </motion.h2>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <a
              href="mailto:chrisleebergstrom@gmail.com?subject=Project%20Inquiry"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 font-heading text-sm tracking-[0.15em] uppercase rounded-sm transition-all duration-300"
              style={{
                background: VIOLET,
                color: '#000',
                boxShadow: '0 0 30px rgba(147, 112, 219, 0.4)',
              }}
            >
              Send a message
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 font-heading text-sm tracking-[0.15em] uppercase rounded-sm border transition-all duration-300 hover:bg-white/5"
              style={{
                borderColor: 'rgba(147, 112, 219, 0.5)',
                color: VIOLET,
              }}
            >
              ← Back to the work
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
