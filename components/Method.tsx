'use client';

import { motion } from 'motion/react';

const VIOLET = '#9370DB';

type MethodCardProps = {
  code: string;
  title: string;
  body: string;
  delay?: number;
};

function MethodCard({ code, title, body, delay = 0 }: MethodCardProps) {
  return (
    <motion.article
      className="relative rounded-sm bg-black/40 backdrop-blur-md p-7 lg:p-9 transition-all duration-500 hover:bg-black/60"
      style={{ border: '1px solid rgba(147, 112, 219, 0.22)' }}
      whileHover={{
        borderColor: 'rgba(147, 112, 219, 0.7)',
        boxShadow: '0 0 32px rgba(147, 112, 219, 0.25)',
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      <p
        className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
        style={{ color: VIOLET }}
      >
        {code}
      </p>
      <h3 className="font-heading text-xl md:text-2xl uppercase tracking-tight leading-snug text-white">
        {title}
      </h3>
      <p
        className="font-body text-base mt-5 leading-relaxed"
        style={{ color: 'rgba(245, 245, 220, 0.8)' }}
      >
        {body}
      </p>
    </motion.article>
  );
}

export default function Method() {
  return (
    <section
      id="method"
      aria-labelledby="method-heading"
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
          ADVANCE / 03 — METHOD
        </motion.p>

        <motion.h2
          id="method-heading"
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Method
        </motion.h2>

        <motion.p
          className="font-body text-base md:text-lg max-w-2xl mt-6 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.72)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Agents are the team. Context is the bottleneck. Quality ceiling first.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          <MethodCard
            code="01"
            title="Agents are the team"
            body="Chris is the product owner and architect; agents type. Three to four parallel branches at a time. Git is the single source of truth — no shared state outside the repo, no work that can't survive a rebase."
            delay={0}
          />
          <MethodCard
            code="02"
            title="Context is the bottleneck"
            body="There's no ceiling on model quality given enough context. The work isn't prompting — it's context engineering: what the agent sees, what it doesn't, and when."
            delay={0.1}
          />
          <MethodCard
            code="03"
            title="Quality ceiling first"
            body="Strongest model first, then autonomy, then context depth, then speed. Speed is the output, not the goal. Cheap fast bad work is still bad work."
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
