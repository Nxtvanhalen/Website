'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

const VIOLET = '#9370DB';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What does Chris actually do?',
    answer:
      "Chris is an AI developer with 20 years in live entertainment. He builds agentic software for venues, tours, and live events — front-of-house engineer turned full-stack developer, using AI agents as the build team.\n\nHe still consults on venue operations, AI training, and web security when it is the right fit. But the center of gravity is the work: shipped products, working demos, and the software that runs live shows.\n\nDeeply human, deeply technical, allergic to performative innovation. The work speaks first.",
    category: 'About Chris',
  },
  {
    question: 'How does the AI-native build process actually work?',
    answer:
      "Five phases, one orchestrator. Chris ideates and decides; agents type. Three to four parallel branches at a time. Claude Code is the primary build agent — runs the dev loop, commits, auto-fixes lint and CI failures. Codex reviews the work brutally with a signed report; that critique gets fed back to Claude. A third model breaks the echo chamber when needed.\n\nDeploys go through Chris's approval gate. Sentry monitors live and loops runtime errors back to the build agent. Documentation is self-maintaining — CLAUDE.md and memories update themselves so the next session inherits accumulated knowledge.",
    category: 'Method',
  },
  {
    question: 'What does your operational consulting cover?',
    answer:
      "Chris analyzes your entire operation from load-in to load-out — not just the stage, but everything that makes the show possible.\n\nThis includes staffing and labor optimization, safety and compliance audits, F&B and concessions flow, logistics and vendor coordination, marketing and booking strategies, and emergency preparedness. He's never cost a client more than he's saved them.\n\nIndustry standards recommend 10-20% contingency buffers. Chris helps you keep that buffer as profit, not watch it disappear into preventable inefficiencies.",
    category: 'Operations',
  },
  {
    question: 'What AI education and training do you offer?',
    answer:
      'Practical AI training that cuts through the hype, drawn from years of agentic AI development in production. Ethics-first implementation, hands-on tool mastery, and AI workflows that actually serve your mission.\n\nTraining covers everything from foundational AI literacy for teams to advanced agentic and multi-modal integrations. AI that empowers the visionary, never replaces the artist.',
    category: 'AI Training',
  },
  {
    question: 'What security services do you offer?',
    answer:
      "Comprehensive web and app security including vulnerability assessments, penetration testing, security audits, and compliance guidance.\n\nProactive protection — identifying weaknesses before they become breaches. Whether you're launching a new platform or hardening existing infrastructure, the same precision that goes into live event safety applies here. Digital security is just another form of protecting your operation.",
    category: 'Security',
  },
  {
    question: "What's your approach to leadership and team building?",
    answer:
      "Chris treats culture as infrastructure. Leadership coaching isn't motivational speeches, and team building isn't pizza parties — it's designing systems where people feel seen, safe, and intellectually alive.\n\nHis approach includes 1:1 executive coaching, team development, and organizational culture design. Interdisciplinary by design — artists working with engineers, philosophers with coders. The goal: leaders who navigate pressure with clarity and teams that thrive on cross-pollination.",
    category: 'Leadership',
  },
  {
    question: 'What industries do you work with?',
    answer:
      "Core expertise spans entertainment, logistics, audio and acoustical analysis, and live events. But the systems-thinking approach translates across industries — anyone who values operational elegance over rigidity, and who understands that infrastructure is culture.",
    category: 'Industries',
  },
  {
    question: 'Do you work with small venues or only large productions?',
    answer:
      "Chris works across the full spectrum — from intimate 200-seat theaters to major festival productions. The principles of operational excellence scale in both directions.\n\nSmaller venues often benefit most from systematic thinking because they're running lean and can't afford waste. Larger productions need it because complexity compounds fast. Either way, the approach gets tailored to your scale, budget, and goals.",
    category: 'Scope',
  },
  {
    question: 'How do you handle project timelines and deliverables?',
    answer:
      'The precision of live event production — where there are no second chances. Frameworks built for velocity without sacrificing quality. Every project includes clear milestones, real-time communication, and adaptive strategies that evolve with your needs.',
    category: 'Process',
  },
  {
    question: "What's your background in entertainment and audio engineering?",
    answer:
      "Two decades of global live and studio experience. From backstage production to strategic operations — high-pressure environments with influential talent inform every strategic decision. Two decades of front-of-house and studio work, some of it credited, some of it not. Real named credits: The Dandy Warhols, Black Rebel Motorcycle Club, Macklemore.",
    category: 'Experience',
  },
  {
    question: 'How do you ensure cost efficiency for clients?',
    answer:
      "Holistic analysis no matter where the client starts. Honest, empathetic discovery of goals and dreams, then building from there. It's not just about cost saving — it's about thriving into the future.",
    category: 'ROI',
  },
  {
    question: 'Do you offer ongoing support after implementation?',
    answer:
      "Absolutely. Chris doesn't build systems and walk away — he ensures they thrive. Training, optimization, continuous improvement. Teams get empowered to maintain and evolve systems themselves.",
    category: 'Support',
  },
];

type FaqRowProps = {
  index: number;
  faq: FAQItem;
  open: boolean;
  onToggle: () => void;
};

function FaqRow({ index, faq, open, onToggle }: FaqRowProps) {
  const code = String(index + 1).padStart(2, '0');
  return (
    <motion.div
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group w-full grid grid-cols-12 gap-4 py-6 text-left transition-colors hover:bg-white/[0.02]"
      >
        <p
          className="col-span-2 md:col-span-1 font-mono text-xs tracking-[0.3em] uppercase pt-1"
          style={{ color: VIOLET }}
        >
          {code}
        </p>
        <p className="col-span-9 md:col-span-10 font-heading text-base md:text-lg uppercase tracking-tight text-white">
          {faq.question}
        </p>
        <span
          aria-hidden="true"
          className={`col-span-1 flex items-start justify-end pt-1 font-mono text-base transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
          style={{ color: VIOLET }}
        >
          +
        </span>
      </button>
      <div
        className={`grid grid-cols-12 gap-4 overflow-hidden transition-all duration-500 ease-out ${
          open ? 'max-h-[1000px] opacity-100 pb-8' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="col-span-12 md:col-span-10 md:col-start-2 font-body text-base leading-relaxed whitespace-pre-line"
          style={{ color: 'rgba(245, 245, 220, 0.82)' }}
        >
          {faq.answer}
          {faq.category && (
            <p className="mt-5 font-mono text-[10px] tracking-[0.3em] uppercase text-white/45">
              {faq.category}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main
      id="main-content"
      className="relative bg-black text-white"
      aria-label="Frequently Asked Questions"
    >
      {/* Header */}
      <section className="relative px-6 pt-32 pb-12 md:pt-40 md:pb-16 lg:pt-48 lg:pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.p
            className="font-mono text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: VIOLET }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            FAQ
          </motion.p>
          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Frequent Questions
          </motion.h1>
          <motion.p
            className="font-body text-base md:text-lg lg:text-xl max-w-3xl mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.82)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Common questions about the work, the method, and the road. If yours isn't here, send a
            transmission and it might earn a row.
          </motion.p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="relative px-6 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="border-t border-white/10">
            {faqs.map((faq, index) => (
              <FaqRow
                key={faq.question}
                index={index}
                faq={faq}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
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
            Didn't answer your question?
          </motion.h2>
          <motion.p
            className="font-body text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.78)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Either ask EVE in the bottom-right widget — she knows the site — or send a direct note.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="mailto:chrisleebergstrom@gmail.com?subject=FAQ%20Follow-up"
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
