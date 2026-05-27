'use client';

import { motion } from 'motion/react';

const VIOLET = '#9370DB';

type PhaseProps = {
  code: string;
  label: string;
  center: string;
  detail: string;
  delay?: number;
};

function Phase({ code, label, center, detail, delay = 0 }: PhaseProps) {
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
      <div className="col-span-10 md:col-span-3">
        <p className="font-heading text-base md:text-lg uppercase tracking-tight text-white">
          {label}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">
          {center}
        </p>
      </div>
      <p
        className="col-span-12 md:col-span-8 font-body text-base leading-relaxed"
        style={{ color: 'rgba(245, 245, 220, 0.78)' }}
      >
        {detail}
      </p>
    </motion.div>
  );
}

export default function Method() {
  return (
    <section
      id="method"
      aria-labelledby="method-heading"
      className="relative px-6 py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
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
          className="font-body text-base md:text-lg max-w-3xl mt-6 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.78)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Five phases, one orchestrator. Agents type, Chris decides. The last phase loops back into
          the first — the system learns continuously.
        </motion.p>

        <div className="mt-12 border-t border-white/10">
          <Phase
            code="01"
            label="Ideate"
            center="Chris orchestrates"
            detail="Brain dump, Socratic dialogue, multi-model research (Gemini for breadth, Grok for speed, Claude for depth), decision gate. Open questions get explored by multiple models; Chris evaluates and chooses the approach."
            delay={0}
          />
          <Phase
            code="02"
            label="Build"
            center="Claude Code as primary agent"
            detail="Full context loaded — CLAUDE.md, design docs, memories. Three to four parallel branches at once. The agent writes code, runs the dev loop, commits, catches Biome/CI errors and auto-fixes without human intervention."
            delay={0.05}
          />
          <Phase
            code="03"
            label="Verify"
            center="Adversarial gauntlet"
            detail="Biome and the test suite as the quality floor. Codex reviews the same repo with instructions to be brutal — signs every report. Critique gets fed back to Claude: 'what do you think of this?' A third model breaks the echo chamber when needed."
            delay={0.1}
          />
          <Phase
            code="04"
            label="Deploy"
            center="Chris approves the diff"
            detail="Human eyes on the delta before merge. The agent triggers Render deploys via MCP — services, cron jobs, workers. Sentry monitors live; runtime errors loop back to the build agent for patches."
            delay={0.15}
          />
          <Phase
            code="05"
            label="Maintain"
            center="Living docs, self-maintaining"
            detail="Agents update their own CLAUDE.md. Periodic drift checks against architecture specs. Every failure becomes a better instruction. Memory plus git plus persistent context equals seamless continuity across machines and sessions."
            delay={0.2}
          />
        </div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span style={{ color: VIOLET }}>Model roles ·</span>
          <span className="text-white/70">
            <span style={{ color: VIOLET }}>Claude</span> builds
          </span>
          <span className="text-white/70">
            <span style={{ color: VIOLET }}>Codex</span> adversary
          </span>
          <span className="text-white/70">
            <span style={{ color: VIOLET }}>Gemini · Grok</span> research
          </span>
          <span className="text-white/70">
            <span style={{ color: VIOLET }}>Deepseek</span> cost
          </span>
          <span className="text-white/70">
            <span style={{ color: VIOLET }}>Local</span> privacy
          </span>
        </motion.div>
      </div>
    </section>
  );
}
