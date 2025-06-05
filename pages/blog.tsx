import Head from 'next/head';
import Header from '../components/Header';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Strategic Musings - CLB Consultancy Blog | AI Insights & Industry Analysis</title>
        <meta name="description" content="Strategic insights, AI analysis, and industry musings from CLB Consultancy. Explore our thoughts on entertainment technology, team dynamics, and systems thinking." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Strategic Musings - CLB Consultancy Blog | AI Insights & Industry Analysis" />
        <meta property="og:description" content="Strategic insights and industry musings on AI, entertainment technology, and systems thinking from Chris Lee Bergstrom." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/blog" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/blog" />
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
              Strategic Musings
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              <span className="text-molten font-bold">Insights forged in the fire of real-world experience.</span> 
              Deep dives into AI strategy, entertainment technology, systems thinking, and the art of transformation.
            </p>
            <div className="h-0.5 bg-molten mx-auto w-32 animate-pulse-width"></div>
          </div>

          {/* Substack Integration Section */}
          <div className="bg-black/40 border border-molten/30 rounded-lg p-8 backdrop-blur-sm mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-heading mb-6 text-molten">
                Subscribe to Strategic Musings
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Get exclusive insights on AI strategy, entertainment technology, and systems thinking delivered directly to your inbox. 
                No corporate fluff—just raw intelligence from the trenches.
              </p>
              
              {/* Substack Embed/Link */}
              <div className="bg-black/60 border border-molten/20 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Ready for Strategy Born from the Wreckage?</h3>
                <p className="text-white/80 mb-6">
                  Join the conversation where theatrical meets tactical, where entertainment industry wisdom 
                  collides with cutting-edge AI strategy.
                </p>
                
                {/* Replace with your actual Substack URL */}
                <a 
                  href="https://your-substack-url.substack.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block py-4 px-8 bg-molten/20 border-2 border-molten text-white font-bold rounded-lg hover:bg-molten/30 hover:border-white transition-all duration-300 hover:scale-105 text-lg focus:outline-none focus:ring-2 focus:ring-molten/50"
                >
                  Subscribe on Substack →
                </a>
              </div>
              
              <p className="text-sm text-white/60">
                Free insights, premium analysis, zero corporate speak.
              </p>
            </div>
          </div>

          {/* Recent Topics Preview */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading mb-8 text-center text-white">
              What You'll Find in Strategic Musings
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/40 border border-molten/30 rounded-lg p-6 backdrop-blur-sm hover:border-molten/50 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-molten">AI Strategy Deep Dives</h3>
                <p className="text-white/90 leading-relaxed">
                  Multi-modal AI implementations, accessibility-first design, and why most AI consultants 
                  are solving the wrong problems entirely.
                </p>
              </div>
              
              <div className="bg-black/40 border border-molten/30 rounded-lg p-6 backdrop-blur-sm hover:border-molten/50 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-molten">Entertainment Industry Evolution</h3>
                <p className="text-white/90 leading-relaxed">
                  Live events, audio engineering insights, and how two decades in entertainment 
                  shapes better technology solutions.
                </p>
              </div>
              
              <div className="bg-black/40 border border-molten/30 rounded-lg p-6 backdrop-blur-sm hover:border-molten/50 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-molten">Systems Thinking</h3>
                <p className="text-white/90 leading-relaxed">
                  Infrastructure as culture, operational elegance, and why team cohesion 
                  is worth 30% of your bottom line.
                </p>
              </div>
              
              <div className="bg-black/40 border border-molten/30 rounded-lg p-6 backdrop-blur-sm hover:border-molten/50 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-molten">Tactical Intelligence</h3>
                <p className="text-white/90 leading-relaxed">
                  Real-world case studies, failure analysis, and strategies that actually work 
                  under pressure—not just in theory.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-black/40 border border-molten/30 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-heading mb-4 text-molten">Want to Discuss These Ideas?</h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Have thoughts on a piece? Questions about implementation? 
              Let's start a conversation that goes beyond surface-level consulting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:chrisleebergstrom@gmail.com?subject=Strategic Musings Discussion"
                className="inline-block py-3 px-8 bg-transparent border border-molten text-molten font-bold rounded hover:bg-molten/10 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-molten/50"
              >
                Start the Conversation
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