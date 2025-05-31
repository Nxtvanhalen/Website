import ChatPanel from './ChatPanel';

export default function Marquee() {
  return (
    <div className="relative w-full min-h-screen overflow-visible animate-fade-in mb-16">
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: "url('/images/parallax-bg1.jpeg')",
          minHeight: '100vh'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" style={{ minHeight: '100vh' }} />
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
        <h1 className="text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 glow-subtle">
          Chris Lee Bergstrom
        </h1>
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
        <div className="mb-16 w-full max-w-6xl mx-auto px-4">
          <div className="gallery-container overflow-hidden">
            <div className="gallery-track-ticker flex gap-6">
              {/* First set of items */}
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
        </div>
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-heading mb-4">Ask EVE.</h3>
          <p className="text-lg leading-relaxed opacity-90">
            EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. AI should never replace the artist. It should empower the visionary.
          </p>
        </div>
        
        <p className="text-4xl font-heading mb-2 glow">
          EVE AI
        </p>
        <div className="w-full max-w-4xl mt-2 mb-2 bg-black/40 rounded-lg shadow-xl overflow-hidden border border-white" style={{ height: '50vh', minHeight: '350px' }}>
          <ChatPanel />
        </div>
        
      </div>
    </div>
  );
}