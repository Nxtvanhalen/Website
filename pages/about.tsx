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
        <meta name="theme-color" content="#9370DB" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="About Chris Lee Bergstrom - CLB Consultancy" />
        <meta property="og:description" content="Grammy-nominated audio engineer turned AI consultant specializing in entertainment technology and live events" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/about" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Chris Lee Bergstrom - CLB Consultancy" />
        <meta name="twitter:description" content="Grammy-nominated audio engineer turned AI consultant specializing in entertainment technology and live events" />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
      </Head>
      
      <Header />

      {/* Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div 
          className="about-parallax-bg absolute inset-0 bg-center bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/images/Hopper.jpg')",
            minHeight: '120vh'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
      </div>
      
      <main className="min-h-screen bg-transparent text-white pt-52 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
            <div className="text-center flex-1 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-heading mb-4 glow-subtle">Chris Lee Bergstrom</h1>
              <p className="text-xl md:text-2xl font-bold italic" style={{color: '#F5F5DC'}}>doesn't just consult—he orchestrates.</p>
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
              <p className="text-lg max-w-2xl mx-auto" style={{color: '#F5F5DC'}}>Two decades of experience spanning live entertainment, AI systems, and cultural transformation</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Creative Leadership & Strategy */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4" style={{color: '#F5F5DC'}}>Creative Leadership & Strategy</h3>
                <ul className="space-y-2 text-sm leading-relaxed" style={{color: '#F5F5DC'}}>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Grammy-Nominated Audio Engineer</span><br/>Deep experience in live sound, touring, and recording with top-tier artists</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Global Tour & Production Management</span><br/>Managed complex logistics and large teams across international venues and festivals</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Creative Director & Brand Strategist</span><br/>Spearheaded theatrical branding for CLB Consulting and tech platforms. Expert in building "narrative systems" that align tech with culture</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Public Speaker & Writer</span><br/>Known for clarity, poetic argument, and challenging cultural assumptions head-on</li>
                </ul>
              </div>

              {/* AI & Technical Systems */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4" style={{color: '#F5F5DC'}}>AI & Technical Systems</h3>
                <ul className="space-y-2 text-sm leading-relaxed" style={{color: '#F5F5DC'}}>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>AI Strategy & Ethical Tech Integration</span><br/>Founder of tools like EVA, Byte, and JAMES. Advocates for culturally sensitive AI that empowers rather than extracts</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>AI Systems Developer (Multi-Agent Architect)</span><br/>Architect behind JAMES (multi-agent LLM symphony), Byte (voice-to-voice bot), and EVA (Events Virtual Assistant) ecosystems</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Technical Systems Designer</span><br/>Specialist in backstage operations, automation, safety protocols, and venue sustainability</li>
                </ul>
              </div>

              {/* Audio Engineering & Infrastructure */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4" style={{color: '#F5F5DC'}}>Audio Engineering & Infrastructure</h3>
                <ul className="space-y-2 text-sm leading-relaxed" style={{color: '#F5F5DC'}}>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Professional Audio Systems</span><br/>Dante Networking & Routing, Shure Wireless Systems (Axient, ULX-D)</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Sound Design & Programming</span><br/>QLab Programming, Waves Plugins & Live Mixing Integration</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Advanced Audio Technologies</span><br/>Spatial Audio Systems, Dolby Atmos, RF Coordination & Frequency Management</li>
                </ul>
              </div>

              {/* Social Impact & Operations */}
              <div className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4" style={{color: '#F5F5DC'}}>Social Impact & Operations</h3>
                <ul className="space-y-2 text-sm leading-relaxed" style={{color: '#F5F5DC'}}>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Equity & Labor Advocacy</span><br/>Pushed for inclusive practices, backstage dignity, and systemic change in the arts sector</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Climate & Sustainability Champion</span><br/>Embedded green principles into production workflows and citywide venue strategies</li>
                  <li><span className="font-bold" style={{color: '#F5F5DC'}}>Complex Logistics Management</span><br/>Touring logistics (Carnet, Visas, Advances), Emergency Planning & Safety Protocols</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 mt-16">
            {/* Main introduction */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <p className="text-lg leading-relaxed mb-6" style={{color: '#F5F5DC'}}>
                With over <span className="font-bold" style={{color: '#F5F5DC'}}>two decades</span> in live entertainment, civic innovation, and creative systems design, Chris moves across industries with precision. He's led festivals, run city-wide cultural programs, built award-winning shows, and now architects AI systems that think with soul.
              </p>
            </div>

            {/* Philosophy section */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <p className="text-lg leading-relaxed mb-6" style={{color: '#F5F5DC'}}>
                Chris works where <span className="glow">vision meets logistics</span>—designing strategies that are <em>lived</em>, not theorized. From backstage to boardroom, his approach blends clarity, challenge, and just enough chaos to break something open.
              </p>
            </div>

            {/* Core promise */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <p className="text-lg leading-relaxed" style={{color: '#F5F5DC'}}>
                He's not here to impress you. He's here to <span className="font-bold" style={{color: '#F5F5DC'}}>reframe the problem</span>, <span className="font-bold" style={{color: '#F5F5DC'}}>build the architecture</span>, and leave you with a better system than you had before.
              </p>
            </div>
          </div>
          
          <div className="text-center py-16 mt-16">
            <p className="text-xl italic font-heading" style={{color: '#F5F5DC', opacity: 0.8}}>Strategy Born from the Wreckage, Intelligence Forged in the Fire</p>
            <div className="mt-8">
              <span className="block h-0.5 bg-molten w-32 mx-auto animate-pulse-width"></span>
            </div>
          </div>

          {/* Contact Section */}
          <section className="py-12 px-6 text-center">
            <h2 className="text-3xl font-heading mb-6" style={{color: '#F5F5DC'}}>Let's start discussing how I can set you up for success.</h2>
            <div className="max-w-lg mx-auto space-y-6">
              <div className="space-y-4">
                <a 
                  href="mailto:chrisleebergstrom@gmail.com?subject=AI Project Inquiry - Let's Build Something Amazing"
                  className="group block relative overflow-hidden py-4 px-8 bg-transparent text-white font-bold rounded-lg border border-molten hover:border-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <div className="relative flex flex-col items-center justify-center text-center">
                    <div className="text-lg font-bold">Ready to go?</div>
                    <div className="text-sm opacity-80">chrisleebergstrom@gmail.com</div>
                  </div>
                </a>
                <p className="text-sm text-molten/70 flex items-center justify-center space-x-2">
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