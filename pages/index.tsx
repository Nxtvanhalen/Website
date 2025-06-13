import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import Marquee from '../components/Marquee';
import Ethos from '../components/Ethos';
import Contact from '../components/Contact';

export default function Home() {
  const [videosDisabled, setVideosDisabled] = useState(false);
  const videosDisabledRef = useRef(false);

  const handlePauseVideos = () => {
    setVideosDisabled(true);
    videosDisabledRef.current = true;
    // Immediately pause any currently playing videos
    const video = document.getElementById('scroll-video') as HTMLVideoElement;
    const brmcVideo = document.getElementById('brmc-video') as HTMLVideoElement;
    if (video) video.pause();
    if (brmcVideo) brmcVideo.pause();
  };

  useEffect(() => {
    // Force page to top immediately
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    
    // Also prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }

    // Static background - no parallax scrolling
    const handleScroll = () => {
      // No parallax effect - background stays fixed
    };

    // Video scroll trigger with Intersection Observer
    const setupVideoScrollTrigger = () => {
      const video = document.getElementById('scroll-video') as HTMLVideoElement;
      const brmcVideo = document.getElementById('brmc-video') as HTMLVideoElement;
      
      if (video) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!videosDisabledRef.current && entry.isIntersecting) {
                video.play().catch(console.log);
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(video);
      }

      if (brmcVideo) {
        const brmcObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!videosDisabledRef.current && entry.isIntersecting) {
                brmcVideo.play().catch(console.log);
              } else {
                brmcVideo.pause();
              }
            });
          },
          { threshold: 0.5 }
        );
        brmcObserver.observe(brmcVideo);
      }
    };


    // Simple scroll fade - disabled temporarily
    const setupSimpleScrollFade = () => {
      return () => {}; // No-op cleanup function
    };

    window.addEventListener('scroll', handleScroll);
    setupVideoScrollTrigger();
    const fadeCleanup = setupSimpleScrollFade();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      fadeCleanup();
    };
  }, []);

  // Handle video disable/enable state changes
  useEffect(() => {
    const video = document.getElementById('scroll-video') as HTMLVideoElement;
    const brmcVideo = document.getElementById('brmc-video') as HTMLVideoElement;
    
    if (videosDisabled) {
      // Pause videos and disable them
      if (video) {
        video.pause();
        video.style.pointerEvents = 'none';
        video.style.opacity = '0.5';
      }
      if (brmcVideo) {
        brmcVideo.pause();
        brmcVideo.style.pointerEvents = 'none';
        brmcVideo.style.opacity = '0.5';
      }
    } else {
      // Re-enable videos
      if (video) {
        video.style.pointerEvents = 'auto';
        video.style.opacity = '1';
      }
      if (brmcVideo) {
        brmcVideo.style.pointerEvents = 'auto';
        brmcVideo.style.opacity = '1';
      }
    }
  }, [videosDisabled]);

  // Force scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>CLB Consultancy - AI-Powered Solutions</title>
        <meta name="description" content="AI-focused consultancy providing intelligent solutions and development services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9370DB" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="CLB Consultancy - AI Strategy & Entertainment Technology" />
        <meta property="og:description" content="Strategy Born from the Wreckage, Intelligence Forged in the Fire. AI consulting for entertainment, hospitality, and live events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        <meta property="og:image:width" content="1331" />
        <meta property="og:image:height" content="2000" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@chrisleebergstrom" />
        <meta name="twitter:creator" content="@chrisleebergstrom" />
        <meta name="twitter:title" content="CLB Consultancy - AI Strategy & Entertainment Technology" />
        <meta name="twitter:description" content="Strategy Born from the Wreckage, Intelligence Forged in the Fire. AI consulting for entertainment, hospitality, and live events." />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com" />
        
        {/* JSON-LD Structured Data for AI understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://chrisleebergstrom.com/#organization",
                  "name": "CLB Consultancy",
                  "url": "https://chrisleebergstrom.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://chrisleebergstrom.com/images/profile/chris-profile.jpg"
                  },
                  "description": "AI-focused consultancy providing intelligent solutions for entertainment, hospitality, and live events industry",
                  "slogan": "Strategy Born from the Wreckage, Intelligence Forged in the Fire",
                  "founder": {
                    "@type": "Person",
                    "@id": "https://chrisleebergstrom.com/about#person",
                    "name": "Chris Lee Bergstrom"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "chrisleebergstrom@gmail.com",
                    "contactType": "Business Inquiries"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/in/chris-bergstrom",
                    "https://www.instagram.com/chrisleebergstrom",
                    "https://www.youtube.com/@chrisleebergstrom",
                    "https://www.facebook.com/share/15a8S2BF9S/?mibextid=wwXIfr"
                  ],
                  "knowsAbout": [
                    "Artificial Intelligence",
                    "AI Strategy",
                    "Entertainment Technology",
                    "Live Events Management",
                    "Audio Engineering",
                    "Multi-Agent Systems",
                    "Team Building",
                    "Operational Efficiency"
                  ]
                },
                {
                  "@type": "Person",
                  "@id": "https://chrisleebergstrom.com/about#person",
                  "name": "Chris Lee Bergstrom",
                  "jobTitle": "AI Strategy Consultant & Founder",
                  "description": "Grammy-nominated audio engineer turned AI consultant specializing in entertainment technology and live events",
                  "url": "https://chrisleebergstrom.com/about",
                  "image": "https://chrisleebergstrom.com/images/profile/chris-profile.jpg",
                  "worksFor": {
                    "@id": "https://chrisleebergstrom.com/#organization"
                  },
                  "hasCredential": "Grammy-nominated Audio Engineer",
                  "knowsAbout": [
                    "AI Implementation",
                    "Entertainment Industry",
                    "Audio Engineering",
                    "Live Sound Production",
                    "Tour Management",
                    "Multi-Modal AI Systems",
                    "Team Cohesion Strategies"
                  ],
                  "sameAs": [
                    "https://www.linkedin.com/in/chris-bergstrom",
                    "https://www.instagram.com/chrisleebergstrom",
                    "https://www.youtube.com/@chrisleebergstrom"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://chrisleebergstrom.com/#website",
                  "url": "https://chrisleebergstrom.com",
                  "name": "CLB Consultancy",
                  "description": "AI consulting for entertainment, hospitality, and live events",
                  "publisher": {
                    "@id": "https://chrisleebergstrom.com/#organization"
                  },
                  "inLanguage": "en-US"
                }
              ]
            })
          }}
        />
      </Head>
      
      {/* Parallax Background */}
      <div className="parallax-container">
        <div 
          className="parallax-bg-2"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: 'url(/images/parallax-bg2.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.7) saturate(1.2)',
            opacity: 1,
            zIndex: 1,
            minHeight: '120vh'
          }}
        ></div>
      </div>
      
      {/* Debug: Keep this div but make it invisible */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '200px',
        height: '100px',
        backgroundImage: 'url(/images/parallax-bg2.webp)',
        backgroundSize: 'cover',
        border: '2px solid red',
        zIndex: 9999,
        display: 'none'
      }}>
        <span style={{color: 'white', background: 'black'}}>Test Image 2</span>
      </div>
      
      <main 
        id="main-content"
        className="min-h-screen text-white relative"
        role="main"
        aria-label="Main content area"
        style={{position: 'relative', zIndex: 10}}
      >
        <Marquee />
        <section 
          className="pt-8 pb-8 px-6 text-center"
          aria-labelledby="company-heading"
        >
          <h1 
            id="company-heading"
            className="text-4xl font-heading mb-4 bg-gradient-to-r from-white via-molten to-white bg-clip-text text-transparent glow-subtle"
          >
            CLB Consulting
          </h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{color: '#F5F5DC'}}>
            <span className="font-bold" style={{color: '#F5F5DC'}}>Strategy Born from the Wreckage, Intelligence Forged in the Fire</span>
          </p>
          
          {/* Flashing lights warning */}
          <div className="flex flex-col items-center mb-4 text-yellow-400">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">These videos below contain flashing lights</span>
            </div>
            {!videosDisabled && (
              <button
                onClick={handlePauseVideos}
                className="px-4 py-2 bg-transparent border border-yellow-400 text-yellow-400 text-sm font-medium rounded hover:bg-yellow-400/10 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                aria-label="Pause auto-playing videos"
              >
                Please pause the videos
              </button>
            )}
            {videosDisabled && (
              <div className="text-sm font-medium opacity-70">
                Videos paused - refresh page to re-enable
              </div>
            )}
          </div>
          
          {/* Down arrows chevron pattern */}
          <div className="flex flex-col items-center text-yellow-400">
            {/* Row 1: 5 arrows */}
            <div className="flex items-center justify-center space-x-4 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Row 2: 4 arrows */}
            <div className="flex items-center justify-center space-x-4 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Row 3: 3 arrows */}
            <div className="flex items-center justify-center space-x-4 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Row 4: 2 arrows */}
            <div className="flex items-center justify-center space-x-4 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Row 5: 1 arrow */}
            <div className="flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </section>
        
        
        {/* Scroll-triggered video section */}
        <section 
          className="py-12 px-6"
          aria-label="Promotional video showcasing CLB Consultancy's work"
        >
          <div className="max-w-4xl mx-auto">
            <video 
              id="scroll-video"
              className="w-full h-auto border-none rounded-none bg-transparent"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="CLB Consultancy promotional video - plays automatically when scrolled into view"
              title="CLB Consultancy Showcase Video"
            >
              <source src="/videos/IMG_0279.mov" type="video/quicktime" />
              <source src="/videos/IMG_0279.mp4" type="video/mp4" />
              <p>Your browser does not support the video tag. This video showcases CLB Consultancy's AI integration and entertainment technology work.</p>
            </video>
            <p className="text-center text-sm italic mt-2" style={{color: '#F5F5DC', opacity: 0.6}}>
              The Dandy Warhols Live in Paris, France
            </p>
          </div>
        </section>

        {/* Second video section - BRMC */}
        <section 
          className="py-12 px-6"
          aria-label="BRMC promotional video showcase"
        >
          <div className="max-w-4xl mx-auto">
            <video 
              id="brmc-video"
              className="w-full h-auto border-none rounded-none bg-transparent"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="BRMC promotional video - plays automatically when scrolled into view"
              title="BRMC Live Performance Video"
            >
              <source src="/videos/BRMC.mov" type="video/quicktime" />
              <source src="/videos/BRMC.mp4" type="video/mp4" />
              <p>Your browser does not support the video tag. This video showcases BRMC's live performance in Portugal.</p>
            </video>
            <p className="text-center text-sm italic mt-2" style={{color: '#F5F5DC', opacity: 0.6}}>
              Black Rebel Motorcycle Club in Vilar de Mouros, Portugal
            </p>
          </div>
        </section>
        
        {/* Profile Image Section */}
        <section 
          className="py-12 px-6"
          aria-label="Chris Lee Bergstrom profile image"
        >
          <div className="max-w-4xl mx-auto flex justify-center">
            <div className="w-80 h-96 rounded-lg overflow-hidden bg-black/20">
              <img 
                src="/images/profile/chris-profile.jpg" 
                alt="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" 
                className="w-full h-full object-contain profile-image-mask"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-molten/30 to-gray-700/50" style={{display: 'none'}}>
                <span className="text-2xl font-bold" style={{color: '#F5F5DC'}}>CLB</span>
              </div>
            </div>
          </div>
        </section>
        
        <Ethos />
        <Contact />
      </main>
    </>
  );
}