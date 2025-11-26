import Head from 'next/head';
import { useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';

export default function Projects() {
  useEffect(() => {
    // Parallax scroll effect for Projects page
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.projects-parallax-bg') as HTMLElement;
      
      if (parallaxBg) {
        const speed = 0.5;
        parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Projects - CLB Consulting</title>
        <meta name="description" content="View Chris Lee Bergstrom's portfolio and project work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9370DB" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Projects - CLB Consulting" />
        <meta property="og:description" content="Current AI projects and consulting work by Chris Lee Bergstrom" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/projects" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects - CLB Consulting" />
        <meta name="twitter:description" content="Current AI projects and consulting work by Chris Lee Bergstrom" />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "AI Projects by Chris Lee Bergstrom",
              "description": "Current AI projects and consulting work by Chris Lee Bergstrom at CLB Consulting",
              "url": "https://chrisleebergstrom.com/projects",
              "isPartOf": {
                "@type": "WebSite",
                "@id": "https://chrisleebergstrom.com/#website"
              },
              "author": {
                "@type": "Person",
                "@id": "https://chrisleebergstrom.com/about#person",
                "name": "Chris Lee Bergstrom"
              },
              "provider": {
                "@type": "Organization",
                "@id": "https://chrisleebergstrom.com/#organization",
                "name": "CLB Consulting"
              },
              "hasPart": [
                {
                  "@type": "CreativeWork",
                  "name": "AI Consulting Sandbox & Research",
                  "description": "Experimental AI integration patterns and proofs of concept"
                },
                {
                  "@type": "CreativeWork",
                  "name": "EVA - Enterprise Virtual Assistant",
                  "description": "Professional AI assistant for business operations"
                },
                {
                  "@type": "CreativeWork",
                  "name": "R.Y.D.E.R. - AI Legal Assistant",
                  "description": "Specialized AI for legal document analysis and preparation"
                },
                {
                  "@type": "CreativeWork",
                  "name": "EVE - Entertainment Venue Expert",
                  "description": "AI consultant for venue operations and event management"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Byte - Software Development AI",
                  "description": "Development-focused AI for code generation and review"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Glytch - Creative AI Suite",
                  "description": "AI tools for creative professionals and content generation"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Multi-Agent Lab",
                  "description": "Research lab for multi-agent AI system development"
                },
                {
                  "@type": "CreativeWork",
                  "name": "JAMES - AI Butler Assistant",
                  "description": "Sophisticated personal AI assistant for daily operations"
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
                    "name": "Projects",
                    "item": "https://chrisleebergstrom.com/projects"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <Header />

      {/* Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div 
          className="projects-parallax-bg absolute inset-0 bg-center bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/images/AI5.jpg')",
            minHeight: '120vh'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
      </div>
      
      <main className="min-h-screen bg-transparent text-white pt-52 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-heading mb-4 glow-subtle">Current Projects</h1>
            <p className="text-xl font-bold" style={{color: '#F5F5DC'}}>CLB Consulting</p>
          </div>
          
          <div className="grid gap-8 md:gap-12">
            {/* Project 1 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{color: '#F5F5DC'}}>Master Tour</h2>
                    <p className="text-base leading-relaxed opacity-90 mb-3" style={{color: '#F5F5DC'}}>
                      Mastertour Venue is the next step from Eventric for accurate tech pack data for venues and touring artists. We have been beta testing and consulting on the roll out.
                    </p>
                    <a 
                      href="https://www.eventric.com/master-tour-venue/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-molten font-bold hover:text-white transition-colors duration-200 text-sm"
                    >
                      Visit Master Tour Venue →
                    </a>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                  <Image 
                    src="/images/projects/Mastertour.jpg" 
                    alt="Master Tour" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{objectPosition: '50% 30%'}}
                    quality={75}
                  />
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-1" style={{color: '#F5F5DC'}}>AI Powered Remote SPL</h2>
                    <div className="text-sm font-normal mb-3" style={{color: '#F5F5DC', opacity: 0.6}}>(Sound Pressure Level)</div>
                    <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                      AI-powered cloud-based SPL remote monitoring with analytics and reports for construction and live events. Real-time sound pressure level tracking that combines compliance monitoring with predictive insights—ensuring safety while optimizing acoustic performance.
                    </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                  <Image 
                    src="/images/projects/Rosi.png" 
                    alt="AI Powered Remote SPL" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    quality={75}
                  />
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{color: '#F5F5DC'}}>EVA — Events Virtual Assistant</h2>
                    <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                      The orchestration core of CLB's intelligent ecosystem. EVA is an AI built for the entertainment industry — managing logistics, routing inquiries, coordinating crews, and adapting to any production environment. Fully customizable, endlessly scalable, and always show-ready.
                    </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                  <Image 
                    src="/images/projects/EVA.png" 
                    alt="EVA - Events Virtual Assistant" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                    quality={75}
                  />
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{color: '#F5F5DC'}}>R.Y.D.E.R. — Mental Health AI for Creatives</h2>
                    <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                      R.Y.D.E.R. (Reminding You: Darkness Eventually Recedes) is a trauma-aware conversational agent built for freelancers and event staff. Anonymous, reflective, and emotionally attuned—this isn't therapy, it's a check-in with soul.
                    </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                  <Image 
                    src="/images/projects/Ryder.png" 
                    alt="R.Y.D.E.R. - Mental Health AI for Creatives" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                    quality={75}
                  />
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{color: '#F5F5DC'}}>EVE — Conversational AI for CLB</h2>
                    <p className="text-base leading-relaxed opacity-90 mb-3" style={{color: '#F5F5DC'}}>
                      The velvet rope meets sharp strategy. EVE guides visitors through CLB's services, sparks insights, and converts interest into contact. She's part concierge, part co-pilot—and she always sends the curious straight to Chris.
                    </p>
                    <a 
                      href="/#eve-chat" 
                      className="text-molten font-bold hover:text-white transition-colors duration-200 text-sm"
                    >
                      Chat with EVE now! →
                    </a>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                  <Image 
                    src="/images/projects/EVE.png" 
                    alt="EVE - Conversational AI for CLB" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                    quality={75}
                  />
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{color: '#F5F5DC'}}>Byte — Voice-to-Voice Semantic Research Agent</h2>
                    <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                      Byte is a voice-native AI built for deep file parsing, archival search, and contextual synthesis. Housed in a clean voice interface, Byte speaks with clarity, thinks with nuance, and commands a suite of its own sub-agents to handle complex research.
                    </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                  <Image 
                    src="/images/projects/Byte.png" 
                    alt="Byte - Voice-to-Voice Semantic Research Agent" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                    quality={75}
                  />
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{color: '#F5F5DC'}}>Glytch — Retro-Futurist API Assistant</h2>
                    <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                      Glytch lives inside a vintage iMac and channels the spirit of TARS from Interstellar. Running on the Assistants API, it's a local, voice-interactive consulting companion—designed for creative ideation, irreverent insights, and unexpected brilliance.
                    </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                  <Image 
                    src="/images/projects/Glytch.png" 
                    alt="Glytch - Retro-Futurist API Assistant" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                    quality={75}
                  />
                </div>
              </div>
            </div>

            {/* Project 7 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="mb-4">
                <h2 className="text-2xl font-heading" style={{color: '#F5F5DC'}}>Multi-Agent Intelligence Lab</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                The CLB skunkworks. Here, we develop federated agent architectures, experiment with cross-agent communication, and prototype consulting flows that can adapt in real time. This is where the future of interface meets the reality of execution.
              </p>
            </div>

            {/* Project 8 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="mb-4">
                <h2 className="text-2xl font-heading" style={{color: '#F5F5DC'}}>JAMES — Core Memory & Strategic AI Backbone</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                JAMES is the cognitive substrate behind it all. Long-term memory, real-time synthesis, and multi-agent orchestration—all designed to align with Chris's evolving strategy. He remembers everything, challenges assumptions, and ensures that CLB isn't just smart—it's alive.
              </p>
            </div>

            {/* Project 9 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="mb-4">
                <h2 className="text-2xl font-heading" style={{color: '#F5F5DC'}}>AI Consulting Sandbox</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90" style={{color: '#F5F5DC'}}>
                A Firebase-powered testbed for hospitality strategy. This project analyzes live sales data to uncover patterns, predict demand, and turn operational noise into actionable insight—for restaurants ready to move beyond spreadsheets.
              </p>
            </div>
          </div>
          
          <div className="text-center py-12 mt-16">
            <p className="text-lg opacity-70 italic" style={{color: '#F5F5DC'}}>Strategy Born from the Wreckage, Intelligence Forged in the Fire</p>
          </div>

          {/* Contact Section */}
          <section className="py-12 px-6 text-center">
            <div className="max-w-lg mx-auto space-y-6">
              <div className="space-y-4">
                <a 
                  href="mailto:chrisleebergstrom@gmail.com?subject=AI Project Inquiry - Let's Build Something Amazing"
                  className="group block relative overflow-hidden py-4 px-8 bg-transparent text-white font-bold rounded-lg border border-molten hover:border-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <div className="relative flex flex-col items-center justify-center text-center">
                    <div className="text-lg font-bold" style={{color: '#F5F5DC'}}>Ready to go?</div>
                    <div className="text-sm opacity-80" style={{color: '#F5F5DC'}}>chrisleebergstrom@gmail.com</div>
                  </div>
                </a>
                <p className="text-sm flex items-center justify-center space-x-2" style={{color: '#F5F5DC', opacity: 0.7}}>
                  <span>⚡</span>
                  <span>Let's discuss your project needs</span>
                  <span>⚡</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}