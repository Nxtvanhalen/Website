'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import SectionTracker from '../../components/SectionTracker';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What does Chris actually do?',
      answer:
        "Chris is an AI developer with 20 years in live entertainment. He builds agentic software for venues, tours, and live events — front-of-house engineer turned full-stack developer, using AI agents as the build team.\n\nHe still consults on venue operations, AI training, and web security when it is the right fit. But the center of gravity is the work: shipped products, working demos, and the software that runs live shows.\n\nDeeply human, deeply technical, allergic to performative innovation. The work speaks first.",
      category: 'About Chris',
    },
    {
      question: 'What does your operational consulting cover?',
      answer:
        "Chris analyzes your entire operation from load-in to load-out—not just the stage, but everything that makes the show possible.\n\nThis includes: staffing and labor optimization, safety and compliance audits, F&B and concessions flow, logistics and vendor coordination, marketing and booking strategies, and emergency preparedness. He's never cost a client more than he's saved them.\n\nIndustry standards recommend 10-20% contingency buffers. Chris helps you keep that buffer as profit, not watch it disappear into preventable inefficiencies.",
      category: 'Operations',
    },
    {
      question:
        "What does 'Strategy Born from the Wreckage, Intelligence Forged in the Fire' mean?",
      answer:
        "This isn't just a tagline—it's Chris's methodology, his modus operandi. He's learned from real-world pressure situations in live entertainment, from arenas to civic halls. His strategies come from experience with systems under stress, not theoretical frameworks. He turns chaos into clarity.",
      category: 'Philosophy',
    },
    {
      question: 'What AI education and training do you offer?',
      answer:
        'Practical AI training that cuts through the hype, drawn from years of agentic AI development in production. Focus: ethics-first implementation, hands-on tool mastery, and AI workflows that actually serve your mission.\n\nTraining covers everything from foundational AI literacy for teams to advanced agentic and multi-modal integrations. AI that empowers the visionary, never replaces the artist.',
      category: 'AI Training',
    },
    {
      question: 'What security services do you offer?',
      answer:
        "Chris provides comprehensive web and app security services including vulnerability assessments, penetration testing, security audits, and compliance guidance.\n\nWith a focus on proactive protection, he identifies weaknesses before they become breaches. Whether you're launching a new platform or hardening existing infrastructure, he brings the same precision and thoroughness he applies to live event safety—because digital security is just another form of protecting your operation.",
      category: 'Security',
    },
    {
      question: "What's your approach to leadership and team building?",
      answer:
        "Chris treats culture as infrastructure. Leadership coaching isn't motivational speeches, and team building isn't pizza parties—it's designing systems where people feel seen, safe, and intellectually alive.\n\nHis approach includes 1:1 executive coaching, team development, and organizational culture design. He builds morale by respecting the intelligence in the room: clear communication, low-ego collaboration, and space to experiment without fear.\n\nCLB teams are interdisciplinary by design—artists working with engineers, philosophers with coders. He expects excellence but doesn't confuse that with burnout. The goal: leaders who navigate pressure with clarity and teams that thrive on cross-pollination.",
      category: 'Leadership',
    },
    {
      question: 'What can I expect from working with EVE AI?',
      answer:
        "EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. EVE provides real-time consulting insights, project analysis, and strategic recommendations. She's designed to empower your decision-making, not replace your creative process.",
      category: 'EVE AI',
    },
    {
      question: 'What industries do you work with?',
      answer:
        "Chris's core expertise spans entertainment, logistics, audio and acoustical analysis, and live events, but his systems-thinking approach translates across industries. He works with anyone who values operational elegance over rigidity, and who understands that infrastructure is culture.",
      category: 'Industries',
    },
    {
      question: 'How do you ensure cost efficiency for clients?',
      answer:
        "Chris starts with holistic analysis no matter where his clients are at, and he's honest and empathetic as he learns their goals and dreams and builds from there. It's not just about cost saving—it's about thriving into the future.",
      category: 'ROI',
    },
    {
      question: "What's your background in entertainment and audio engineering?",
      answer:
        'Chris Lee Bergstrom has two decades of global live and studio experience. From backstage production to strategic operations, this hands-on experience working with some of the most influential talent in the world in high-pressure environments informs every strategic decision he makes.',
      category: 'Experience',
    },
    {
      question: 'How do you handle project timelines and deliverables?',
      answer:
        'Chris operates with the precision of live event production—where there are no second chances. His frameworks are built for velocity without sacrificing quality. Every project includes clear milestones, real-time communication, and adaptive strategies that evolve with your needs.',
      category: 'Process',
    },
    {
      question: 'Do you offer ongoing support after implementation?',
      answer:
        "Absolutely. Chris doesn't just build systems and walk away—he ensures they thrive. His approach includes training, optimization, and continuous improvement. He leaves systems better than he found them, with your team empowered to maintain and evolve them.",
      category: 'Support',
    },
    {
      question: 'Do you work with small venues or only large productions?',
      answer:
        "Chris works across the full spectrum—from intimate 200-seat theaters to major festival productions. The principles of operational excellence scale in both directions.\n\nSmaller venues often benefit most from systematic thinking because they're running lean and can't afford waste. Larger productions need it because complexity compounds fast. Either way, Chris tailors his approach to your scale, budget, and goals.",
      category: 'Scope',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-center bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/images/parallax-bg1.jpeg')",
            minHeight: '120vh',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      <main className="min-h-screen bg-transparent text-white pt-24 md:pt-52 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <SectionTracker name="FAQ - Header">
            <div className="text-center mb-16">
              <motion.h1
                className="text-4xl md:text-5xl font-heading mb-6 glow-subtle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                className="text-xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: '#F5F5DC', opacity: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="font-bold" style={{ color: '#F5F5DC' }}>
                  Strategy Born from the Wreckage, Intelligence Forged in the Fire
                </span>{' '}
                — Get answers about operations, AI training, security, and leadership coaching.
              </motion.p>
              <div className="mt-8 h-0.5 bg-molten mx-auto w-32 animate-pulse-width"></div>
            </div>
          </SectionTracker>

          {/* FAQ Items */}
          <SectionTracker
            name="FAQ - List"
            butlerMessage="Common questions about the work, the road, and Chris's method. Ask me anything or browse below."
          >
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-black/40 border border-molten/30 rounded-lg overflow-hidden backdrop-blur-sm hover:border-molten/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-molten/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-molten/50"
                    aria-expanded={openIndex === index}
                  >
                    <h3
                      className="text-lg font-semibold pr-4 leading-relaxed"
                      style={{ color: '#F5F5DC' }}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`text-molten text-2xl font-bold transform transition-transform duration-200 flex-shrink-0 ${
                        openIndex === index ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div className="border-t border-molten/20 pt-4">
                        <p className="leading-relaxed" style={{ color: '#F5F5DC', opacity: 0.9 }}>
                          {faq.answer}
                        </p>
                        {faq.category && (
                          <div className="mt-3">
                            <span
                              className="inline-block px-3 py-1 bg-molten/20 text-xs font-bold rounded-full"
                              style={{ color: '#F5F5DC' }}
                            >
                              {faq.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionTracker>

          {/* Contact CTA */}
          <SectionTracker name="FAQ - Contact">
            <div className="mt-16 mb-24 text-center bg-black/40 border border-molten/30 rounded-lg p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-heading mb-4" style={{ color: '#F5F5DC' }}>
                Still have questions?
              </h2>
              <p
                className="text-lg mb-6 max-w-2xl mx-auto"
                style={{ color: '#F5F5DC', opacity: 0.9 }}
              >
                Ready to talk through your project, your venue, or your AI strategy? Let's start the
                conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:chrisleebergstrom@gmail.com?subject=FAQ Follow-up - Let's Discuss Your Project"
                  className="inline-block py-3 px-8 bg-transparent border border-molten text-molten font-bold rounded hover:bg-molten/10 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-molten/50"
                >
                  Get in Touch
                </a>
                <span className="text-white/60">or</span>
                <a
                  href="/#eve-chat"
                  className="inline-block py-3 px-8 bg-molten/20 border border-molten text-white font-bold rounded hover:bg-molten/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-molten/50"
                >
                  Chat with EVE AI
                </a>
              </div>
            </div>
          </SectionTracker>
        </div>
      </main>
    </>
  );
}
