'use client';

import { motion } from 'motion/react';

const VIOLET = '#9370DB';

type HistoryRowProps = {
  code: string;
  label: string;
  detail: string;
  delay?: number;
};

function HistoryRow({ code, label, detail, delay = 0 }: HistoryRowProps) {
  return (
    <motion.div
      className="grid grid-cols-12 gap-4 py-6 border-b border-white/10"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay }}
    >
      <p
        className="col-span-2 md:col-span-1 font-mono text-xs tracking-[0.3em] uppercase pt-1"
        style={{ color: VIOLET }}
      >
        {code}
      </p>
      <p className="col-span-10 md:col-span-3 font-heading text-base md:text-lg uppercase tracking-tight text-white">
        {label}
      </p>
      <p
        className="col-span-12 md:col-span-8 font-body text-base leading-relaxed"
        style={{ color: 'rgba(245, 245, 220, 0.78)' }}
      >
        {detail}
      </p>
    </motion.div>
  );
}

export default function History() {
  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className="relative bg-black px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: VIOLET }}
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          ADVANCE / 04 — HISTORY
        </motion.p>

        <motion.h2
          id="history-heading"
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          History
        </motion.h2>

        <motion.p
          className="font-body text-lg md:text-xl max-w-3xl mt-8 leading-relaxed text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The road came first. Front of house, tour management, technical direction — the credits
          are the reason the software is any good.
        </motion.p>

        <div className="mt-12 border-t border-white/10">
          <HistoryRow
            code="FOH"
            label="Front of House"
            detail="The Dandy Warhols. Black Rebel Motorcycle Club. Macklemore. Arenas, festivals, and civic halls — mixing for the artists who taught the room how to listen."
            delay={0}
          />
          <HistoryRow
            code="TM"
            label="Tour Management"
            detail="International touring. Routing, advancing, settling. The work that decides whether the show even reaches the stage."
            delay={0.05}
          />
          <HistoryRow
            code="TD"
            label="Technical Direction"
            detail="Venue operations and production direction. Two decades of front-of-house and studio work — some of it credited, some of it not."
            delay={0.1}
          />
          <HistoryRow
            code="20Y+"
            label="Span"
            detail="Twenty-plus years building live shows. Now building the software that runs them."
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
