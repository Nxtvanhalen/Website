'use client';

import { motion } from 'motion/react';

const VIOLET = '#9370DB';

type SkillRowProps = {
  code: string;
  label: string;
  detail: string;
  delay?: number;
};

function SkillRow({ code, label, detail, delay = 0 }: SkillRowProps) {
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

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative px-6 py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="skills-heading"
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Skills
        </motion.h2>

        <motion.p
          className="font-body text-base md:text-lg max-w-3xl mt-6 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.78)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Twenty-five domains, seven at expert depth, fluent across the rest. Active in AI-native
          development since the GPT-2/3 era — four-plus years compounding through every model
          generation.
        </motion.p>

        <div className="mt-12 border-t border-white/10">
          <SkillRow
            code="AI"
            label="AI & Data"
            detail="LLM orchestration across Claude, Gemini, Grok, Deepseek, and local models. Model internals — tokenization, quantization, embeddings, inference tuning. Generative AI across image (Midjourney, Flux), voice (ElevenLabs, Whisper), music (Suno), and video (Runway). Custom Graph RAG, vector databases, persistent AI memory."
            delay={0}
          />
          <SkillRow
            code="ENG"
            label="Engineering"
            detail="Frontend (React, Next.js, TypeScript, Tailwind, Canvas/WebGL). Backend (Supabase + Postgres with RLS, Node/Bun, tRPC/REST/GraphQL, Python, Rust/Go). Edge performance (Cloudflare Workers, multi-region, offline-first). Security (OAuth, OWASP, bot defense). Infrastructure on Render and Cloudflare. CI/CD with a robust test suite."
            delay={0.05}
          />
          <SkillRow
            code="LIVE"
            label="Industry Domain"
            detail="Audio engineering and production tech — Pro Tools, Logic, Dante/AES67, SPL/RT60/FFT measurement, MIDI/OSC/DMX show control. Live entertainment operations — advancing, settlements, crew logistics, FOH engineering, stage management, ticketing, IATSE compliance, $10K–$1M+ productions, festivals at scale."
            delay={0.1}
          />
          <SkillRow
            code="HUM"
            label="Business & Human"
            detail="Product strategy and architecture trade-offs. Design and UX informed by Jakob's Law and iOS HIG. Contract negotiation, IP protection, revenue modeling. Technical and creative writing (including The Archivists). People leadership and live crisis management."
            delay={0.15}
          />
        </div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span style={{ color: VIOLET }}>Expert depth ·</span>
          <span className="text-white/70">LLM orchestration</span>
          <span className="text-white/70">Model internals</span>
          <span className="text-white/70">Generative AI</span>
          <span className="text-white/70">Memory systems</span>
          <span className="text-white/70">Audio production</span>
          <span className="text-white/70">Live ops</span>
          <span className="text-white/70">Product strategy</span>
        </motion.div>
      </div>
    </section>
  );
}
