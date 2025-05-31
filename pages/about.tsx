import Head from 'next/head';
import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Head>
        <title>About Chris - CLB Consultancy</title>
        <meta name="description" content="Learn about Chris Lee Bergstrom's background and experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
            <div className="text-center flex-1 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-heading mb-4 glow-subtle">Chris Lee Bergstrom</h1>
              <p className="text-xl md:text-2xl text-molten font-bold italic">doesn't just consult—he orchestrates.</p>
            </div>
            
            {/* Profile Picture */}
            <div className="md:ml-12 flex-shrink-0 flex justify-center md:justify-end">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-molten/50 overflow-hidden bg-gradient-to-br from-molten/30 to-gray-700/50">
                <img 
                  src="/images/profile/chris-profile.jpg" 
                  alt="Chris Lee Bergstrom Profile" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-molten text-xs md:text-sm font-bold">PROFILE PIC</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Main introduction */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <p className="text-lg leading-relaxed mb-6">
                With over <span className="text-molten font-bold">two decades</span> in live entertainment, civic innovation, and creative systems design, Chris moves across industries with precision. He's led festivals, run city-wide cultural programs, built award-winning shows, and now architects AI systems that think with soul.
              </p>
            </div>

            {/* Philosophy section */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <p className="text-lg leading-relaxed mb-6">
                Chris works where <span className="glow">vision meets logistics</span>—designing strategies that are <em>lived</em>, not theorized. From backstage to boardroom, his approach blends clarity, challenge, and just enough chaos to break something open.
              </p>
            </div>

            {/* Core promise */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <p className="text-lg leading-relaxed">
                He's not here to impress you. He's here to <span className="text-molten font-bold">reframe the problem</span>, <span className="text-molten font-bold">build the architecture</span>, and leave you with a better system than you had before.
              </p>
            </div>
          </div>
          
          <div className="text-center py-16 mt-16">
            <p className="text-xl opacity-80 italic font-heading">Strategy Born from the Wreckage, Intelligence Forged in the Fire</p>
            <div className="mt-8">
              <span className="block h-0.5 bg-molten w-32 mx-auto animate-pulse-width"></span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}