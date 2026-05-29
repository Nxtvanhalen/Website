'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const VIOLET = '#9370DB';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  author: string;
}

interface SubstackFeed {
  success: boolean;
  posts: SubstackPost[];
  feedTitle?: string;
  feedDescription?: string;
  error?: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

type PostCardProps = {
  code: string;
  post: SubstackPost;
  delay?: number;
};

function PostCard({ code, post, delay = 0 }: PostCardProps) {
  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-sm bg-black/40 backdrop-blur-md p-6 lg:p-7 transition-all duration-500"
      style={{ border: '1px solid rgba(147, 112, 219, 0.22)' }}
      whileHover={{
        borderColor: 'rgba(147, 112, 219, 0.7)',
        boxShadow: '0 0 28px rgba(147, 112, 219, 0.22)',
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="mb-3 flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.3em]">
        <span className="text-white/55">
          {code} · Musing
        </span>
        <time className="text-white/40" dateTime={post.pubDate}>
          {formatDate(post.pubDate)}
        </time>
      </div>

      <h3 className="font-heading text-xl md:text-2xl uppercase tracking-tight leading-snug text-white">
        {post.title}
      </h3>

      {post.contentSnippet && (
        <p
          className="font-body text-base mt-4 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.78)' }}
        >
          {post.contentSnippet}
        </p>
      )}

      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase">
        <span
          className="inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
          style={{ color: VIOLET }}
        >
          Read on Substack
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
        {post.author && <span className="text-white/35">by {post.author}</span>}
      </div>
    </motion.a>
  );
}

export default function BlogClient() {
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

  return (
    <main
      id="main-content"
      className="relative bg-black text-white"
      aria-label="Musings — blog and Substack feed"
    >
      {/* Header */}
      <section className="relative px-6 pt-32 pb-12 md:pt-40 md:pb-16 lg:pt-48 lg:pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.p
            className="font-mono text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: VIOLET }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Musings
          </motion.p>
          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            From the Substack
          </motion.h1>
          <motion.p
            className="font-body text-base md:text-lg lg:text-xl max-w-3xl mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.82)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Unfiltered notes on agentic AI, live entertainment, and systems thinking. Plus{' '}
            <a
              href="https://chrisleebergstrom.substack.com/p/the-archivist"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-4 transition-colors hover:text-white"
              style={{ color: VIOLET }}
            >
              The Archivists
            </a>{' '}
            — a serialized novella in progress.
          </motion.p>
        </div>
      </section>

      {/* Feed */}
      <section className="relative px-6 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          {loading && (
            <div className="py-12 text-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: `${VIOLET} transparent ${VIOLET} ${VIOLET}` }}
              />
              <p className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                Loading latest posts
              </p>
            </div>
          )}

          {error && (
            <div
              className="rounded-sm bg-black/40 backdrop-blur-md p-7 text-center"
              style={{ border: '1px solid rgba(248, 113, 113, 0.35)' }}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 text-white/60">
                Feed unavailable
              </p>
              <p
                className="font-body text-base mb-5 leading-relaxed"
                style={{ color: 'rgba(245, 245, 220, 0.78)' }}
              >
                {error}
              </p>
              <a
                href="https://chrisleebergstrom.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors hover:text-white"
                style={{ color: VIOLET }}
              >
                Visit Substack directly →
              </a>
            </div>
          )}

          {!loading && !error && substackPosts.length > 0 && (
            <div className="space-y-5 md:space-y-6">
              {substackPosts.map((post, index) => (
                <PostCard
                  key={post.link || index}
                  code={String(index + 1).padStart(2, '0')}
                  post={post}
                  delay={Math.min(index * 0.05, 0.3)}
                />
              ))}
            </div>
          )}

          {!loading && !error && substackPosts.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 text-white/50">
                Quiet here
              </p>
              <p
                className="font-body text-base mb-6"
                style={{ color: 'rgba(245, 245, 220, 0.78)' }}
              >
                New posts coming soon.
              </p>
              <a
                href="https://chrisleebergstrom.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors hover:text-white"
                style={{ color: VIOLET }}
              >
                Subscribe on Substack →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe + CTA combined */}
      <section className="relative px-6 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="font-heading text-3xl md:text-4xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            Subscribe or send a note
          </motion.h2>
          <motion.p
            className="font-body text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.78)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Subscribing gets the musings and The Archivists straight to your inbox. Want to push
            back on something or take an idea further? Send a message instead.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://chrisleebergstrom.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 font-heading text-sm tracking-[0.15em] uppercase rounded-sm transition-all duration-300"
              style={{
                background: VIOLET,
                color: '#000',
                boxShadow: '0 0 30px rgba(147, 112, 219, 0.4)',
              }}
            >
              Subscribe on Substack
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="mailto:chrisleebergstrom@gmail.com?subject=Musings%20Discussion"
              className="inline-flex items-center justify-center px-8 py-4 font-heading text-sm tracking-[0.15em] uppercase rounded-sm border transition-all duration-300 hover:bg-white/5"
              style={{
                borderColor: 'rgba(147, 112, 219, 0.5)',
                color: VIOLET,
              }}
            >
              Send a note
            </a>
          </motion.div>
          <motion.p
            className="mt-10 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="/" className="transition-colors hover:text-white">
              ← Back to the work
            </a>
          </motion.p>
        </div>
      </section>
    </main>
  );
}
