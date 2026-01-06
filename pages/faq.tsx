import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import { motion } from 'motion/react';
import SectionTracker from '../components/SectionTracker';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What makes CLB Consulting different?",
      answer: "Chris brings 20 years of live entertainment experience to every engagement—not theoretical frameworks, but battle-tested strategies from arenas, festivals, and civic halls worldwide.\n\nHe operates across four core areas: Operational Consulting, AI Education & Training, Web & App Security, and Leadership Coaching. Where most consultants specialize narrowly, Chris sees the whole system—because in live events, everything connects.\n\nHe's deeply human, deeply technical, and allergic to performative innovation. He's not here to sell you buzzwords—he's here to make your operation run smarter, safer, and more efficiently.",
      category: "About CLB"
    },
    {
      question: "What does your operational consulting cover?",
      answer: "Chris analyzes your entire operation from load-in to load-out—not just the stage, but everything that makes the show possible.\n\nThis includes: staffing and labor optimization, safety and compliance audits, F&B and concessions flow, logistics and vendor coordination, marketing and booking strategies, and emergency preparedness. He's never cost a client more than he's saved them.\n\nIndustry standards recommend 10-20% contingency buffers. Chris helps you keep that buffer as profit, not watch it disappear into preventable inefficiencies.",
      category: "Operations"
    },
    {
      question: "What does 'Strategy Born from the Wreckage, Intelligence Forged in the Fire' mean?",
      answer: "This isn't just a tagline—it's Chris's methodology, his modus operandi. He's learned from real-world pressure situations in live entertainment, from arenas to civic halls. His strategies come from experience with systems under stress, not theoretical frameworks. He turns chaos into clarity.",
      category: "Philosophy"
    },
    {
      question: "What AI education and training do you offer?",
      answer: "Chris is in the top 3.7% of AI users worldwide, offering practical training that cuts through the hype. His focus: ethics-first implementation, hands-on tool mastery, and building AI workflows that actually serve your mission.\n\nTraining covers everything from foundational AI literacy for teams to advanced multi-modal integrations. He builds AI that empowers the visionary, never replaces the artist.",
      category: "AI Training"
    },
    {
      question: "What security services do you offer?",
      answer: "Chris provides comprehensive web and app security services including vulnerability assessments, penetration testing, security audits, and compliance guidance.\n\nWith a focus on proactive protection, he identifies weaknesses before they become breaches. Whether you're launching a new platform or hardening existing infrastructure, he brings the same precision and thoroughness he applies to live event safety—because digital security is just another form of protecting your operation.",
      category: "Security"
    },
    {
      question: "What's your approach to leadership and team building?",
      answer: "Chris treats culture as infrastructure. Leadership coaching isn't motivational speeches, and team building isn't pizza parties—it's designing systems where people feel seen, safe, and intellectually alive.\n\nHis approach includes 1:1 executive coaching, team development, and organizational culture design. He builds morale by respecting the intelligence in the room: clear communication, low-ego collaboration, and space to experiment without fear.\n\nCLB teams are interdisciplinary by design—artists working with engineers, philosophers with coders. He expects excellence but doesn't confuse that with burnout. The goal: leaders who navigate pressure with clarity and teams that thrive on cross-pollination.",
      category: "Leadership"
    },
    {
      question: "What can I expect from working with EVE AI?",
      answer: "EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. EVE provides real-time consulting insights, project analysis, and strategic recommendations. She's designed to empower your decision-making, not replace your creative process.",
      category: "EVE AI"
    },
    {
      question: "What industries do you work with?",
      answer: "Chris's core expertise spans entertainment, logistics, audio and acoustical analysis, and live events, but his systems-thinking approach translates across industries. He works with anyone who values operational elegance over rigidity, and who understands that infrastructure is culture.",
      category: "Industries"
    },
    {
      question: "How do you ensure cost efficiency for clients?",
      answer: "Chris starts with holistic analysis no matter where his clients are at, and he's honest and empathetic as he learns their goals and dreams and builds from there. It's not just about cost saving—it's about thriving into the future.",
      category: "ROI"
    },
    {
      question: "What's your background in entertainment and audio engineering?",
      answer: "Chris Lee Bergstrom has two decades of global live and studio experience. From backstage production to strategic operations, this hands-on experience working with some of the most influential talent in the world in high-pressure environments informs every strategic decision he makes.",
      category: "Experience"
    },
    {
      question: "How do you handle project timelines and deliverables?",
      answer: "Chris operates with the precision of live event production—where there are no second chances. His frameworks are built for velocity without sacrificing quality. Every project includes clear milestones, real-time communication, and adaptive strategies that evolve with your needs.",
      category: "Process"
    },
    {
      question: "Do you offer ongoing support after implementation?",
      answer: "Absolutely. Chris doesn't just build systems and walk away—he ensures they thrive. His approach includes training, optimization, and continuous improvement. He leaves systems better than he found them, with your team empowered to maintain and evolve them.",
      category: "Support"
    },
    {
      question: "Do you work with small venues or only large productions?",
      answer: "Chris works across the full spectrum—from intimate 200-seat theaters to major festival productions. The principles of operational excellence scale in both directions.\n\nSmaller venues often benefit most from systematic thinking because they're running lean and can't afford waste. Larger productions need it because complexity compounds fast. Either way, Chris tailors his approach to your scale, budget, and goals.",
      category: "Scope"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>FAQ - CLB Consulting | Operations, AI, Security & Leadership</title>
        <meta name="description" content="Frequently asked questions about CLB Consulting's operational consulting, AI training, web security, and leadership coaching services for venues and live entertainment." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph tags */}
        <meta property="og:title" content="FAQ | CLB Consulting" />
        <meta property="og:description" content="Get answers about operational consulting, AI training, web security, and leadership coaching for venues and live entertainment." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/faq" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Audio Engineer" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@chrisleebergstrom" />
        <meta name="twitter:creator" content="@chrisleebergstrom" />
        <meta name="twitter:title" content="FAQ | CLB Consulting" />
        <meta name="twitter:description" content="Get answers about operational consulting, AI training, web security, and leadership coaching for venues and live entertainment." />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Audio Engineer" />

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/images/Favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/Favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/Favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/Favicon/android-chrome-512x512.png" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/faq" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "name": "Frequently Asked Questions - CLB Consulting",
              "description": "Common questions about CLB Consulting's operational consulting, AI training, web security, and leadership coaching services",
              "url": "https://chrisleebergstrom.com/faq",
              "publisher": {
                "@type": "Organization",
                "@id": "https://chrisleebergstrom.com/#organization",
                "name": "CLB Consulting"
              },
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What makes CLB Consulting different?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris brings 20 years of live entertainment experience across four core areas: Operational Consulting, AI Education & Training, Web & App Security, and Leadership Coaching. Where most consultants specialize narrowly, Chris sees the whole system."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What does your operational consulting cover?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris analyzes your entire operation from load-in to load-out: staffing, safety audits, F&B flow, logistics, marketing, booking, and emergency preparedness. He's never cost a client more than he's saved them."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What AI education and training do you offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris is in the top 3.7% of AI users worldwide, offering ethics-first implementation training, hands-on tool mastery, and AI workflows that serve your mission. Training covers foundational AI literacy to advanced multi-modal integrations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What security services do you offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris provides comprehensive web and app security including vulnerability assessments, penetration testing, security audits, and compliance guidance. He identifies weaknesses before they become breaches."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's your approach to leadership and team building?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris treats culture as infrastructure. His approach includes 1:1 executive coaching, team development, and organizational culture design. CLB teams are interdisciplinary by design. The goal: leaders who navigate pressure with clarity and teams that thrive."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What industries do you work with?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris's core expertise spans entertainment, logistics, audio and acoustical analysis, and live events, but his systems-thinking approach translates across industries."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you work with small venues or only large productions?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris works across the full spectrum—from intimate 200-seat theaters to major festival productions. Smaller venues often benefit most from systematic thinking; larger productions need it because complexity compounds fast."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer ongoing support after implementation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Chris doesn't just build systems and walk away—he ensures they thrive. His approach includes training, optimization, and continuous improvement."
                  }
                }
              ],
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://chrisleebergstrom.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "FAQ",
                    "item": "https://chrisleebergstrom.com/faq"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <Header />

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div
          className="absolute inset-0 bg-center bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/images/parallax-bg1.jpeg')",
            minHeight: '120vh'
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
                <span className="font-bold" style={{ color: '#F5F5DC' }}>Strategy Born from the Wreckage, Intelligence Forged in the Fire</span> —
                Get answers about operations, AI training, security, and leadership coaching.
              </motion.p>
              <div className="mt-8 h-0.5 bg-molten mx-auto w-32 animate-pulse-width"></div>
            </div>
          </SectionTracker>

          {/* FAQ Items */}
          <SectionTracker
            name="FAQ - List"
            butlerMessage="Operations, AI, security, leadership—Chris covers it all. Ask me anything or browse the answers below."
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
                    <h3 className="text-lg font-semibold pr-4 leading-relaxed" style={{ color: '#F5F5DC' }}>
                      {faq.question}
                    </h3>
                    <div className={`text-molten text-2xl font-bold transform transition-transform duration-200 flex-shrink-0 ${openIndex === index ? 'rotate-45' : ''
                      }`}>
                      +
                    </div>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="px-6 pb-5 pt-0">
                      <div className="border-t border-molten/20 pt-4">
                        <p className="leading-relaxed" style={{ color: '#F5F5DC', opacity: 0.9 }}>
                          {faq.answer}
                        </p>
                        {faq.category && (
                          <div className="mt-3">
                            <span className="inline-block px-3 py-1 bg-molten/20 text-xs font-bold rounded-full" style={{ color: '#F5F5DC' }}>
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
              <h2 className="text-3xl font-heading mb-4" style={{ color: '#F5F5DC' }}>Still have questions?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#F5F5DC', opacity: 0.9 }}>
                Ready to discuss how CLB Consulting can transform your operations and empower your team?
                Let's start the conversation.
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