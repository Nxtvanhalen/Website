'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function IndexClient() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Video Background for Landing Page */}
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
            filter: 'brightness(0.3) saturate(0.8) blur(1px)',
            opacity: 0.4,
            zIndex: 1,
            transform: 'scale(1.15)',
          }}
        >
          <source src="/videos/circuitry-bg-fade.mp4" type="video/mp4" />
        </video>
      </div>

      <main
        className="min-h-screen flex flex-col items-center justify-center relative"
        aria-label="Chris Lee Bergstrom — Landing"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {/* Chris Lee Bergstrom Name */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-heading font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Chris Lee Bergstrom
          </motion.h1>
        </div>

        {/* Animated CLB Logo */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-72 md:w-96 lg:w-[32rem] h-auto mx-auto opacity-70"
            style={{
              mask: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMask:
                'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <source src="/videos/animated-logo-trimmed.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Enter Button - Blurred with Pulse and Blue Edges */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link
            href="/home"
            className="px-12 py-4 bg-white/10 backdrop-blur-md text-white text-xl font-medium rounded-xl hover:bg-white/20 transition-all duration-500 focus:outline-none animate-pulse-slow landing-enter-button"
            aria-label="Enter the site"
          >
            Enter
          </Link>
        </motion.div>

        {/* Contact Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <a
            href="mailto:chrisleebergstrom@gmail.com?subject=AI Project Inquiry - Landing Page Contact"
            className="block px-8 py-3 bg-transparent border border-molten text-molten text-lg font-medium rounded hover:bg-molten/10 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-molten focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Contact Chris Lee Bergstrom via email"
          >
            Contact
          </a>
          <div className="text-sm mt-2" style={{ color: '#F5F5DC', opacity: 0.7 }}>
            chrisleebergstrom@gmail.com
          </div>
        </motion.div>
      </main>
    </div>
  );
}
