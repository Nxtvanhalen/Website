import Head from 'next/head';
import { useEffect } from 'react';
import Marquee from '../components/Marquee';
import Ethos from '../components/Ethos';
import Contact from '../components/Contact';

export default function Home() {
  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      
      <main className="min-h-screen bg-black/80 text-white relative z-10">
        <Marquee />
        <section className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-4xl font-heading mb-4 bg-gradient-to-r from-white via-molten to-white bg-clip-text text-transparent">
            CLB Consulting
          </h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto leading-relaxed">
            <span className="text-molten font-bold">Strategy Born from the Wreckage, Intelligence Forged in the Fire</span>
          </p>
        </section>
        <Ethos />
        <Contact />
      </main>
    </>
  );
}