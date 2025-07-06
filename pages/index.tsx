import Head from 'next/head';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <Head>
        <title>CLB Consulting | Chris Lee Bergstrom - AI Strategy & Entertainment Technology Consultant</title>
        <meta name="description" content="CLB Consulting by Chris Lee Bergstrom: Revolutionary AI-driven solutions for entertainment, production, and venue operations. Grammy-nominated expertise meets cutting-edge technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9370DB" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/images/Favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/Favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/Favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/Favicon/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="CLB Consulting | Chris Lee Bergstrom - AI Strategy & Entertainment Technology" />
        <meta property="og:description" content="CLB Consulting by Chris Lee Bergstrom: Revolutionary AI-driven solutions for entertainment, production, and venue operations. Grammy-nominated expertise meets cutting-edge technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com" />
      </Head>
      
      {/* Muted Parallax Background for Landing Page */}
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
            filter: 'brightness(0.3) saturate(0.8) blur(1px)',
            opacity: 0.4,
            zIndex: 1,
            minHeight: '120vh'
          }}
        ></div>
      </div>
      
      <main 
        className="min-h-screen flex flex-col items-center justify-center relative"
        role="main"
        aria-label="CLB Consulting Landing Page"
        style={{position: 'relative', zIndex: 10}}
      >
        {/* Chris Lee Bergstrom Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-medium" style={{color: 'rgba(147, 112, 219, 0.7)'}}>
            Chris Lee Bergstrom
          </h1>
        </div>
        
        {/* Large CLB Logo PNG with Glitchy Glow */}
        <div className="text-center mb-12">
          <img 
            src="/images/Purple Logo.png" 
            alt="CLB Consulting Logo" 
            className="w-72 md:w-96 lg:w-[32rem] h-auto mx-auto landing-logo-glow"
          />
        </div>
        
        {/* Enter Button - Blurred with Pulse and Blue Edges */}
        <Link 
          href="/home"
          className="px-12 py-4 bg-white/10 backdrop-blur-md text-white text-xl font-medium rounded-xl hover:bg-white/20 transition-all duration-500 focus:outline-none animate-pulse-slow landing-enter-button mb-8"
          aria-label="Enter CLB Consulting website"
        >
          Enter
        </Link>
        
        {/* Contact Link */}
        <div className="text-center">
          <a 
            href="mailto:chrisleebergstrom@gmail.com?subject=AI Project Inquiry - Landing Page Contact"
            className="block px-8 py-3 bg-transparent border border-molten text-molten text-lg font-medium rounded hover:bg-molten/10 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-molten focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Contact Chris Lee Bergstrom via email"
          >
            Contact
          </a>
          <div className="text-sm mt-2" style={{color: '#F5F5DC', opacity: 0.7}}>chrisleebergstrom@gmail.com</div>
        </div>
      </main>
    </div>
  );
}