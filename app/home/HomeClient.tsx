'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Contact from '../../components/Contact';
import Marquee from '../../components/Marquee';

export default function HomeClient() {
  const [videosDisabled, setVideosDisabled] = useState(false);
  const videosDisabledRef = useRef(false);

  const handlePauseVideos = useCallback(() => {
    setVideosDisabled(true);
    videosDisabledRef.current = true;
    // Immediately pause any currently playing videos
    const video = document.getElementById('scroll-video') as HTMLVideoElement;
    const brmcVideo = document.getElementById('brmc-video') as HTMLVideoElement;
    if (video) video.pause();
    if (brmcVideo) brmcVideo.pause();
  }, []);

  // Respect prefers-reduced-motion setting
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      handlePauseVideos();
    }
  }, [handlePauseVideos]);

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
              console.log(
                'Video 1 intersection:',
                entry.isIntersecting,
                'Ratio:',
                entry.intersectionRatio,
              );
              if (!videosDisabledRef.current && entry.isIntersecting) {
                console.log('Playing video 1');
                video.muted = true; // Ensure muted for autoplay
                video.play().catch((error) => {
                  console.log('Video 1 play failed:', error);
                  // Fallback: try to play after user interaction
                  document.addEventListener(
                    'click',
                    () => {
                      video.play().catch(console.log);
                    },
                    { once: true },
                  );
                });
              } else {
                console.log('Pausing video 1');
                video.pause();
              }
            });
          },
          { threshold: [0, 0.1, 0.25], rootMargin: '50% 0px 50% 0px' },
        );
        observer.observe(video);
      }

      if (brmcVideo) {
        const brmcObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              console.log(
                'Video 2 intersection:',
                entry.isIntersecting,
                'Ratio:',
                entry.intersectionRatio,
              );
              if (!videosDisabledRef.current && entry.isIntersecting) {
                console.log('Playing video 2');
                brmcVideo.muted = true; // Ensure muted for autoplay
                brmcVideo.play().catch((error) => {
                  console.log('Video 2 play failed:', error);
                  // Fallback: try to play after user interaction
                  document.addEventListener(
                    'click',
                    () => {
                      brmcVideo.play().catch(console.log);
                    },
                    { once: true },
                  );
                });
              } else {
                console.log('Pausing video 2');
                brmcVideo.pause();
              }
            });
          },
          { threshold: [0, 0.1, 0.25], rootMargin: '50% 0px 50% 0px' },
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
      {/* Video Background */}
      <div className="parallax-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '-10%',
            left: 0,
            width: '100%',
            height: '120vh',
            objectFit: 'cover',
            filter: 'brightness(0.4) saturate(1.1)',
            opacity: 0.7,
            zIndex: 1,
            transform: 'scale(1.15)',
          }}
        >
          <source src="/videos/circuitry-bg-fade.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Debug: Keep this div but make it invisible */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          width: '200px',
          height: '100px',
          backgroundImage: 'url(/images/BackgroundHOME.webp)',
          backgroundSize: 'cover',
          border: '2px solid red',
          zIndex: 9999,
          display: 'none',
        }}
      >
        <span style={{ color: 'white', background: 'black' }}>Test Image 2</span>
      </div>

      <main
        id="main-content"
        className="min-h-screen text-white relative"
        aria-label="Main content area"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Marquee />
        <section className="pt-0 pb-8 px-6 text-center">
          {/* Flashing lights warning */}
          <div className="flex flex-col items-center mb-4 text-yellow-400">
            <div className="flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                These videos below contain flashing lights
              </span>
            </div>
            {!videosDisabled && (
              <button
                onClick={handlePauseVideos}
                className="px-4 py-2 bg-transparent border border-yellow-400 text-yellow-400 text-sm font-medium rounded hover:bg-yellow-400/10 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                aria-label="Pause auto-playing videos"
              >
                Pause Videos
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
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Row 2: 4 arrows */}
            <div className="flex items-center justify-center space-x-4 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Row 3: 3 arrows */}
            <div className="flex items-center justify-center space-x-4 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Row 4: 2 arrows */}
            <div className="flex items-center justify-center space-x-4 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Row 5: 1 arrow */}
            <div className="flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
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
              aria-label="Silent video: The Dandy Warhols performing live in Paris, France. Shows band on stage with purple and blue stage lighting, audience energy, and professional audio engineering setup. Auto-plays when scrolled into view."
              title="The Dandy Warhols Live in Paris - CLB Consultancy Showcase"
            >
              <source src="/videos/IMG_0279.mp4" type="video/mp4" />
              <source src="/videos/IMG_0279.mov" type="video/quicktime" />
              <p>
                Your browser does not support the video tag. This silent video showcases The Dandy
                Warhols performing live in Paris, France. The video features stage lighting,
                audience engagement, and professional live sound mixing by Chris Lee Bergstrom,
                demonstrating CLB Consultancy's expertise in entertainment technology and live event
                production.
              </p>
            </video>
            <p
              className="text-center text-sm italic mt-2"
              style={{ color: '#F5F5DC', opacity: 0.85 }}
            >
              The Dandy Warhols Live in Paris, France
            </p>
          </div>
        </section>

        {/* Second video section - BRMC */}
        <section className="py-12 px-6" aria-label="BRMC promotional video showcase">
          <div className="max-w-4xl mx-auto">
            <video
              id="brmc-video"
              className="w-full h-auto border-none rounded-none bg-transparent"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Silent video: Black Rebel Motorcycle Club performing live at Vilar de Mouros festival in Portugal. Features dramatic stage lighting, outdoor festival atmosphere, and professional sound engineering. Auto-plays when scrolled into view."
              title="Black Rebel Motorcycle Club Live in Portugal - CLB Consultancy"
            >
              <source src="/videos/BRMC.mp4" type="video/mp4" />
              <source src="/videos/BRMC.mov" type="video/quicktime" />
              <p>
                Your browser does not support the video tag. This silent video showcases Black Rebel
                Motorcycle Club performing live at the Vilar de Mouros festival in Portugal. The
                video captures the outdoor festival setting, dramatic stage lighting, crowd energy,
                and professional live sound mixing, highlighting CLB Consultancy's work with
                Grammy-nominated artists and major international music festivals.
              </p>
            </video>
            <p
              className="text-center text-sm italic mt-2"
              style={{ color: '#F5F5DC', opacity: 0.85 }}
            >
              Black Rebel Motorcycle Club in Vilar de Mouros, Portugal
            </p>
          </div>
        </section>

        {/* Profile Image Section */}
        <section className="py-12 px-6" aria-label="Chris Lee Bergstrom profile image">
          <div className="max-w-4xl mx-auto flex justify-center">
            <div
              className="w-80 h-96 rounded-lg overflow-hidden bg-black/20"
              style={{
                mask: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                maskComposite: 'intersect',
                WebkitMask:
                  'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskComposite: 'source-in',
              }}
            >
              <img
                src="/images/profile/chris-profile.jpg"
                alt="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-molten/30 to-gray-700/50"
                style={{ display: 'none' }}
              >
                <span className="text-2xl font-bold" style={{ color: '#F5F5DC' }}>
                  CLB
                </span>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}
