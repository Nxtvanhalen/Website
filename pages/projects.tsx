import Head from 'next/head';
import { useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import SectionTracker from '../components/SectionTracker';

export default function Projects() {
  // ... (useEffect)

  return (
    <>
      <Head>
        <title>Projects - CLB Consulting | AI & Entertainment Tech</title>
        <meta name="description" content="Explore CLB Consulting's projects in AI, entertainment technology, and system architecture. Featuring Master Tour, EVA, Ryder, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Projects - CLB Consulting | AI & Entertainment Tech" />
        <meta property="og:description" content="Explore CLB Consulting's projects in AI, entertainment technology, and system architecture. Featuring Master Tour, EVA, Ryder, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/projects" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@chrisleebergstrom" />
        <meta name="twitter:creator" content="@chrisleebergstrom" />
        <meta name="twitter:title" content="Projects - CLB Consulting | AI & Entertainment Tech" />
        <meta name="twitter:description" content="Explore CLB Consulting's projects in AI, entertainment technology, and system architecture. Featuring Master Tour, EVA, Ryder, and more." />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant" />

        {/* Canonical URL */}
        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/projects" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Projects - CLB Consulting",
              "description": "Showcase of AI and entertainment technology projects by CLB Consulting",
              "url": "https://chrisleebergstrom.com/projects",
              "author": {
                "@type": "Person",
                "@id": "https://chrisleebergstrom.com/about#person",
                "name": "Chris Lee Bergstrom"
              },
              "about": {
                "@type": "Organization",
                "@id": "https://chrisleebergstrom.com/#organization",
                "name": "CLB Consulting"
              },
              "hasPart": [
                {
                  "@type": "SoftwareApplication",
                  "name": "Master Tour Venue",
                  "applicationCategory": "BusinessApplication",
                  "description": "The next evolution of tech pack data for venues and artists"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "AI Powered Remote SPL",
                  "applicationCategory": "UtilityApplication",
                  "description": "Cloud-based SPL monitoring for events and construction"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "EVA — Events Virtual Assistant",
                  "applicationCategory": "BusinessApplication",
                  "description": "Logistics, routing, and crew management AI"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "R.Y.D.E.R.",
                  "applicationCategory": "HealthApplication",
                  "description": "Mental Health AI for Creatives"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "EVE",
                  "applicationCategory": "Bot",
                  "description": "Conversational AI for CLB Consulting"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Byte",
                  "applicationCategory": "Bot",
                  "description": "Voice-to-Voice Semantic Research Agent"
                }
              ]
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
            <p className="text-xl font-bold" style={{ color: '#F5F5DC' }}>CLB Consulting</p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {/* Project 1 */}
            <SectionTracker
              name="Projects - Master Tour"
              butlerMessage="Master Tour is the industry standard. Chris is helping shape its venue-side evolution."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-[#FF0000]/50 p-8 hover:border-[#FF0000] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.1)] hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#FF0000', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>Master Tour</h2>
                    <p className="text-base leading-relaxed opacity-90 mb-3" style={{ color: '#F5F5DC' }}>
                      The next evolution of tech pack data for venues and artists 🎸. Beta testing and consulting on the rollout 🚀.
                    </p>
                    <a
                      href="https://www.eventric.com/master-tour-venue/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:text-white transition-colors duration-200 text-sm"
                      style={{ color: '#FF0000' }}
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
                      style={{ objectPosition: '50% 30%' }}
                      quality={75}
                    />
                  </div>
                </div>
              </div>
            </SectionTracker>

            {/* Project 2 */}
            <SectionTracker
              name="Projects - Remote SPL"
              butlerMessage="Sound levels matter. We're using AI to monitor them remotely. Keeps the neighbors happy."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-1" style={{ color: '#F5F5DC' }}>AI Powered Remote SPL</h2>
                    <div className="text-sm font-normal mb-3" style={{ color: '#F5F5DC', opacity: 0.6 }}>(Sound Pressure Level)</div>
                    <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                      Cloud-based SPL monitoring for events and construction 🏗️. Real-time tracking, compliance analytics, and predictive insights 🔊.
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
            </SectionTracker>

            {/* Project 2 */}
            <SectionTracker
              name="Projects - EVA"
              butlerMessage="EVA is the logistics brain. She handles the details so humans can handle the show."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#F5F5DC' }}>EVA — Events Virtual Assistant</h2>
                    <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                      The orchestration core 🧠. Managing logistics, routing, and crews for the entertainment industry 🎬. Customizable, scalable, show-ready ✨.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
                    <Image
                      src="/images/EVA2.JPG"
                      alt="EVA - Events Virtual Assistant"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top scale-125"
                      quality={75}
                    />
                  </div>
                </div>
              </div>
            </SectionTracker>

            {/* Project 3 */}
            <SectionTracker
              name="Projects - Ryder"
              butlerMessage="Ryder is special. A safe space for creatives to check in. Want to try a session?"
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-[#00ff00]/50 p-8 hover:border-[#00ff00] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,0,0.1)] hover:shadow-[0_0_25px_rgba(0,255,0,0.2)]">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#00ff00', textShadow: '0 0 10px rgba(0,255,0,0.5)' }}>R.Y.D.E.R. — Mental Health AI for Creatives</h2>
                    <p className="text-base leading-relaxed opacity-90 mb-3" style={{ color: '#F5F5DC' }}>
                      Trauma-aware AI for the industry 🖤. Anonymous, reflective, and emotionally attuned. Not therapy—a check-in with soul 🛡️.
                    </p>
                    <a
                      href="https://ryder-k6er.onrender.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:text-white transition-colors duration-200 text-sm"
                      style={{ color: '#00ff00' }}
                    >
                      Chat with Ryder now! →
                    </a>
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
            </SectionTracker>

            {/* Project 4 */}
            <SectionTracker
              name="Projects - EVE"
              butlerMessage="That's me. I'm the front-of-house. The others run the back-of-house."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#F5F5DC' }}>EVE — Conversational AI for CLB</h2>
                    <p className="text-base leading-relaxed opacity-90 mb-3" style={{ color: '#F5F5DC' }}>
                      Velvet rope meets sharp strategy 🍸. Guides visitors, sparks insights, and converts interest. Part concierge, part co-pilot 🚁.
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
            </SectionTracker>

            {/* Project 5 */}
            <SectionTracker
              name="Projects - Byte"
              butlerMessage="Byte is a research beast. It listens, reads, and synthesizes. Like a super-librarian."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#F5F5DC' }}>Byte — Voice-to-Voice Semantic Research Agent</h2>
                    <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                      Voice-native AI for deep research 🗣️. File parsing, archival search, and contextual synthesis. Speaks with clarity, thinks with nuance 🔬.
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
            </SectionTracker>

            {/* Project 6 */}
            <SectionTracker
              name="Projects - Glytch"
              butlerMessage="Glytch is... unique. A retro-futurist interface for creative sparks. Sometimes it has an attitude."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading mb-3" style={{ color: '#F5F5DC' }}>Glytch — Retro-Futurist API Assistant</h2>
                    <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                      Retro-futurist API assistant in a vintage iMac 🖥️. Channeling TARS for creative ideation and irreverent insights 👾.
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
            </SectionTracker>

            {/* Project 7 */}
            <SectionTracker
              name="Projects - Multi-Agent Lab"
              butlerMessage="This is where we experiment. Agents talking to agents. It gets wild."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="mb-4">
                  <h2 className="text-2xl font-heading" style={{ color: '#F5F5DC' }}>Multi-Agent Intelligence Lab</h2>
                </div>
                <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                  The CLB skunkworks 🧪. Prototyping federated agents and real-time consulting flows. Future interface, real execution ⚡.
                </p>
              </div>
            </SectionTracker>

            {/* Project 8 */}
            <SectionTracker
              name="Projects - JAMES"
              butlerMessage="JAMES is the memory. The backbone. He remembers everything so we don't have to."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="mb-4">
                  <h2 className="text-2xl font-heading" style={{ color: '#F5F5DC' }}>JAMES — Core Memory & Strategic AI Backbone</h2>
                </div>
                <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                  The cognitive backbone 🧠. Long-term memory and multi-agent orchestration. Ensuring CLB isn't just smart—it's alive 🧬.
                </p>
              </div>
            </SectionTracker>

            {/* Project 9 */}
            <SectionTracker
              name="Projects - Sandbox"
              butlerMessage="Testing ground for hospitality AI. Real data, real insights."
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
                <div className="mb-4">
                  <h2 className="text-2xl font-heading" style={{ color: '#F5F5DC' }}>AI Consulting Sandbox</h2>
                </div>
                <p className="text-base leading-relaxed opacity-90" style={{ color: '#F5F5DC' }}>
                  Firebase-powered hospitality strategy 🍽️. Analyzing sales data to predict demand and turn noise into insight 📈.
                </p>
              </div>
            </SectionTracker>
          </div>

          <div className="text-center py-12 mt-16">
            <p className="text-lg opacity-70 italic" style={{ color: '#F5F5DC' }}>Strategy Born from the Wreckage, Intelligence Forged in the Fire</p>
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
                    <div className="text-lg font-bold" style={{ color: '#F5F5DC' }}>Ready to go?</div>
                    <div className="text-sm opacity-80" style={{ color: '#F5F5DC' }}>chrisleebergstrom@gmail.com</div>
                  </div>
                </a>
                <p className="text-sm flex items-center justify-center space-x-2" style={{ color: '#F5F5DC', opacity: 0.7 }}>
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