import ChatPanel from './ChatPanel';
import { useState, useEffect } from 'react';

export default function Marquee() {
  const [currentBox, setCurrentBox] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBox(prev => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const boxes = [
    {
      title: "AI Integrations",
      description: "Ask me about AI integrations that are multi-modal and multi-lingual for accessibility and efficiencies!",
      subject: "AI Project Inquiry - Multi-Modal Integration"
    },
    {
      title: "Cost Efficiency", 
      description: "Ask me about how I can save or generate your company 20-30 percent and set you up for the future of entertainment!",
      subject: "AI Project Inquiry - Cost Savings & Entertainment Future"
    },
    {
      title: "Team Building & Morale",
      description: "Morale is worth 30 percent and team cohesion is not only good for business, it's ethical and sustainable practices!",
      subject: "AI Project Inquiry - Team Building & Morale Solutions"
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-visible animate-fade-in mb-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMinYMin meet"
        className="absolute top-4 left-4 w-12 h-12 opacity-20 text-white overflow-visible"
      >
        <text x="0" y="200" fontSize="200" fill="currentColor">
          CLB
        </text>
      </svg>
      <div className="marquee-content scroll-fade relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-40 pb-16 text-center text-white">
        {/* Mobile Profile Picture - Above heading */}
        <div className="md:hidden mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full border border-molten/50 overflow-hidden bg-gradient-to-br from-molten/30 to-gray-700/50">
            <img 
              src="/images/profile/chris-profile.jpg" 
              alt="Chris Lee Bergstrom" 
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-molten text-sm font-bold">CB</span>
            </div>
          </div>
        </div>
        
        {/* Chris Lee Bergstrom heading with CTA box */}
        <div className="w-full mb-6">
          <h2 className="text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 glow-subtle text-center">
            Chris Lee Bergstrom
          </h2>
          
          {/* Call-to-action box - always centered */}
          <div className="flex justify-center">
            <div 
              className="bg-black/30 border-2 border-molten rounded-lg p-4 w-[220px] backdrop-blur-sm shadow-lg"
              role="region"
              aria-label="Rotating consultation offers"
              aria-live="polite"
            >
              <div 
                key={currentBox}
                className="animate-crossfade"
              >
                <div className="text-sm text-molten font-bold mb-2">{boxes[currentBox].title}</div>
                <div className="text-xs text-white/90 mb-3">{boxes[currentBox].description}</div>
                <a 
                  href={`mailto:chrisleebergstrom@gmail.com?subject=${boxes[currentBox].subject}`}
                  className="block w-full py-2 px-3 bg-transparent border border-molten text-molten text-xs rounded hover:bg-molten/10 hover:text-white transition-all text-center focus:outline-none focus:ring-2 focus:ring-molten focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={`Contact Chris about ${boxes[currentBox].title} - ${boxes[currentBox].description}`}
                >
                  Let's Talk Strategy
                </a>
                <div className="text-xs text-white/60 mt-1">chrisleebergstrom@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xl font-body italic text-center mb-8 max-w-2xl opacity-90">
          "The advancement of the arts is directly related to the advancement of society"
        </p>
        
        {/* Experience paragraph with pulsing line - Mobile responsive */}
        <div className="relative mb-16 mx-auto max-w-4xl px-4">
          <p className="text-base font-body opacity-90 text-center leading-relaxed">
            With two decades of global live entertainment experience—from arenas to civic halls—Chris brings strategy grounded in lived reality, not theory. From backstage operations to AI strategy, he translates hard-earned wisdom into solutions that work under pressure.
          </p>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-molten block animate-pulse-width w-32" />
        </div>

        {/* Horizontal scrolling gallery - ticker style */}
        <section 
          className="mb-16 w-full max-w-6xl mx-auto px-4"
          aria-label="Portfolio gallery showcasing Chris's projects"
        >
          <div className="gallery-container overflow-hidden">
            <div 
              className="gallery-track-ticker flex gap-6"
              role="img"
              aria-label="Scrolling gallery of project screenshots and portfolio images"
            >
              {/* First set of items */}
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img 
                  src="/images/gallery/Project1.webp" 
                  alt="Project 1 - CLB Consultancy portfolio showcase" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project2.webp" alt="Project 2" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project3.webp" alt="Project 3" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project4.webp" alt="Project 4" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project5.webp" alt="Project 5" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project6.webp" alt="Project 6" className="w-full h-full object-cover" />
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project1.webp" alt="Project 1" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project2.webp" alt="Project 2" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project3.webp" alt="Project 3" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project4.webp" alt="Project 4" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project5.webp" alt="Project 5" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-item flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden">
                <img src="/images/gallery/Project6.webp" alt="Project 6" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
        <section 
          className="mb-8 max-w-3xl mx-auto text-center" 
          id="eve-chat"
          aria-labelledby="eve-heading"
        >
          <h3 id="eve-heading" className="text-3xl font-heading mb-4">Ask EVE.</h3>
          <p className="text-lg leading-relaxed opacity-90 mb-6">
            EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. AI should never replace the artist. It should empower the visionary.
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
              <img 
                src="/images/projects/EVE.png" 
                alt="EVE AI avatar - A sophisticated conversational AI assistant for strategic consulting" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </section>
        
        <h4 id="eve-ai-heading" className="text-4xl font-heading mb-2 glow">
          EVE AI
        </h4>
        <div 
          className="w-full max-w-4xl mt-2 mb-2 bg-black/40 rounded-lg shadow-xl overflow-hidden border border-white" 
          style={{ height: '50vh', minHeight: '350px' }}
          role="application"
          aria-label="EVE AI Chat Interface - Interactive conversational AI for consulting inquiries"
        >
          <ChatPanel />
        </div>
        
      </div>
    </div>
  );
}