import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What makes CLB Consultancy different from other AI consulting firms?",
      answer: "We don't just optimize—we intervene. With two decades of global live entertainment experience, we bring strategy grounded in lived reality, not theory. Our approach is theatrical, confrontational, and systems-thinking focused. We architect futures that are as emotionally resonant as they are tactically sound.",
      category: "About CLB"
    },
    {
      question: "What does 'Strategy Born from the Wreckage, Intelligence Forged in the Fire' mean?",
      answer: "This isn't just a tagline—it's our methodology. We've learned from real-world pressure situations in live entertainment, from arenas to civic halls. Our strategies come from experience with systems under stress, not theoretical frameworks. We turn chaos into clarity.",
      category: "Philosophy"
    },
    {
      question: "What types of AI solutions do you provide?",
      answer: "We specialize in multi-modal and multi-lingual AI integrations that prioritize accessibility and efficiency. Our focus areas include entertainment technology, hospitality systems, live events management, team building solutions, and operational optimization. We build AI that empowers the visionary, never replaces the artist.",
      category: "Services"
    },
    {
      question: "How do you approach team building and morale?",
      answer: "Morale is worth 30% and team cohesion isn't just good for business—it's ethical and sustainable practice. We use AI-powered insights to understand team dynamics and create frameworks built on empathy, clarity, and velocity. No extractive shortcuts, only regenerative design.",
      category: "Team Building"
    },
    {
      question: "What can I expect from working with EVE AI?",
      answer: "EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. EVE provides real-time consulting insights, project analysis, and strategic recommendations. She's designed to empower your decision-making, not replace your creative process.",
      category: "EVE AI"
    },
    {
      question: "What industries do you work with?",
      answer: "Our core expertise is in entertainment, hospitality, and live events, but our systems-thinking approach translates across industries. We work with anyone who values operational elegance over rigidity, and who understands that infrastructure is culture.",
      category: "Industries"
    },
    {
      question: "How do you ensure cost efficiency for clients?",
      answer: "We can typically save or generate 20-30% for companies while setting them up for the future of entertainment and technology. Our focus is on sustainable, regenerative solutions that create long-term value, not quick fixes that break down under pressure.",
      category: "ROI"
    },
    {
      question: "What's your background in entertainment and audio engineering?",
      answer: "Chris Lee Bergstrom is a Grammy-nominated audio engineer with two decades of global live entertainment experience. From backstage operations to front-of-house management, this hands-on experience in high-pressure environments informs every strategic decision we make.",
      category: "Experience"
    },
    {
      question: "How do you handle project timelines and deliverables?",
      answer: "We operate with the precision of live event production—where there are no second chances. Our frameworks are built for velocity without sacrificing quality. Every project includes clear milestones, real-time communication, and adaptive strategies that evolve with your needs.",
      category: "Process"
    },
    {
      question: "Do you offer ongoing support after implementation?",
      answer: "Absolutely. We don't just build systems and walk away—we ensure they thrive. Our approach includes training, optimization, and continuous improvement. We leave systems better than we found them, with your team empowered to maintain and evolve them.",
      category: "Support"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>FAQ - CLB Consultancy | AI Strategy & Entertainment Technology</title>
        <meta name="description" content="Frequently asked questions about CLB Consultancy's AI integration services, team building solutions, and entertainment technology consulting." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="FAQ - CLB Consultancy | AI Strategy & Entertainment Technology" />
        <meta property="og:description" content="Get answers about our AI consulting services, team building solutions, and entertainment technology expertise." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/faq" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/faq" />
      </Head>

      <Header />

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div 
          className="absolute inset-0 bg-center bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/images/parallax-bg2.webp')",
            minHeight: '120vh'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>
      
      <main className="min-h-screen bg-transparent text-white pt-52 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-heading mb-6 glow-subtle">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              <span className="text-molten font-bold">Strategy Born from the Wreckage, Intelligence Forged in the Fire</span> — 
              Get answers about our approach to AI consulting, team building, and entertainment technology.
            </p>
            <div className="mt-8 h-0.5 bg-molten mx-auto w-32 animate-pulse-width"></div>
          </div>

          {/* FAQ Items */}
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
                  <h3 className="text-lg font-semibold text-white pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <div className={`text-molten text-2xl font-bold transform transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-5 pt-0">
                    <div className="border-t border-molten/20 pt-4">
                      <p className="text-white/90 leading-relaxed">
                        {faq.answer}
                      </p>
                      {faq.category && (
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 bg-molten/20 text-molten text-xs font-bold rounded-full">
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

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-black/40 border border-molten/30 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-heading mb-4 text-molten">Still have questions?</h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Ready to discuss how CLB Consultancy can transform your operations and empower your team? 
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
        </div>
      </main>
    </>
  );
}