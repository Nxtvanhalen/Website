import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Header from '../components/Header';
import { motion } from 'motion/react';
import SectionTracker from '../components/SectionTracker';

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
        <title>About Chris Lee Bergstrom | Sound Engineer to AI Strategist - CLB Consulting</title>
        <meta name="description" content="From live sound engineering to AI systems architecture. Two decades of global entertainment experience. The origin story behind CLB Consulting." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Chris Lee Bergstrom" />
        <meta name="keywords" content="Chris Lee Bergstrom, audio engineer, AI strategist, live sound, entertainment technology, CLB Consulting, Grammy nominated, tour management, systems architecture" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9370DB" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="About Chris Lee Bergstrom | Sound Engineer to AI Strategist - CLB Consulting" />
        <meta property="og:description" content="From live sound engineering to AI systems architecture. Two decades of global entertainment experience. The origin story behind CLB Consulting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/about" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Chris Lee Bergstrom | Sound Engineer to AI Strategist - CLB Consulting" />
        <meta name="twitter:description" content="From live sound engineering to AI systems architecture. Two decades of global entertainment experience. The origin story behind CLB Consulting." />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square-2.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/about" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "@id": "https://chrisleebergstrom.com/about#person",
                "name": "Chris Lee Bergstrom",
                "alternateName": ["Chris Bergstrom", "CLB"],
                "jobTitle": "AI Strategy Consultant & Founder of CLB Consulting",
                "description": "Grammy-nominated audio engineer turned AI consultant specializing in entertainment technology and live events. Founder and principal consultant at CLB Consulting.",
                "image": "https://chrisleebergstrom.com/images/profile/chris-profile.jpg",
                "email": "chrisleebergstrom@gmail.com",
                "worksFor": {
                  "@type": "Organization",
                  "@id": "https://chrisleebergstrom.com/#organization",
                  "name": "CLB Consulting"
                },
                "founder": {
                  "@type": "Organization",
                  "@id": "https://chrisleebergstrom.com/#organization",
                  "name": "CLB Consulting"
                },
                "hasCredential": "Grammy-nominated Audio Engineer",
                "knowsAbout": [
                  "AI Implementation",
                  "Entertainment Industry",
                  "Audio Engineering",
                  "Live Sound Production",
                  "Tour Management",
                  "Multi-Modal AI Systems",
                  "Team Cohesion Strategies",
                  "SMAART System Analysis and Training"
                ],
                "sameAs": [
                  "https://www.linkedin.com/in/chris-bergstrom",
                  "https://www.instagram.com/chrisleebergstrom",
                  "https://www.youtube.com/@chrisleebergstrom",
                  "https://www.facebook.com/share/15a8S2BF9S/?mibextid=wwXIfr"
                ]
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://chrisleebergstrom.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About",
                    "item": "https://chrisleebergstrom.com/about"
                  }
                ]
              }
            })
          }}
        />
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

      <main className="min-h-screen bg-transparent text-white pt-24 md:pt-52 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionTracker
            name="About - Profile"
            butlerMessage="Chris has worn many hats. Audio engineer, tour manager, strategist. It all connects."
          >
            <div className="relative mb-16">
              <div className="text-center">
                <motion.h1
                  className="text-4xl md:text-5xl font-heading mb-4 glow-subtle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Chris Lee Bergstrom
                </motion.h1>
              </div>

              {/* Profile Picture */}
              <div className="flex justify-center md:absolute md:right-0 md:top-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-molten/50 overflow-hidden bg-gradient-to-br from-molten/30 to-gray-700/50">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-top"
                  >
                    <source src="/videos/cbai-profile-v2.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </SectionTracker>

          {/* Bio Section */}
          <SectionTracker
            name="About - Bio"
            butlerMessage="This is the origin story. Sound engineer to systems architect. Signal in the noise."
          >
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-base font-body opacity-90 leading-relaxed space-y-6" style={{ color: '#F5F5DC' }}>
                <p className="font-semibold text-xl italic text-center">
                  "I build systems where art and technology work together"
                </p>
                <p className="text-center max-w-3xl mx-auto">
                  I started in the deep end of live sound, chasing perfect harmony, phase, and the science of acoustics. Decades later, I've led crews, built production infrastructures, and rescued venues from chaos. Whether it's an international tour, a citywide cultural system, or a failing arts organization, I find the signal in the noise and make it sing.
                </p>

                {/* XL4 Image Section */}
                <div className="w-full max-w-sm mx-auto my-6">
                  <motion.div
                    className="border-none rounded-none bg-transparent cursor-pointer"
                    style={{
                      mask: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                      maskComposite: 'intersect',
                      WebkitMask: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                      WebkitMaskComposite: 'source-in'
                    }}
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Image
                      src="/images/XL4.webp"
                      alt="Colorado State Fair - Mixing for Tracy Lawrence"
                      width={256}
                      height={144}
                      className="w-full h-auto border-none rounded-none bg-transparent"
                      quality={85}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </motion.div>
                  <p className="text-center text-sm italic mt-2" style={{ color: '#F5F5DC', opacity: 0.85 }}>
                    Colorado State Fair mixing for Tracy Lawrence
                  </p>
                </div>

                {/* PNW Image Section */}
                <div className="w-full max-w-sm mx-auto my-6">
                  <motion.div
                    className="border-none rounded-none bg-transparent cursor-pointer"
                    style={{
                      mask: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                      maskComposite: 'intersect',
                      WebkitMask: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                      WebkitMaskComposite: 'source-in'
                    }}
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Image
                      src="/images/PNW.webp"
                      alt="A person walks into shallow ocean waves on a wide, reflective beach under a clear blue sky. Small shorebirds gather along the wet sand in the foreground, while colorful kites from kite surfers float above the choppy water in the distance, creating a calm coastal scene."
                      width={256}
                      height={144}
                      className="w-full h-auto border-none rounded-none bg-transparent"
                      quality={85}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </motion.div>
                  <p className="text-center text-sm italic mt-2" style={{ color: '#F5F5DC', opacity: 0.85 }}>
                    Pacific Northwest pic by Chris Lee Bergstrom
                  </p>
                </div>
              </div>
            </motion.div>
          </SectionTracker>

          {/* Skills Section */}
          <SectionTracker
            name="About - Skills"
            butlerMessage="From touring the world to architecting AI systems. The skillset is... eclectic."
          >
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading mb-4 glow-subtle">Core Expertise</h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: '#F5F5DC' }}>Two decades of experience spanning live entertainment, AI systems, and cultural transformation</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Creative Leadership & Strategy */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: 0 }}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5DC' }}>Creative Leadership & Strategy</h3>
                  <ul className="space-y-2 text-sm leading-relaxed" style={{ color: '#F5F5DC' }}>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Global Tour & Production Management</span><br />Managed complex logistics and large teams across international venues and festivals</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Creative Director & Brand Strategist</span><br />Spearheaded theatrical branding for CLB Consulting and tech platforms. Expert in building "narrative systems" that align tech with culture</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Public Speaker & Writer</span><br />Known for clarity, poetic argument, and challenging cultural assumptions head-on</li>
                  </ul>
                </motion.div>

                {/* AI & Technical Systems */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5DC' }}>AI & Technical Systems</h3>
                  <ul className="space-y-2 text-sm leading-relaxed" style={{ color: '#F5F5DC' }}>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>AI Strategy & Ethical Tech Integration</span><br />Founder of tools like EVA, Byte, and JAMES. Advocates for culturally sensitive AI that empowers rather than extracts</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>AI Systems Developer (Multi-Agent Architect)</span><br />Architect behind JAMES (multi-agent LLM symphony), Byte (voice-to-voice bot), and EVA (Events Virtual Assistant) ecosystems</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Technical Systems Designer</span><br />Specialist in backstage operations, automation, safety protocols, and venue sustainability</li>
                  </ul>
                </motion.div>

                {/* Audio Engineering & Infrastructure */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5DC' }}>Audio Engineering & Infrastructure</h3>
                  <ul className="space-y-2 text-sm leading-relaxed" style={{ color: '#F5F5DC' }}>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Professional Audio Systems</span><br />Dante Networking & Routing, Shure Wireless Systems (Axient, ULX-D), SMAART System Analysis and Training</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Sound Design & Programming</span><br />QLab Programming, Waves Plugins & Live Mixing Integration</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Advanced Audio Technologies</span><br />Spatial Audio Systems, Dolby Atmos, RF Coordination & Frequency Management</li>
                  </ul>
                </motion.div>

                {/* Social Impact & Operations */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-molten/30 p-6 hover:border-molten/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5DC' }}>Social Impact & Operations</h3>
                  <ul className="space-y-2 text-sm leading-relaxed" style={{ color: '#F5F5DC' }}>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Equity & Labor Advocacy</span><br />Pushed for inclusive practices, backstage dignity, and systemic change in the arts sector</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Climate & Sustainability Champion</span><br />Embedded green principles into production workflows and citywide venue strategies</li>
                    <li><span className="font-bold" style={{ color: '#F5F5DC' }}>Complex Logistics Management</span><br />Touring logistics (Carnet, Visas, Advances), Emergency Planning & Safety Protocols</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </SectionTracker>


          <div className="text-center py-16 mt-16">
            <p className="text-xl italic font-heading" style={{ color: '#F5F5DC', opacity: 0.8 }}>Strategy Born from the Wreckage, Intelligence Forged in the Fire</p>
            <div className="mt-8">
              <span className="block h-0.5 bg-molten w-32 mx-auto animate-pulse-width"></span>
            </div>
          </div>

          {/* Contact Section */}
          <SectionTracker name="About - Contact">
            <section className="py-12 px-6 text-center">
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
                  <p className="text-sm text-molten/70">
                    Let's discuss your project needs
                  </p>
                </div>
              </div>
            </section>
          </SectionTracker>
        </div>
      </main>
    </>
  );
}