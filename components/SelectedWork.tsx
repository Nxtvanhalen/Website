'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const VIOLET = '#9370DB';

type WorkCardProps = {
  code: string;
  title: string;
  kind: string;
  blurb: string;
  stat: string;
  href: string;
  visual: React.ReactNode;
};

function WorkCard({ code, title, kind, blurb, stat, href, visual }: WorkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-sm bg-black/40 backdrop-blur-md transition-all duration-500"
      style={{
        border: '1px solid rgba(147, 112, 219, 0.25)',
      }}
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
        {/* Hover wash — barely-there violet across the visual */}
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
            style={{
              borderColor: VIOLET,
              color: VIOLET,
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: VIOLET, boxShadow: `0 0 6px ${VIOLET}` }}
            />
            Live
          </span>
        </div>

        <h3 className="font-heading text-3xl md:text-4xl uppercase tracking-tight leading-none text-white">
          {title}
        </h3>

        <p
          className="font-body text-base md:text-lg mt-5 leading-relaxed"
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

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative px-6 py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="work-heading"
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Selected Work
        </motion.h2>

        <motion.p
          className="font-body text-base md:text-lg max-w-2xl mt-6 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.7)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Real artifacts, both public. The Underground proves the fusion thesis: twenty years of
          running venues turned into a piece of working software.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <WorkCard
            code="01"
            title="The Underground"
            kind="Venue-management sim"
            href="https://underground-venue-manager.onrender.com"
            stat="Live · Browser game"
            blurb="Run a small underground music venue — book bands, keep the crew right, dodge incidents, balance the books. A PNW dive-bar sim in cyberpunk-noir. Twenty years of running venues, turned into a game."
            visual={
              <Image
                src="/images/COVER.jpg"
                alt="The Underground — cyberpunk-noir illustration of a neon-lit dive bar with crowd queued under rain, branded marquee, and venue facade"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            }
          />

          <WorkCard
            code="02"
            title="Byte"
            kind="AI assistant over email"
            href="https://firstlyte.co"
            stat="Live · firstlyte.co"
            blurb="An AI assistant that lives in your inbox. Email byte@firstlyte.co, get a thoughtful reply in under 30 seconds — no app, no login, no account. Handles attachments, remembers threads, routes to the right model."
            visual={
              <Image
                src="/images/Byte.png"
                alt="Byte — AI assistant over email; brand sheet showing the wordmark, the B logo, and the read / understand / remember / act process flow"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}

