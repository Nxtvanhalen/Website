'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const VIOLET = '#9370DB';

type RankedRowProps = {
  code: string;
  label: string;
  detail: string;
  delay?: number;
};

function RankedRow({ code, label, detail, delay = 0 }: RankedRowProps) {
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
        style={{ color: 'rgba(245, 245, 220, 0.8)' }}
      >
        {detail}
      </p>
    </motion.div>
  );
}

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
            A pattern-recognizing systems thinker spanning twenty-five domains with expert depth
            in seven. Operates an AI engineering team with multi-model role specialization,
            adversarial review pipelines, and platform delegation. Fluent across the full
            generative AI spectrum. Treats architecture and context engineering as source code.
          </motion.p>

          <motion.p
            className="font-body text-base md:text-lg mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.78)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Twenty-plus years in live entertainment — the domain expertise that makes every
            product decision credible. Building with AI since the GPT-2/3 era. Leads with{' '}
            <span style={{ color: VIOLET }}>"what do you think?"</span> and learns by building.
          </motion.p>
        </div>
      </section>

      {/* Mind */}
      <section
        id="mind"
        aria-labelledby="mind-heading"
        className="relative px-6 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            id="mind-heading"
            title="Mind"
            intro="How the brain processes problems — ranked by dominance."
          />

          <div className="mt-10 border-t border-white/10">
            <RankedRow
              code="01"
              label="Pattern Recognition"
              detail="Sees connections across unrelated domains. The bridge from touring to software."
              delay={0}
            />
            <RankedRow
              code="02"
              label="Analogical Reasoning"
              detail="Applies touring lessons to software problems. Settlement logic becomes reconciliation features."
              delay={0.05}
            />
            <RankedRow
              code="03"
              label="Systems Thinking"
              detail="Sees feedback loops and second-order effects. Designs for emergence."
              delay={0.1}
            />
            <RankedRow
              code="04"
              label="First Principles"
              detail="Used when needed, not the default mode. Connects before deconstructing."
              delay={0.15}
            />
          </div>

          <motion.p
            className="mt-10 font-mono text-[10px] tracking-[0.25em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span style={{ color: VIOLET }}>Learns by · </span>
            <span className="text-white/70">Build first → discuss → study → observe</span>
          </motion.p>
        </div>
      </section>

      {/* Operating System */}
      <section
        id="operating-system"
        aria-labelledby="os-heading"
        className="relative px-6 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            id="os-heading"
            title="Operating System"
            intro="What makes the temperament effective under pressure."
          />

          <div className="mt-10 border-t border-white/10">
            <RankedRow
              code="01"
              label="Ambiguity Tolerance"
              detail="Comfortable not knowing yet. Advances shows with missing info. Builds products in shifting landscapes."
              delay={0}
            />
            <RankedRow
              code="02"
              label="Context Switching"
              detail="Four parallel tracks. Spinning plates energizes rather than drains."
              delay={0.05}
            />
            <RankedRow
              code="03"
              label="Deep Focus"
              detail="Flow state on hard problems when needed — but not the default operating mode."
              delay={0.1}
            />
            <RankedRow
              code="04"
              label="Public Failure Comfort"
              detail="Ship, learn, iterate. Willing to be wrong in public."
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* Drives + Vulnerabilities */}
      <section
        id="drives"
        aria-labelledby="drives-heading"
        className="relative px-6 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            id="drives-heading"
            title="What Drives It"
            intro="The motivations underneath the work — and the honest tensions that come with them."
          />

          <div className="mt-10 border-t border-white/10">
            <RankedRow
              code="01"
              label="Impact"
              detail="Products that change how people work."
              delay={0}
            />
            <RankedRow
              code="02"
              label="Methodology"
              detail="AI-native development as a discipline worth advancing."
              delay={0.05}
            />
            <RankedRow
              code="03"
              label="Legacy"
              detail="IP, products, and frameworks that outlast the builder."
              delay={0.1}
            />
            <RankedRow
              code="04"
              label="Proof"
              detail="Non-traditional paths can compete with CS degrees."
              delay={0.15}
            />
          </div>

          <motion.div
            className="mt-10 rounded-sm bg-black/40 backdrop-blur-md p-6 md:p-8"
            style={{ border: '1px solid rgba(147, 112, 219, 0.25)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
              style={{ color: VIOLET }}
            >
              Honest tensions
            </p>
            <dl className="space-y-4">
              <div>
                <dt className="font-heading text-base md:text-lg uppercase tracking-tight text-white">
                  Frontier Burnout
                </dt>
                <dd
                  className="font-body text-sm md:text-base mt-1 leading-relaxed"
                  style={{ color: 'rgba(245, 245, 220, 0.78)' }}
                >
                  The AI landscape demands constant attention. Day 57 this week of what's changed.
                </dd>
              </div>
              <div>
                <dt className="font-heading text-base md:text-lg uppercase tracking-tight text-white">
                  Isolation Gap
                </dt>
                <dd
                  className="font-body text-sm md:text-base mt-1 leading-relaxed"
                  style={{ color: 'rgba(245, 245, 220, 0.78)' }}
                >
                  Being ahead of colleagues who can't validate or challenge the work. Few true
                  peers at this intersection.
                </dd>
              </div>
              <div>
                <dt className="font-heading text-base md:text-lg uppercase tracking-tight text-white">
                  Build-to-Sell Gap
                </dt>
                <dd
                  className="font-body text-sm md:text-base mt-1 leading-relaxed"
                  style={{ color: 'rgba(245, 245, 220, 0.78)' }}
                >
                  Can architect anything but translating it into revenue and recognition is a
                  different skill. Hates having to think about money.
                </dd>
              </div>
            </dl>
          </motion.div>
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
            Optimizes for Csikszentmihalyi's Flow state. The entire AI methodology is engineered to
            keep challenge matched to skill — agents handle tedium, the human stays at the
            architectural and creative layer.
          </motion.blockquote>

          <motion.p
            className="font-body text-base md:text-lg mt-8 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.78)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Strategic output throttling. Velocity is so far ahead of standard timelines that
            delivery is intentionally held back to avoid unsustainable expectations.
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="font-mono text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: VIOLET }}
            >
              Creative fuel
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Reading widely outside field',
                'Physical activity / outdoor reset',
                'Music (listening, mixing, creating)',
                'Partner conversations on non-work topics',
              ].map((fuel) => (
                <span
                  key={fuel}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm text-white/75"
                  style={{ border: '1px solid rgba(147, 112, 219, 0.3)' }}
                >
                  {fuel}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direction */}
      <section
        id="direction"
        aria-labelledby="direction-heading"
        className="relative px-6 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            id="direction-heading"
            title="Direction"
            intro="Five-year direction, ranked. Then the legacy underneath."
          />

          <div className="mt-10 border-t border-white/10">
            <RankedRow
              code="01"
              label="Conference Speaking"
              detail="The intersection of live events plus tech. Nobody else can give this talk."
              delay={0}
            />
            <RankedRow
              code="02"
              label="Solo & Deep"
              detail="Stay in Flow. Go deeper on fewer things. Depth over empire."
              delay={0.05}
            />
            <RankedRow
              code="03"
              label="Agency Model"
              detail="CLB Consulting as a potentially scalable entity. A maybe."
              delay={0.1}
            />
            <RankedRow
              code="04"
              label="The Guide"
              detail="Write the definitive AI-native development methodology. Someday."
              delay={0.15}
            />
          </div>

          <motion.p
            className="mt-10 font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: VIOLET }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Legacy priority
          </motion.p>

          <motion.p
            className="font-body text-base md:text-lg mt-3 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.85)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className="text-white">Build tools</span>
            <span className="text-white/40"> → </span>
            <span className="text-white">build community</span>
            <span className="text-white/40"> → </span>
            <span className="text-white">mentor</span>
            <span className="text-white/40"> → </span>
            <span className="text-white">document</span>
            <span className="text-white/60">
              . Democratize AI-native development through tools first; writing it down comes last.
            </span>
          </motion.p>
        </div>
      </section>

      {/* Edges */}
      <section
        id="edges"
        aria-labelledby="edges-heading"
        className="relative px-6 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            id="edges-heading"
            title="Edges"
            intro="Honest limits. What gets delegated to agents and what isn't yet practiced hands-on."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                area: 'Database Query Internals',
                detail:
                  'Delegates index strategy, EXPLAIN plans, and ad-hoc SQL analytics to agents.',
              },
              {
                area: 'Self-Managed Infrastructure',
                detail:
                  'Operates on managed platforms. No Terraform, K8s, or self-hosted load balancers. Deliberate choice.',
              },
              {
                area: 'Load Testing',
                detail:
                  'Understands conceptually, planned for execution. Not yet practiced hands-on.',
              },
            ].map((edge, i) => (
              <motion.div
                key={edge.area}
                className="rounded-sm bg-black/40 backdrop-blur-md p-6"
                style={{ border: '1px solid rgba(147, 112, 219, 0.22)' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <p className="font-heading text-base md:text-lg uppercase tracking-tight text-white">
                  {edge.area}
                </p>
                <p
                  className="font-body text-sm md:text-base mt-3 leading-relaxed"
                  style={{ color: 'rgba(245, 245, 220, 0.78)' }}
                >
                  {edge.detail}
                </p>
              </motion.div>
            ))}
          </div>
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
              Send a transmission
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
