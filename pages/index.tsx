import Head from 'next/head';
import { useEffect } from 'react';
import Marquee from '../components/Marquee';
import Ethos from '../components/Ethos';
import Contact from '../components/Contact';

export default function Home() {
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

    // Parallax scroll effect with image transition
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const parallaxBg1 = document.querySelector('.parallax-bg') as HTMLElement;
      const parallaxBg2 = document.querySelector('.parallax-bg-2') as HTMLElement;
      
      // Calculate scroll progress (0 to 1) - starts transition after 300px
      const scrollProgress = Math.min(Math.max((scrolled - 300) / (windowHeight * 0.8), 0), 1);
      
      if (parallaxBg1) {
        const speed1 = 0.5;
        parallaxBg1.style.transform = `translateY(${scrolled * speed1}px)`;
        // Fade out first image as second appears
        parallaxBg1.style.opacity = (1 - scrollProgress * 0.7).toString();
      }
      
      if (parallaxBg2) {
        const speed2 = 0.3;
        parallaxBg2.style.transform = `translateY(${scrolled * speed2}px)`;
        // Fade in second image as you scroll
        parallaxBg2.style.opacity = scrollProgress.toString();
      }
      
      // Debug log
      if (scrolled > 0 && scrolled < 100) {
        console.log(`Scroll: ${scrolled}, Progress: ${scrollProgress}, BG2 Opacity: ${scrollProgress}`);
      }
    };

    // Video scroll trigger with Intersection Observer
    const setupVideoScrollTrigger = () => {
      const video = document.getElementById('scroll-video') as HTMLVideoElement;
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(console.log);
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(video);
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
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="CLB Consultancy - AI Strategy & Entertainment Technology" />
        <meta property="og:description" content="Strategy Born from the Wreckage, Intelligence Forged in the Fire. AI consulting for entertainment, hospitality, and live events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        
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
        <div className="parallax-bg"></div>
        <div className="parallax-bg-2"></div>
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
        className="min-h-screen bg-black/80 text-white relative z-10"
        role="main"
        aria-label="Main content area"
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
            CLB Consultancy
          </h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto leading-relaxed">
            <span className="text-molten font-bold">Strategy Born from the Wreckage, Intelligence Forged in the Fire</span>
          </p>
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
          </div>
        </section>
        
        <Ethos />
        <Contact />
      </main>
    </>
  );
}