import ChatPanel from './ChatPanel';

export default function Marquee() {
  return (
    <div className="relative w-full h-screen overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: "url('/images/parallax-bg1.jpeg')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
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
      <div className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-32 text-center text-white">
        <h1 className="text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5">
          Chris Lee Bergstrom
        </h1>
        <p className="text-xl font-body italic text-center mb-8 max-w-2xl opacity-90">
          "The advancement of the arts is directly related to the advancement of society"
        </p>
        <div className="relative mb-16">
          <p className="text-2xl font-body opacity-90 inline-block">
            Consulting, Educating, Preserving
          </p>
          <span className="absolute bottom-0 left-0 h-0.5 bg-molten block animate-pulse-width" />
        </div>
        <p className="text-4xl font-heading mb-2 glow">
          EVE AI
        </p>
        <div className="w-full max-w-4xl h-[60vh] mt-2 bg-black/40 rounded-lg shadow-xl overflow-hidden border border-white">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}