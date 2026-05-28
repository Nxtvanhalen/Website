'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const VIOLET = '#9370DB';

type SectionHeadingProps = {
  id: string;
  title: string;
  intro?: string;
};

function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <>
      <motion.h2
        id={id}
        className="font-heading text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.05 }}
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          className="font-body text-base md:text-lg max-w-3xl mt-6 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.78)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {intro}
        </motion.p>
      )}
    </>
  );
}

export default function AboutClient() {
  return (
    <main
      id="main-content"
      className="relative text-white"
      aria-label="About Chris Lee Bergstrom"
    >
      {/* Hero / Intro */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="flex items-center gap-5 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: '1px solid rgba(147, 112, 219, 0.4)' }}
            >
              <Image
                src="/images/profile/CBAI.webp"
                alt="Chris Lee Bergstrom"
                fill
                className="object-cover object-top"
                sizes="96px"
                priority
              />
            </div>
            <div>
              <p
                className="font-mono text-xs tracking-[0.35em] uppercase"
                style={{ color: VIOLET }}
              >
                Personnel
              </p>
              <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tight leading-none mt-2 text-white">
                About
              </h1>
            </div>
          </motion.div>

          <motion.p
            className="font-body text-lg md:text-xl leading-relaxed text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A pattern-recognizing systems thinker spanning twenty-five domains, with expert depth
            in seven. I operate an AI engineering team with multi-model role specialization,
            adversarial review pipelines, and platform delegation. Fluent across the full
            generative AI spectrum. I treat architecture and context engineering as source code.
          </motion.p>

          <motion.p
            className="font-body text-base md:text-lg mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.78)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Twenty-plus years in live entertainment — the domain expertise that makes every
            product decision credible. Building with AI since the GPT-2/3 era. I lead with{' '}
            <span style={{ color: VIOLET }}>"what do you think?"</span> and learn by building.
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section
        id="philosophy"
        aria-labelledby="philosophy-heading"
        className="relative px-6 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading id="philosophy-heading" title="Philosophy" />

          <motion.blockquote
            className="mt-10 font-body text-lg md:text-xl leading-relaxed text-white border-l-2 pl-6"
            style={{ borderColor: VIOLET }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            Optimizes for{' '}
            <a
              href="https://www.youtube.com/watch?v=fXIeFJCqsPs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-4 transition-colors hover:text-white"
              style={{ color: VIOLET, textDecorationColor: 'rgba(147, 112, 219, 0.6)' }}
            >
              Csikszentmihalyi's Flow state
            </a>
            . The entire AI methodology is engineered to keep challenge matched to skill — agents
            handle tedium, the human stays at the architectural and creative layer.
          </motion.blockquote>

        </div>
      </section>

      {/* AKA */}
      <section
        id="aka"
        aria-labelledby="aka-heading"
        className="relative px-6 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading id="aka-heading" title="Also Known As" />

          <motion.div
            className="mt-10 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            {[
              'AI-Native Technical Architect',
              'Agentic Development Orchestrator',
              'AI-Augmented Product Architect',
              'Context Engineer & Systems Designer',
              'Solo Technical Founder (AI-Native)',
              'Full-Stack AI Systems Builder',
            ].map((alias) => (
              <span
                key={alias}
                className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase px-3 py-2 rounded-sm text-white/80"
                style={{ border: '1px solid rgba(147, 112, 219, 0.35)' }}
              >
                {alias}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative px-6 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="font-heading text-3xl md:text-4xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            Want to work together?
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
