import ChatPanel from './ChatPanel';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Marquee() {
  const [currentBox, setCurrentBox] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [autoScrollPosition, setAutoScrollPosition] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const animationRef = useRef<number>();
  const loadedImages = useRef<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBox(prev => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll animation - starts when images are loaded and not interacting
  useEffect(() => {
    if (!isUserInteracting && galleryRef.current && (imagesLoaded || loadedImages.current.size > 3)) {
      const animate = () => {
        setAutoScrollPosition(prev => {
          const container = galleryRef.current;
          if (!container) return prev;
          
          const itemWidth = 320 + 24; // w-80 (320px) + gap (24px)
          const totalItems = 9; // Number of unique gallery items
          const maxScroll = itemWidth * totalItems; // Total width of one set
          const newPosition = prev + 0.3; // Slower, smoother scroll speed
          
          // Seamless loop: when we reach the end of first set, jump to beginning
          return newPosition >= maxScroll ? 0 : newPosition;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 50);
      
      return () => {
        clearTimeout(timeoutId);
      };
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isUserInteracting, imagesLoaded]);

  // Apply scroll position
  useEffect(() => {
    if (!isUserInteracting && galleryRef.current) {
      galleryRef.current.scrollLeft = autoScrollPosition;
    }
  }, [autoScrollPosition, isUserInteracting]);

  // Touch/Mouse handlers
  const handleTouchStart = () => {
    setIsUserInteracting(true);
  };

  const handleTouchEnd = () => {
    // Small delay before resuming auto-scroll for natural feel
    setTimeout(() => {
      if (galleryRef.current) {
        setAutoScrollPosition(galleryRef.current.scrollLeft);
      }
      setIsUserInteracting(false);
    }, 300);
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

  // Gallery image component with load tracking
  const GalleryImage = ({ src, alt }: { src: string; alt: string }) => {
    const handleImageLoad = () => {
      loadedImages.current.add(src);
      // Check if all images are loaded (9 unique images)
      if (loadedImages.current.size >= 9 && !imagesLoaded) {
        setImagesLoaded(true);
      }
    };

    return (
      <div className="gallery-item-with-watermark flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden relative">
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          onLoad={handleImageLoad}
          draggable={false}
          loading="lazy"
          onError={(e) => {
            console.log('Image failed to load:', src);
            e.currentTarget.style.opacity = '0.3';
            e.currentTarget.style.background = '#333';
          }}
        />
        <div className="gallery-watermark">
          <img src="/images/Purple Logo.png" alt="" className="h-3 w-auto opacity-60" />
        </div>
      </div>
    );
  };

  const boxes = [
    {
      title: "AI Integrations",
      description: "Ask me about AI integrations that are multi-modal and multi-lingual for accessibility and efficiencies!",
      subject: "AI Project Inquiry - Multi-Modal Integration"
    },
    {
      title: "Cost Efficiency", 
      description: "Ask me about how I can save or generate your company 20-30 percent and set you up for the future of entertainment!",
      subject: "AI Project Inquiry - Cost Savings & Entertainment Future"
    },
    {
      title: "Team Building & Morale",
      description: "Morale is worth 30 percent and team cohesion is not only good for business, it's ethical and sustainable practices!",
      subject: "AI Project Inquiry - Team Building & Morale Solutions"
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
          <div className="w-20 h-20 rounded-full border border-molten/50 overflow-hidden bg-gradient-to-br from-molten/30 to-gray-700/50">
            <img 
              src="/images/profile/chris-profile.jpg" 
              alt="Chris Lee Bergstrom" 
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-sm font-bold" style={{color: '#F5F5DC'}}>CB</span>
            </div>
          </div>
        </div>
        
        {/* Chris Lee Bergstrom heading with CTA box */}
        <div className="w-full mb-6">
          <h2 className="text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 glow-subtle text-center">
            Chris Lee Bergstrom
          </h2>
          
          {/* Three boxes layout */}
          <div className="flex justify-center items-stretch gap-4 flex-wrap lg:flex-nowrap">
            {/* Left box */}
            <div 
              className="bg-black/30 border-2 border-molten rounded-lg p-4 w-[220px] min-h-[200px] backdrop-blur-sm shadow-lg flex flex-col justify-between"
              role="region"
              aria-label="Coming soon feature"
            >
              <div className="w-full h-24 rounded overflow-hidden mb-3">
                <img 
                  src="/UG.jpeg" 
                  alt="Coming soon feature preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-lg font-bold text-center glow" style={{color: '#F5F5DC'}}>Coming Soon</div>
            </div>
            
            {/* Center box - existing rotating content */}
            <div 
              className="bg-black/30 border-2 border-molten rounded-lg p-4 w-[220px] min-h-[200px] backdrop-blur-sm shadow-lg flex flex-col justify-between"
              role="region"
              aria-label="Rotating consultation offers"
              aria-live="polite"
            >
              <div 
                key={currentBox}
                className="animate-crossfade flex flex-col h-full justify-between"
              >
                <div>
                  <div className="text-sm font-bold mb-2" style={{color: '#F5F5DC'}}>{boxes[currentBox].title}</div>
                  <div className="text-xs mb-3" style={{color: '#F5F5DC', opacity: 0.9}}>{boxes[currentBox].description}</div>
                </div>
                <div>
                  <a 
                    href={`mailto:chrisleebergstrom@gmail.com?subject=${boxes[currentBox].subject}`}
                    className="block w-full py-2 px-3 bg-transparent border border-molten text-molten text-xs rounded hover:bg-molten/10 hover:text-white transition-all text-center focus:outline-none focus:ring-2 focus:ring-molten focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={`Contact Chris about ${boxes[currentBox].title} - ${boxes[currentBox].description}`}
                  >
                    Let's Talk Strategy
                  </a>
                  <div className="text-xs mt-1 text-center" style={{color: '#F5F5DC', opacity: 0.6}}>chrisleebergstrom@gmail.com</div>
                </div>
              </div>
            </div>
            
            {/* Right box */}
            <div 
              className="bg-black/30 border-2 border-molten rounded-lg p-4 w-[220px] min-h-[200px] backdrop-blur-sm shadow-lg flex flex-col justify-between"
              role="region"
              aria-label="AI Chess Game"
            >
              <div>
                <div className="text-sm font-bold mb-2" style={{color: '#F5F5DC'}}>AI Chess Game</div>
                <div className="text-xs mb-3" style={{color: '#F5F5DC', opacity: 0.9}}>Challenge our AI in a game of chess - built with cutting-edge technology</div>
              </div>
              <a 
                href="https://ai-chess-cfah.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-center glow block w-full py-2"
                style={{color: '#F5F5DC', textDecoration: 'none'}}
                aria-label="Play Chester - AI Chess Game"
              >
                Play Chester
              </a>
            </div>
          </div>
        </div>
        <p className="text-xl font-body italic text-center mb-8 max-w-2xl opacity-90" style={{color: '#F5F5DC'}}>
          "The advancement of the arts is directly related to the advancement of society"
        </p>
        
        {/* Who Is Chris Lee Bergstrom section with pulsing line - Mobile responsive */}
        <div className="relative mb-16 mx-auto max-w-4xl px-4">
          <div className="text-base font-body opacity-90 leading-relaxed space-y-6" style={{color: '#F5F5DC'}}>
            <p>
              I started my career in the deep end of audio—drawn by an obsession with harmony, phase, coherence, and the wild science of pure sound. I've spent a lifetime chasing what music does to the soul. It's always been the primary addiction, and I know I'll never shake it. Music can, has, and will change the world. It's the universal translator, the code to unlock everything.
            </p>
            <p>
              That addiction to the magic of live sound led me to every corner of the globe and into the orbit of all kinds of artists—famous and anonymous, inspired and stubborn, revolutionary and wrecked. As the years rolled on, I took on bigger risks, bigger shows, and projects that forced me to get smarter, tougher, and more patient. I learned the hardest way how to build teams and crews, how to hold a vision together under pressure, and how to stay awake for 40 hours straight if that's what the show needed. I picked up lifelong friends, lost a few along the way, and found out who was truly dedicated to the work of making art matter.
            </p>
            <p>
              That's where you'll find me: at the place where art, technology, and the daily mess of living all crash into each other and somehow produce something worth feeling. I don't claim to have all the answers. But I know what I've seen, what I've survived, and what I believe: the advancement of the arts is directly tied to the advancement of society.
            </p>
            <p>
              Artists can reclaim every step of the journey—from creation to presentation. Artists can and should run, shape, and distribute the places where people come to be changed by art. If there's going to be a revolution in the arts, it will start with the artists. Not with managers or committees, but with people who live and bleed for the work.
            </p>
            <p>
              This isn't nostalgia. This is a call for return—a return to the raw, the honest, the truly disruptive. Back to Woody with his guitar and that scrawled message: "This Machine Kills Fascists." Because the arts—when they're free, when they're run by the true believers—do kill the old ways and make space for something braver.
            </p>
            <p className="font-semibold">
              So, this is the discussion I'm here to start. If you're tired of the hollow rituals, of "arts and culture" by committee, if you want something real—pull up a chair. Let's make something that matters.
            </p>
          </div>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-molten block animate-pulse-width w-32" />
        </div>

        {/* Horizontal scrolling gallery - ticker style */}
        <section 
          className="mb-16 w-full max-w-6xl mx-auto px-4"
          aria-label="Portfolio gallery showcasing Chris's projects"
        >
          <div 
            ref={galleryRef}
            className="gallery-container overflow-x-scroll overflow-y-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
            <div className="w-24 h-24 rounded-lg border border-molten/40 overflow-hidden">
              <img 
                src="/images/projects/EVE.png" 
                alt="EVE AI avatar - A sophisticated conversational AI assistant for strategic consulting" 
                className="w-full h-full object-cover object-top"
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