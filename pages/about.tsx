import Head from 'next/head';
import { useEffect } from 'react';
import Header from '../components/Header';

export default function About() {
  useEffect(() => {
    // Parallax scroll effect for About page
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.about-parallax-bg') as HTMLElement;
      
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
        <title>About Chris - CLB Consultancy</title>
        <meta name="description" content="Learn about Chris Lee Bergstrom's background and experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      
      <Header />

      {/* Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div 
          className="about-parallax-bg absolute inset-0 bg-center bg-cover bg-fixed"
          style={{
            backgroundImage: "url('/images/Hopper.jpg')",
            minHeight: '120vh'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>
      
      <main className="min-h-screen bg-transparent text-white pt-40 px-6 relative z-10">
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
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-molten text-xs md:text-sm font-bold">PROFILE PIC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading mb-4 glow-subtle">Core Expertise</h2>
              <p className="text-lg text-molten/80 max-w-2xl mx-auto">Two decades of experience spanning live entertainment, AI systems, and cultural transformation</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Creative Leadership & Strategy */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold text-molten mb-4 glow">Creative Leadership & Strategy</h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li><span className="font-bold text-white">Grammy-Nominated Audio Engineer</span><br/>Deep experience in live sound, touring, and recording with top-tier artists</li>
                  <li><span className="font-bold text-white">Global Tour & Production Management</span><br/>Managed complex logistics and large teams across international venues and festivals</li>
                  <li><span className="font-bold text-white">Creative Director & Brand Strategist</span><br/>Spearheaded theatrical branding for CLB Consulting and tech platforms. Expert in building "narrative systems" that align tech with culture</li>
                  <li><span className="font-bold text-white">Public Speaker & Writer</span><br/>Known for clarity, poetic argument, and challenging cultural assumptions head-on</li>
                </ul>
              </div>

              {/* AI & Technical Systems */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold text-molten mb-4 glow">AI & Technical Systems</h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li><span className="font-bold text-white">AI Strategy & Ethical Tech Integration</span><br/>Founder of tools like EVA, Byte, and JAMES. Advocates for culturally sensitive AI that empowers rather than extracts</li>
                  <li><span className="font-bold text-white">AI Systems Developer (Multi-Agent Architect)</span><br/>Architect behind JAMES (multi-agent LLM symphony), Byte (voice-to-voice bot), and EVA (Events Virtual Assistant) ecosystems</li>
                  <li><span className="font-bold text-white">Technical Systems Designer</span><br/>Specialist in backstage operations, automation, safety protocols, and venue sustainability</li>
                </ul>
              </div>

              {/* Audio Engineering & Infrastructure */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold text-molten mb-4 glow">Audio Engineering & Infrastructure</h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li><span className="font-bold text-white">Professional Audio Systems</span><br/>Dante Networking & Routing, Shure Wireless Systems (Axient, ULX-D)</li>
                  <li><span className="font-bold text-white">Sound Design & Programming</span><br/>QLab Programming, Waves Plugins & Live Mixing Integration</li>
                  <li><span className="font-bold text-white">Advanced Audio Technologies</span><br/>Spatial Audio Systems, Dolby Atmos, RF Coordination & Frequency Management</li>
                </ul>
              </div>

              {/* Social Impact & Operations */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold text-molten mb-4 glow">Social Impact & Operations</h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li><span className="font-bold text-white">Equity & Labor Advocacy</span><br/>Pushed for inclusive practices, backstage dignity, and systemic change in the arts sector</li>
                  <li><span className="font-bold text-white">Climate & Sustainability Champion</span><br/>Embedded green principles into production workflows and citywide venue strategies</li>
                  <li><span className="font-bold text-white">Complex Logistics Management</span><br/>Touring logistics (Carnet, Visas, Advances), Emergency Planning & Safety Protocols</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 mt-16">
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