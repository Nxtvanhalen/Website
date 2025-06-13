import Head from 'next/head';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>CLB Consultancy</title>
        <meta name="description" content="Strategy Born from the Wreckage, Intelligence Forged in the Fire" />
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
        <meta property="og:title" content="CLB Consultancy - AI Strategy & Entertainment Technology" />
        <meta property="og:description" content="Strategy Born from the Wreckage, Intelligence Forged in the Fire. AI consulting for entertainment, hospitality, and live events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com" />
      </Head>
      
      <main 
        className="min-h-screen flex flex-col items-center justify-center relative"
        role="main"
        aria-label="CLB Consultancy Landing Page"
      >
        {/* Large CLB Logo PNG with Glitchy Glow */}
        <div className="text-center mb-16">
          <img 
            src="/images/Purple Logo.png" 
            alt="CLB Consultancy Logo" 
            className="w-72 md:w-96 lg:w-[32rem] h-auto mx-auto landing-logo-glow"
          />
        </div>
        
        {/* Enter Button - Blurred with Pulse and Blue Edges */}
        <Link 
          href="/home"
          className="px-12 py-4 bg-white/10 backdrop-blur-md text-white text-xl font-medium rounded-xl hover:bg-white/20 transition-all duration-500 focus:outline-none animate-pulse-slow landing-enter-button"
          aria-label="Enter CLB Consultancy website"
        >
          Enter
        </Link>
      </main>
    </div>
  );
}