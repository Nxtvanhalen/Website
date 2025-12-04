import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
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
      question: "What makes CLB Consulting different from other AI consulting firms?",
      answer: "Chris operates as a cultural intelligence studio that treats AI as a tool—not a substitute—for human insight. His work lives at the intersection of storytelling, systems thinking, and ethical engineering.\n\nWhere most AI firms optimize for scale, he optimizes for meaning. He brings decades of lived experience in entertainment, civic leadership, and strategic design—and he doesn't just build solutions, he reshapes the questions.\n\nChris is deeply human, deeply technical, and allergic to performative innovation. He's not here to automate your soul—he's here to amplify your mission.",
      category: "About CLB"
    },
    {
      question: "What does 'Strategy Born from the Wreckage, Intelligence Forged in the Fire' mean?",
      answer: "This isn't just a tagline—it's Chris's methodology, his modus operandi. He's learned from real-world pressure situations in live entertainment, from arenas to civic halls. His strategies come from experience with systems under stress, not theoretical frameworks. He turns chaos into clarity.",
      category: "Philosophy"
    },
    {
      question: "What types of AI solutions do you provide?",
      answer: "Chris specializes in multi-modal and multi-lingual AI integrations that prioritize accessibility and efficiency. His focus areas include entertainment technology, hospitality systems, live events management, team building solutions, and operational optimization. He builds AI that empowers the visionary, never replaces the artist.",
      category: "Services"
    },
    {
      question: "How do you approach team building and morale?",
      answer: "At CLB, Chris treats culture as infrastructure. Team building isn't pizza parties and trust falls—it's designing a system where people feel seen, safe, and intellectually alive.\n\nHe builds morale by respecting the intelligence in the room. That means clear communication, low-ego collaboration, and space to experiment without fear. He expects excellence, but he doesn't confuse that with burnout.\n\nCLB teams are interdisciplinary by design. They thrive on cross-pollination—artists working with engineers, philosophers with coders. It keeps the work weird, sharp, and worth doing.",
      category: "Team Building"
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
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>FAQ - CLB Consulting | AI Strategy & Entertainment Technology</title>
        <meta name="description" content="Frequently asked questions about CLB Consulting's AI integration services, team building solutions, and entertainment technology consulting." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph tags */}
        <meta property="og:title" content="FAQ - CLB Consulting | AI Strategy & Entertainment Technology" />
        <meta property="og:description" content="Get answers about our AI consulting services, team building solutions, and entertainment technology expertise." />
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
        <meta name="twitter:title" content="FAQ - CLB Consulting | AI Strategy & Entertainment Technology" />
        <meta name="twitter:description" content="Get answers about our AI consulting services, team building solutions, and entertainment technology expertise." />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Audio Engineer" />

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
              "description": "Common questions about CLB Consulting's AI strategy services and approach",
              "url": "https://chrisleebergstrom.com/faq",
              "publisher": {
                "@type": "Organization",
                "@id": "https://chrisleebergstrom.com/#organization",
                "name": "CLB Consulting"
              },
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What makes CLB Consulting different from other AI consulting firms?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris operates as a cultural intelligence studio that treats AI as a tool—not a substitute—for human insight. His work lives at the intersection of storytelling, systems thinking, and ethical engineering. Where most AI firms optimize for scale, he optimizes for meaning."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What does 'Strategy Born from the Wreckage, Intelligence Forged in the Fire' mean?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This isn't just a tagline—it's Chris's methodology. He's learned from real-world pressure situations in live entertainment. His strategies come from experience with systems under stress, not theoretical frameworks."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What types of AI solutions do you provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris specializes in multi-modal and multi-lingual AI integrations that prioritize accessibility and efficiency. Focus areas include entertainment technology, hospitality systems, live events management, team building solutions, and operational optimization."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do you approach team building and morale?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "At CLB, Chris treats culture as infrastructure. Team building is about designing a system where people feel seen, safe, and intellectually alive. CLB teams are interdisciplinary by design, thriving on cross-pollination."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What can I expect from working with EVE AI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. EVE provides real-time consulting insights, project analysis, and strategic recommendations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What industries do you work with?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chris's core expertise spans entertainment, logistics, audio and acoustical analysis, and live events, but his systems-thinking approach translates across industries."
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

      <main className="min-h-screen bg-transparent text-white pt-52 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <SectionTracker name="FAQ - Header">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-heading mb-6 glow-subtle">
                Frequently Asked Questions
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5DC', opacity: 0.9 }}>
                <span className="font-bold" style={{ color: '#F5F5DC' }}>Strategy Born from the Wreckage, Intelligence Forged in the Fire</span> —
                Get answers about AI consulting, team building, and entertainment tech.
              </p>
              <div className="mt-8 h-0.5 bg-molten mx-auto w-32 animate-pulse-width"></div>
            </div>
          </SectionTracker>

          {/* FAQ Items */}
          <SectionTracker
            name="FAQ - List"
            butlerMessage="Got questions? I might have answers. Or at least a witty retort."
          >
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-black/40 border border-molten/30 rounded-lg overflow-hidden backdrop-blur-sm hover:border-molten/50 transition-all duration-300"
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
                </div>
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