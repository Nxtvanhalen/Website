import ChatPanel from './ChatPanel';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TypewriterText from './TypewriterText';
import { AnimatePresence, motion } from 'motion/react';

export default function Marquee() {
  const [currentBox, setCurrentBox] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const isUserInteractingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBox(prev => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll animation using setInterval for simplicity
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    // Wait for component to mount
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (galleryRef.current && !isUserInteractingRef.current) {
          const container = galleryRef.current;
          const currentScroll = container.scrollLeft;
          const scrollAmount = 1; // pixels per frame
          
          // Calculate max scroll before reset
          const itemWidth = 344; // 320px + 24px gap
          const totalItems = 9;
          const resetPoint = itemWidth * totalItems;
          
          if (currentScroll >= resetPoint) {
            // Reset to start
            container.scrollLeft = 0;
          } else {
            // Normal scroll
            container.scrollLeft = currentScroll + scrollAmount;
          }
        }
      }, 20); // Run every 20ms (50fps)
    }, 1000); // Wait 1 second before starting
    
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  // Touch/Mouse handlers
  const handleTouchStart = () => {
    setIsUserInteracting(true);
    isUserInteractingRef.current = true;
  };

  const handleTouchEnd = () => {
    // Small delay before resuming auto-scroll for natural feel
    setTimeout(() => {
      setIsUserInteracting(false);
      isUserInteractingRef.current = false;
    }, 1000); // Increased delay for better UX
  };

  // Prevent context menu on gallery images
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  // Gallery image component
  const GalleryImage = ({ src, alt }: { src: string; alt: string }) => {
    return (
      <div className="gallery-item-with-watermark flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden relative">
        <Image 
          src={src}
          alt={alt}
          width={320}
          height={240}
          className="w-full h-full object-cover"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          draggable={false}
          loading="lazy"
          quality={85}
          onError={(e) => {
            console.log('Image failed to load:', src);
            const target = e.target as HTMLImageElement;
            target.style.opacity = '0.3';
            target.style.background = '#333';
          }}
        />
        <div className="gallery-watermark">
          <Image 
            src="/images/Purple Logo.png" 
            alt="" 
            width={48}
            height={12}
            className="h-3 w-auto opacity-60" 
          />
        </div>
      </div>
    );
  };

  const boxes = [
    {
      title: "🔧 We rebuild broken systems — fast.",
      description: "Efficient, scalable, human-centered solutions that transform disorganized operations into cohesive, high-performing systems.",
      subject: "Systems Rebuild Inquiry"
    },
    {
      title: "🎭 Where art meets infrastructure.",
      description: "From touring operations to cultural institutions, we design frameworks that let creativity thrive — blending technical precision with artistic vision.",
      subject: "Creative Infrastructure Inquiry"
    },
    {
      title: "🚀 Future-proof your live experience.",
      description: "AI tools, optimized workflows, sustainable tech — we help you evolve your organization before the industry leaves you behind.",
      subject: "Future-Proofing Inquiry"
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
      <div className="marquee-content scroll-fade relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-52 pb-16 text-center text-white">
        {/* Mobile Profile Picture - Above heading */}
        <div className="md:hidden mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full border border-molten/50 overflow-hidden bg-gradient-to-br from-molten/30 to-gray-700/50 relative">
            <Image 
              src="/images/profile/chris-profile.jpg" 
              alt="Chris Lee Bergstrom" 
              width={80}
              height={80}
              className="w-full h-full object-cover object-top"
              priority
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
              <span className="text-sm font-bold" style={{color: '#F5F5DC'}}>CB</span>
            </div>
          </div>
        </div>
        
        {/* Chris Lee Bergstrom heading with CTA box */}
        <div className="w-full mb-6">
          <h2 className="text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 text-center">
            <TypewriterText 
              text="Chris Lee Bergstrom"
              className="glow-subtle"
              speed={100}
              delay={500}
              showCursor={true}
            />
          </h2>
          
          {/* Three boxes layout */}
          <div className="flex justify-center items-stretch gap-4 flex-wrap lg:flex-nowrap">
            {/* Left box */}
            <div
              className="bg-black/30 border-2 border-purple-400 rounded-lg p-4 w-[220px] h-[240px] backdrop-blur-sm shadow-lg flex flex-col justify-between"
              role="region"
              aria-label="Logi Route project"
            >
              <motion.div
                className="w-full h-24 rounded overflow-hidden mb-3 relative cursor-pointer"
                whileHover={{ scale: 2.0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/images/LogiRoute.webp"
                  alt="Logi Route project preview"
                  width={220}
                  height={96}
                  className="w-full h-full object-contain"
                  quality={75}
                />
              </motion.div>
              <div>
                <div className="text-xs font-bold italic text-center mb-1" style={{color: '#F5F5DC'}}>Building in Public Beta</div>
                <motion.a
                  href="https://logi-route-a9c09ae8.base44.app/login?from_url=https%3A%2F%2Flogi-route-a9c09ae8.base44.app%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link font-bold text-center block w-full py-0"
                  style={{color: '#F5F5DC', textDecoration: 'none', fontSize: '14px'}}
                  aria-label="Visit LogiRoute - Logistics Management Platform"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  LogiRoute
                </motion.a>
              </div>
            </div>
            
            {/* Center box - rotating content with Motion animations */}
            <div
              className="bg-black/30 border-2 border-purple-400 rounded-lg p-4 w-[220px] h-[240px] backdrop-blur-sm shadow-lg flex flex-col justify-between relative overflow-hidden"
              role="region"
              aria-label="Rotating consultation offers"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentBox}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1] // Custom easing for smooth motion
                  }}
                >
                  <div className="text-sm font-bold mb-2" style={{color: '#F5F5DC'}}>{boxes[currentBox].title}</div>
                  <div className="text-xs mb-3" style={{color: '#F5F5DC', opacity: 0.9}}>{boxes[currentBox].description}</div>
                </motion.div>
              </AnimatePresence>
              <div>
                <a
                  href="mailto:chrisleebergstrom@gmail.com?subject=Consultation Inquiry"
                  className="block w-full py-2 px-3 bg-transparent border border-molten text-molten text-xs rounded hover:bg-molten/10 hover:text-white transition-all text-center focus:outline-none focus:ring-2 focus:ring-molten focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Contact Chris for consultation"
                >
                  Let's Talk Strategy
                </a>
                <div className="text-xs mt-1 text-center" style={{color: '#F5F5DC', opacity: 0.6}}>chrisleebergstrom@gmail.com</div>
              </div>
            </div>
            
            {/* Right box */}
            <div
              className="bg-black/30 border-2 border-purple-400 rounded-lg p-4 w-[220px] h-[240px] backdrop-blur-sm shadow-lg flex flex-col justify-between"
              role="region"
              aria-label="AI Chess Game"
            >
              <motion.div
                className="w-full h-32 rounded overflow-hidden mb-2 relative cursor-pointer"
                whileHover={{ scale: 2.0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/images/Chesterupdate2.jpeg"
                  alt="Chester AI Chess Game"
                  width={220}
                  height={128}
                  className="w-full h-full object-contain"
                  quality={75}
                />
              </motion.div>
              <div>
                <div className="text-xs font-bold italic text-center mb-1" style={{color: '#F5F5DC'}}>Building in Public Beta</div>
                <motion.a
                  href="https://ai-chess-cfah.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link font-bold text-center block w-full py-0"
                  style={{color: '#F5F5DC', textDecoration: 'none', fontSize: '14px'}}
                  aria-label="Play Chester - AI Chess Game"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Play Chester
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xl font-body italic text-center mb-8 max-w-2xl opacity-90" style={{color: '#F5F5DC'}}>
          "The advancement of the arts is directly related to the advancement of society"
        </p>
        
        {/* Who Is Chris Lee Bergstrom section with pulsing line - Mobile responsive */}
        <div className="relative mb-16 mx-auto max-w-4xl px-4">
          <div className="text-base font-body opacity-90 leading-relaxed space-y-6" style={{color: '#F5F5DC'}}>
            <p className="font-semibold text-lg">
              I build systems where art and technology work in sync — because I've lived both sides.
            </p>
            <p>
              I started in the deep end of live sound, chasing perfect harmony, phase, and the science of acoustics. Decades later, I've led crews, built production infrastructures, and rescued venues from chaos. Whether it's an international tour, a citywide cultural system, or a failing arts organization, I find the signal in the noise and make it sing again.
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
              <p className="text-center text-sm italic mt-2" style={{color: '#F5F5DC', opacity: 0.6}}>
                Colorado State Fair mixing for Tracy Lawrence
              </p>
            </div>

            <p className="font-semibold text-lg">
              I'm not just an engineer — I'm a builder of ecosystems.
            </p>
            <p>
              From world tours to public venues, I've learned how to lead under pressure, turn inefficiency into momentum, and bring artists, technicians, and institutions back into harmony.
            </p>

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
                  alt="Pacific Northwest - Chris Lee Bergstrom"
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
              <p className="text-center text-sm italic mt-2" style={{color: '#F5F5DC', opacity: 0.6}}>
                Pacific Northwest pic by Chris Lee Bergstrom
              </p>
            </div>

            <p className="font-semibold text-lg">
              Because the advancement of art is the advancement of society.
            </p>
            <p>
              If you're ready to rebuild something real — your venue, your culture strategy, your live systems — let's talk. I don't do "arts and culture" by committee. I do the work that makes art feel alive again.
            </p>
          </div>
        </div>

        {/* Horizontal scrolling gallery - ticker style */}
        <section 
          className="mb-16 w-full max-w-6xl mx-auto px-4"
          aria-label="Portfolio gallery showcasing Chris's projects"
        >
          <div 
            ref={galleryRef}
            className="gallery-container overflow-x-scroll overflow-y-hidden"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'auto' // Prevent smooth scrolling conflicts
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div 
              className="gallery-track flex gap-6"
              style={{ width: 'max-content' }}
              role="img"
              aria-label="Interactive gallery of project screenshots and portfolio images"
            >
              {/* First set of items - starting with Project9 as first */}
              <GalleryImage src="/images/gallery/Project9.webp" alt="Project 9 - CLB Consulting portfolio showcase" />
              <GalleryImage src="/images/gallery/Project1.webp" alt="AI consulting project dashboard showing multi-modal integration interface" />
              <GalleryImage src="/images/gallery/Project2.webp" alt="Entertainment technology setup with professional audio equipment and lighting controls" />
              <GalleryImage src="/images/gallery/Project3.webp" alt="Strategic consulting workspace with data visualization and planning documents" />
              <GalleryImage src="/images/gallery/BRMC2.webp?v=20250628" alt="Black Rebel Motorcycle Club live performance with dramatic stage lighting in Portugal" />
              <GalleryImage src="/images/gallery/Project5.webp" alt="Team collaboration session showing AI-powered workflow optimization solutions" />
              <GalleryImage src="/images/gallery/Project6.webp" alt="Live event coordination center with multiple screens showing real-time production data" />
              <GalleryImage src="/images/gallery/Project7.webp" alt="Entertainment venue technical setup featuring advanced sound and visual systems" />
              <GalleryImage src="/images/gallery/Project8.webp" alt="CLB Consulting client workshop demonstrating AI integration strategies" />
              {/* Duplicate set for seamless loop */}
              <GalleryImage src="/images/gallery/Project9.webp" alt="Project 9 - CLB Consulting portfolio showcase" />
              <GalleryImage src="/images/gallery/Project1.webp" alt="AI consulting project dashboard showing multi-modal integration interface" />
              <GalleryImage src="/images/gallery/Project2.webp" alt="Entertainment technology setup with professional audio equipment and lighting controls" />
              <GalleryImage src="/images/gallery/Project3.webp" alt="Strategic consulting workspace with data visualization and planning documents" />
              <GalleryImage src="/images/gallery/BRMC2.webp?v=20250628" alt="Black Rebel Motorcycle Club live performance with dramatic stage lighting in Portugal" />
              <GalleryImage src="/images/gallery/Project5.webp" alt="Team collaboration session showing AI-powered workflow optimization solutions" />
              <GalleryImage src="/images/gallery/Project6.webp" alt="Live event coordination center with multiple screens showing real-time production data" />
              <GalleryImage src="/images/gallery/Project7.webp" alt="Entertainment venue technical setup featuring advanced sound and visual systems" />
              <GalleryImage src="/images/gallery/Project8.webp" alt="CLB Consulting client workshop demonstrating AI integration strategies" />
            </div>
          </div>
        </section>
        <section 
          className="mb-8 max-w-3xl mx-auto text-center" 
          id="eve-chat"
          aria-labelledby="eve-heading"
        >
          <h3 id="eve-heading" className="text-3xl font-heading mb-4" style={{color: '#F5F5DC'}}>Ask EVE.</h3>
          <p className="text-lg leading-relaxed opacity-90 mb-6" style={{color: '#F5F5DC'}}>
            EVE is your tactical intelligence engine. She doesn't just answer—she synthesizes, challenges, and refines. AI should never replace the artist. It should empower the visionary.
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-lg border border-molten/40 overflow-hidden relative">
              <Image 
                src="/images/projects/EVE.png" 
                alt="EVE AI avatar - A sophisticated conversational AI assistant for strategic consulting" 
                width={96}
                height={96}
                className="w-full h-full object-cover object-top"
                quality={75}
              />
            </div>
          </div>
        </section>
        
        <h4 id="eve-ai-heading" className="text-4xl font-heading mb-2" style={{color: '#F5F5DC'}}>
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