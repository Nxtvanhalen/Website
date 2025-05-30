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
      <div className="marquee-content scroll-fade relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-32 pb-16 text-center text-white">
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
        <div className="mb-8 max-w-4xl mx-auto">
          <p className="text-base font-body opacity-90 text-center leading-relaxed">
            AI and entertainment are already intertwined. I will help you navigate and harness this powerful tool. Try EVE below to see what the possibilities are.
          </p>
        </div>
        
        <p className="text-4xl font-heading mb-2 glow">
          EVE AI
        </p>
        <div className="w-full max-w-4xl mt-2 mb-8 bg-black/40 rounded-lg shadow-xl overflow-hidden border border-white" style={{ height: '50vh', minHeight: '350px' }}>
          <ChatPanel />
        </div>
        
        {/* Ask EVE section - moved from Ethos */}
        <div className="text-center mt-8 mb-16 max-w-3xl mx-auto">
          <h3 className="text-3xl font-heading mb-4">Ask EVE.</h3>
          <p className="text-lg leading-relaxed opacity-90">
            EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. AI should never replace the artist. It should empower the visionary.
          </p>
        </div>
      </div>
    </div>
  );
}