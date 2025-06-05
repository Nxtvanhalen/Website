import Head from 'next/head';
import { useEffect } from 'react';
import Header from '../components/Header';

export default function News() {
  useEffect(() => {
    // Parallax scroll effect for News/Press page
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.news-parallax-bg') as HTMLElement;
      
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
        <title>News/Press - CLB Consultancy</title>
        <meta name="description" content="Latest news and press coverage about Chris Lee Bergstrom and CLB Consultancy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="News/Press - CLB Consultancy" />
        <meta property="og:description" content="Latest news and press coverage about Chris Lee Bergstrom and CLB Consultancy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/news" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News/Press - CLB Consultancy" />
        <meta name="twitter:description" content="Latest news and press coverage about Chris Lee Bergstrom and CLB Consultancy" />
        <meta name="twitter:image" content="https://chrisleebergstrom.com/images/profile/chris-profile-square.jpg" />
        <meta name="twitter:image:alt" content="Chris Lee Bergstrom - AI Strategy Consultant and Grammy-nominated Audio Engineer" />
      </Head>
      
      <Header />

      {/* Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div 
          className="news-parallax-bg absolute inset-0 bg-center bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/images/AI4.webp')",
            minHeight: '120vh'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" />
      </div>
      
      <main className="min-h-screen bg-transparent text-white pt-52 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading mb-12 text-center">News/Press</h1>
          
          {/* Spotify Podcast Feature */}
          <article className="bg-gradient-to-r from-green-900/30 to-gray-900/50 rounded-lg border border-green-500/40 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.08 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            
            <div className="mb-4">
              <span className="text-green-400 text-sm font-bold uppercase tracking-wide">Podcast Feature</span>
              <span className="text-gray-400 text-sm ml-4">Spotify</span>
            </div>
            
            <h2 className="text-2xl font-heading mb-6 leading-tight text-white">
              Performance Anxiety Podcast - Behind the Scenes of Touring
            </h2>
            
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-base leading-relaxed mb-4 opacity-90">
                "If you listen to this podcast, you're most likely a fan of music. And chances are, you've seen a live concert. Have you ever wondered what goes into getting a band from one show to the next? What kind of preplanning is needed? And how much more goes into an overseas tour?"
              </p>
              
              <p className="text-base leading-relaxed mb-4 opacity-90">
                "Well my guest and friend Chris Bergstrom joins me to give us all a taste of what it takes to make a tour successful and how it has changed over the years. He's worked with some incredible acts, like Black Rebel Motorcycle Club and The Dandy Warhols. But he's also worked with acts I wasn't expecting, like The Oregon Symphony Orchestra and country music star Tracy Lawrence."
              </p>
              
              <p className="text-base leading-relaxed mb-4 opacity-90">
                "He's done everything from load-ins & load-outs to Front of house, to tour management. He's got great behind the scenes stories as well as a collection of live recordings that I would kill for! But it's not all sex, drugs, & rock & roll. In fact, that stereotype has changed so much over the years. But for many, the hardest part is still acclimating to post-tour (or normal) life."
              </p>
              
              <p className="text-base leading-relaxed opacity-90">
                "Chris is candid about all of it. So if you want to follow his touring exploits, check him out @blackeyedprod on Instagram."
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://open.spotify.com/episode/4IKQSQspGrdKMzGoublusH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 transform"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.08 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Listen on Spotify
              </a>
              
              <div className="text-sm text-gray-400">
                🎧 Audio Interview
              </div>
            </div>
          </article>
          
          {/* Bandcamp Release Feature */}
          <article className="bg-gradient-to-r from-blue-900/40 to-gray-900/50 rounded-lg border border-blue-400/40 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
              </svg>
            </div>
            
            <div className="mb-4">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-wide">Live Recording</span>
              <span className="text-gray-400 text-sm ml-4">Bandcamp Release</span>
            </div>
            
            <h2 className="text-2xl font-heading mb-6 leading-tight text-white">
              The Dandy Warhols - "Warhol Wednesday Endless Live Album"
            </h2>
            
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-lg leading-relaxed mb-4 opacity-90">
                Welcome to Warhol Wednesday! We're stoked to be releasing a never-ending LIVE album for a one-time fee of $10. Come be a part of the club where every Wednesday you'll receive an exclusive download to a new live song from a past performance in a different city.
              </p>
              
              <p className="leading-relaxed mb-4 opacity-90">
                This will be a living project that keeps on expanding week after week.
              </p>
              
              <div className="border-l-4 border-blue-400 pl-6 my-6">
                <p className="text-sm leading-relaxed mb-2 opacity-80">
                  <strong>Released:</strong> September 9, 2020
                </p>
                <p className="text-sm leading-relaxed mb-2 opacity-80">
                  <strong>Band:</strong> Courtney Taylor Taylor, Peter Holmström, Zia McCabe, Brent DeBoer
                </p>
                <p className="text-sm leading-relaxed opacity-90">
                  <strong>Recorded Live by Chris Bergstrom<br/>
                  Mixed and Mastered by Chris Bergstrom</strong>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://thedandywarholsofficial.bandcamp.com/album/warhol-wednesday-endless-live-album"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 transform"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                Listen on Bandcamp
              </a>
              
              <div className="text-sm text-gray-400">
                🎸 Live Performance
              </div>
            </div>
          </article>
          
          {/* YouTube Video Feature */}
          <article className="bg-gradient-to-r from-red-900/40 to-gray-900/50 rounded-lg border border-red-500/40 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            
            <div className="mb-4">
              <span className="text-red-400 text-sm font-bold uppercase tracking-wide">Music Video</span>
              <span className="text-gray-400 text-sm ml-4">Official Release</span>
            </div>
            
            <h2 className="text-2xl font-heading mb-6 leading-tight text-white">
              The Dandy Warhols - Next Thing I Know (Official Music Video)
            </h2>
            
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-lg leading-relaxed mb-4 opacity-90">
                'Next Thing I Know' is from the band's 2019 album, <em>Why You So Crazy</em>. 
              </p>
              
              <p className="leading-relaxed mb-4 opacity-90">
                Listen to current album <strong>ROCKMAKER</strong> now at Sunset Blvd Records.
              </p>
              
              <p className="leading-relaxed opacity-90">
                <strong>Video edited by Chris Bergstrom with Ticky Hambly</strong>
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://youtu.be/4WOSPFjKH3Y?si=L8scdGw4JsCyGqol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 transform"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch on YouTube
              </a>
              
              <div className="text-sm text-gray-400">
                🎥 Video Content
              </div>
            </div>
          </article>
          
          {/* Mix Online Article - Newest */}
          <article className="bg-gray-900/50 rounded-lg border border-molten/30 p-8 mb-8">
            <div className="mb-4">
              <span className="text-molten text-sm font-bold uppercase tracking-wide">Mix Online</span>
              <span className="text-gray-400 text-sm ml-4">January 21, 2022</span>
            </div>
            
            <h2 className="text-2xl font-heading mb-6 leading-tight">
              Chris Bergstrom Assembles Campfire Audio Toolkit for Mixing On and Off-Stage
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-4 opacity-90">
                Sound engineer with nearly 20 years of experience, Chris Bergstrom mixes live sound for The Dandy Warhols and Oregon Symphony, utilizing Campfire Audio in-ear monitors for consistent monitoring across diverse performance environments.
              </p>
              
              <blockquote className="border-l-4 border-molten pl-6 my-6 italic text-lg opacity-80">
                "I don't believe audio engineers should insert much of themselves in the project. Accurate audio is what I need."
              </blockquote>
              
              <p className="leading-relaxed mb-4 opacity-90">
                Bergstrom's approach emphasizes close collaboration with artists to achieve their sound vision, using virtual playback methods during soundchecks and preferring Campfire Audio Solstice and Equinox IEMs for different mixing scenarios.
              </p>
              
              <p className="leading-relaxed opacity-90">
                The engineer values precision and accuracy in audio reproduction, having shifted to using IEMs over speakers in studio work during quarantine. He appreciates Campfire Audio for their "Hi-Fi origins and durability" and considers them essential to his professional toolkit.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <a 
                href="https://www.mixonline.com/the-wire/chris-bergstrom-assembles-campfire-audio-toolkit-for-mixing-on-and-off-stage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-molten hover:text-white transition-colors duration-300 font-bold"
              >
                Read Full Article →
              </a>
            </div>
          </article>
          
          {/* Music Radar Article */}
          <article className="bg-gray-900/50 rounded-lg border border-molten/30 p-8 mb-8">
            <div className="mb-4">
              <span className="text-molten text-sm font-bold uppercase tracking-wide">Music Radar</span>
              <span className="text-gray-400 text-sm ml-4">June 24, 2021</span>
            </div>
            
            <h2 className="text-2xl font-heading mb-6 leading-tight">
              Sound advice and mixing know-how from pro engineer Chris Bergstrom
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-4 opacity-90">
                Professional audio engineer Chris Bergstrom shares insights from his extensive career mixing live sound for major acts including The Dandy Warhols and Oregon Symphony, offering practical advice for aspiring sound engineers.
              </p>
              
              <p className="leading-relaxed mb-4 opacity-90">
                Drawing from decades of experience in both live and studio environments, Bergstrom discusses the evolution of mixing techniques, the importance of accurate monitoring, and the collaborative process between engineers and artists.
              </p>
              
              <p className="leading-relaxed opacity-90">
                The article explores his professional philosophy on sound engineering, technical expertise with cutting-edge audio equipment, and the critical skills needed to succeed in today's competitive audio industry.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <a 
                href="https://www.musicradar.com/news/sound-advice-and-mixing-know-how-from-pro-engineer-chris-bergstrom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-molten hover:text-white transition-colors duration-300 font-bold"
              >
                Read Full Article →
              </a>
            </div>
          </article>
          
          <div className="text-center py-12">
            <p className="text-lg opacity-70">More press coverage coming soon...</p>
          </div>

          {/* Contact Section */}
          <section className="py-12 px-6 text-center">
            <h2 className="text-3xl font-heading mb-6">Let's start discussing how I can set you up for success.</h2>
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
                <p className="text-sm text-molten/70 flex items-center justify-center space-x-2">
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