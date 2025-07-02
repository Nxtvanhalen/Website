import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  author: string;
}

interface SubstackFeed {
  success: boolean;
  posts: SubstackPost[];
  feedTitle?: string;
  feedDescription?: string;
  error?: string;
}

export default function Blog() {
  const [substackPosts, setSubstackPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubstackPosts = async () => {
      try {
        const response = await fetch('/api/substack');
        const data: SubstackFeed = await response.json();
        
        if (data.success) {
          setSubstackPosts(data.posts);
        } else {
          setError(data.error || 'Failed to load posts');
        }
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching Substack posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubstackPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>Musings - CLB Consultancy Blog | AI Insights & Industry Analysis</title>
        <meta name="description" content="Strategic insights, AI analysis, and industry musings from CLB Consultancy. Explore our thoughts on entertainment technology, team dynamics, and systems thinking." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Musings - CLB Consultancy Blog | AI Insights & Industry Analysis" />
        <meta property="og:description" content="Strategic insights and industry musings on AI, entertainment technology, and systems thinking from Chris Lee Bergstrom." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/blog" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/profile/chris-profile.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/blog" />
      </Head>

      <Header />

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/musing.PNG')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            transform: 'translateY(100px)',
            minHeight: '120vh'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>
      
      <main className="min-h-screen bg-transparent text-white pt-52 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-heading mb-6 glow-subtle">
              Musings
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8" style={{color: '#F5F5DC', opacity: 0.9}}>
              <span className="font-bold" style={{color: '#F5F5DC'}}>Insights forged in the fire of real-world experience.</span>{' '}
              Deep dives into AI strategy, entertainment technology, systems thinking, and the art of transformation.
            </p>
            <div className="h-0.5 bg-molten mx-auto w-32 animate-pulse-width"></div>
          </div>

          {/* Latest Substack Posts */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading mb-8 text-center" style={{color: '#F5F5DC'}}>
              Latest Musings
            </h2>
            
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-molten"></div>
                <p className="mt-4" style={{color: '#F5F5DC', opacity: 0.6}}>Loading latest posts...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/40 border border-red-500/30 rounded-lg p-6 text-center mb-8">
                <p className="text-red-300 mb-4">{error}</p>
                <a 
                  href="https://chrisleebergstrom.substack.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block py-2 px-6 bg-molten/20 border border-molten font-bold rounded hover:bg-molten/30 transition-all duration-300"
                  style={{color: '#F5F5DC'}}
                >
                  Visit Substack Directly
                </a>
              </div>
            )}
            
            {!loading && !error && substackPosts.length > 0 && (
              <>
                <div className="space-y-6 mb-12">
                  {substackPosts.map((post, index) => (
                    <article key={index} className="bg-black/40 border border-molten/30 rounded-lg p-6 backdrop-blur-sm hover:border-molten/50 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <h3 className="text-xl font-semibold mb-2 md:mb-0 md:pr-4 leading-tight" style={{color: '#F5F5DC'}}>
                          {post.title}
                        </h3>
                        <time className="text-sm whitespace-nowrap" style={{color: '#F5F5DC', opacity: 0.6}}>
                          {formatDate(post.pubDate)}
                        </time>
                      </div>
                      
                      {post.contentSnippet && (
                        <p className="leading-relaxed mb-4" style={{color: '#F5F5DC', opacity: 0.9}}>
                          {post.contentSnippet}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <a 
                          href={post.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:text-white transition-colors duration-300 font-semibold"
                          style={{color: '#F5F5DC'}}
                        >
                          Read Full Post →
                        </a>
                        <span className="text-xs" style={{color: '#F5F5DC', opacity: 0.4}}>
                          by {post.author}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="text-center">
                  <a 
                    href="https://chrisleebergstrom.substack.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block py-3 px-8 bg-molten/20 border border-molten font-bold rounded hover:bg-molten/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-molten/50"
                  style={{color: '#F5F5DC'}}
                  >
                    View All Posts on Substack
                  </a>
                </div>
              </>
            )}

            {!loading && !error && substackPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="mb-6" style={{color: '#F5F5DC', opacity: 0.6}}>New posts coming soon!</p>
                <a 
                  href="https://chrisleebergstrom.substack.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block py-3 px-8 bg-molten/20 border border-molten font-bold rounded hover:bg-molten/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-molten/50"
                  style={{color: '#F5F5DC'}}
                >
                  Subscribe on Substack
                </a>
              </div>
            )}
          </div>

          {/* Substack Integration Section */}
          <div className="bg-black/40 border border-molten/30 rounded-lg p-8 backdrop-blur-sm mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-heading mb-6" style={{color: '#F5F5DC'}}>
                Subscribe to Musings
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{color: '#F5F5DC', opacity: 0.9}}>
                Get exclusive insights on AI strategy, entertainment technology, and systems thinking delivered directly to your inbox. 
                No corporate fluff—just raw intelligence from the trenches.
              </p>
              
              {/* Substack Embed/Link */}
              <div className="bg-black/60 border border-molten/20 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{color: '#F5F5DC'}}>Ready for Strategy Born from the Wreckage?</h3>
                <p className="mb-6" style={{color: '#F5F5DC', opacity: 0.8}}>
                  Join the conversation where theatrical meets tactical, where entertainment industry wisdom 
                  collides with cutting-edge AI strategy.
                </p>
                
                <a 
                  href="https://chrisleebergstrom.substack.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block py-4 px-8 bg-molten/20 border-2 border-molten font-bold rounded-lg hover:bg-molten/30 hover:border-white transition-all duration-300 hover:scale-105 text-lg focus:outline-none focus:ring-2 focus:ring-molten/50"
                  style={{color: '#F5F5DC'}}
                >
                  Subscribe on Substack →
                </a>
              </div>
              
              <p className="text-sm" style={{color: '#F5F5DC', opacity: 0.6}}>
                Free insights, premium analysis, zero corporate speak.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-black/40 border border-molten/30 rounded-lg p-8 backdrop-blur-sm mb-24">
            <h2 className="text-3xl font-heading mb-4" style={{color: '#F5F5DC'}}>Want to Discuss These Ideas?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto" style={{color: '#F5F5DC', opacity: 0.9}}>
              Have thoughts on a piece? Questions about implementation? 
              Let's start a conversation that goes beyond surface-level consulting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:chrisleebergstrom@gmail.com?subject=Musings Discussion"
                className="inline-block py-3 px-8 bg-transparent border border-molten text-molten font-bold rounded hover:bg-molten/10 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-molten/50"
              >
                Start the Conversation
              </a>
              <span style={{color: '#F5F5DC', opacity: 0.6}}>or</span>
              <a 
                href="/#eve-chat"
                className="inline-block py-3 px-8 bg-molten/20 border border-molten text-white font-bold rounded hover:bg-molten/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-molten/50"
              >
                Chat with EVE AI
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}