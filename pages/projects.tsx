import Head from 'next/head';
import { useEffect } from 'react';
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
        <title>Projects - CLB Consultancy</title>
        <meta name="description" content="View Chris Lee Bergstrom's portfolio and project work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      
      <Header />

      {/* Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div 
          className="projects-parallax-bg absolute inset-0 bg-center bg-cover bg-fixed"
          style={{
            backgroundImage: "url('/images/AI3.jpg')",
            minHeight: '120vh'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>
      
      <main className="min-h-screen bg-transparent text-white pt-40 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-heading mb-4 glow-subtle">Current Projects</h1>
            <p className="text-xl text-molten font-bold">CLB Consulting</p>
          </div>
          
          <div className="grid gap-8 md:gap-12">
            {/* Project 1 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-molten text-2xl font-bold">1.</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading glow mb-3">Master Tour</h2>
                    <p className="text-base leading-relaxed opacity-90 mb-3">
                      Mastertour Venue is the next step from Eventric for accurate tech pack data for venues and touring artists. We have been beta testing and consulting on the roll out.
                    </p>
                    <a 
                      href="https://www.eventric.com/master-tour-venue/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-molten font-bold hover:text-white transition-colors duration-200 glow text-sm"
                    >
                      Visit Master Tour Venue →
                    </a>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
                  <img 
                    src="/images/projects/Mastertour.jpg" 
                    alt="Master Tour" 
                    className="w-full h-full object-cover"
                    style={{objectPosition: '50% 30%'}}
                  />
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-molten text-2xl font-bold">2.</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading glow mb-3">AI Powered Remote SPL</h2>
                    <p className="text-base leading-relaxed opacity-90">
                      AI-powered cloud-based SPL remote monitoring with analytics and reports for construction and live events. Real-time sound pressure level tracking that combines compliance monitoring with predictive insights—ensuring safety while optimizing acoustic performance.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
                  <img 
                    src="/images/projects/Rosi.png" 
                    alt="AI Powered Remote SPL" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-molten text-2xl font-bold">2.</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading glow mb-3">EVA — Events Virtual Assistant</h2>
                    <p className="text-base leading-relaxed opacity-90">
                      The orchestration core of CLB's AI system. EVA routes client inquiries, manages agent workflows, and coordinates behind-the-scenes logistics for tours, productions, and consulting pipelines. She's the planner that never misses a cue.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
                  <img 
                    src="/images/projects/EVA.png" 
                    alt="EVA - Events Virtual Assistant" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-molten text-2xl font-bold">3.</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading glow mb-3">R.Y.D.E.R. — Mental Health AI for Creatives</h2>
                    <p className="text-base leading-relaxed opacity-90">
                      R.Y.D.E.R. (Reminding You: Darkness Eventually Recedes) is a trauma-aware conversational agent built for freelancers and event staff. Anonymous, reflective, and emotionally attuned—this isn't therapy, it's a check-in with soul.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
                  <img 
                    src="/images/projects/Ryder.png" 
                    alt="R.Y.D.E.R. - Mental Health AI for Creatives" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-molten text-2xl font-bold">4.</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading glow mb-3">EVE — Conversational AI for CLB</h2>
                    <p className="text-base leading-relaxed opacity-90 mb-3">
                      The velvet rope meets sharp strategy. EVE guides visitors through CLB's services, sparks insights, and converts interest into contact. She's part concierge, part co-pilot—and she always sends the curious straight to Chris.
                    </p>
                    <a 
                      href="/#eve-chat" 
                      className="text-molten font-bold hover:text-white transition-colors duration-200 glow text-sm"
                    >
                      Chat with EVE now! →
                    </a>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
                  <img 
                    src="/images/projects/EVE.png" 
                    alt="EVE - Conversational AI for CLB" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-molten text-2xl font-bold">5.</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading glow mb-3">Byte — Voice-to-Voice Semantic Research Agent</h2>
                    <p className="text-base leading-relaxed opacity-90">
                      Byte is a voice-native AI built for deep file parsing, archival search, and contextual synthesis. Housed in a clean voice interface, Byte speaks with clarity, thinks with nuance, and commands a suite of its own sub-agents to handle complex research.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
                  <img 
                    src="/images/projects/Byte.png" 
                    alt="Byte - Voice-to-Voice Semantic Research Agent" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-6 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-molten text-2xl font-bold">6.</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading glow mb-3">Glytch — Retro-Futurist API Assistant</h2>
                    <p className="text-base leading-relaxed opacity-90">
                      Glytch lives inside a vintage iMac and channels the spirit of TARS from Interstellar. Running on the Assistants API, it's a local, voice-interactive consulting companion—designed for creative ideation, irreverent insights, and unexpected brilliance.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
                  <img 
                    src="/images/projects/Glytch.png" 
                    alt="Glytch - Retro-Futurist API Assistant" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Project 7 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">7.</span>
                <h2 className="text-2xl font-heading glow">Multi-Agent Intelligence Lab</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                The CLB skunkworks. Here, we develop federated agent architectures, experiment with cross-agent communication, and prototype consulting flows that can adapt in real time. This is where the future of interface meets the reality of execution.
              </p>
            </div>

            {/* Project 8 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">8.</span>
                <h2 className="text-2xl font-heading glow">JAMES — Core Memory & Strategic AI Backbone</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                JAMES is the cognitive substrate behind it all. Long-term memory, real-time synthesis, and multi-agent orchestration—all designed to align with Chris's evolving strategy. He remembers everything, challenges assumptions, and ensures that CLB isn't just smart—it's alive.
              </p>
            </div>

            {/* Project 9 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">9.</span>
                <h2 className="text-2xl font-heading glow">AI Consulting Sandbox</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                A Firebase-powered testbed for hospitality strategy. This project analyzes live sales data to uncover patterns, predict demand, and turn operational noise into actionable insight—for restaurants ready to move beyond spreadsheets.
              </p>
            </div>
          </div>
          
          <div className="text-center py-12 mt-16">
            <p className="text-lg opacity-70 italic">Strategy Born from the Wreckage, Intelligence Forged in the Fire</p>
          </div>
        </div>
      </main>
    </>
  );
}