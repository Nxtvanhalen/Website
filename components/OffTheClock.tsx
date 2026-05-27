'use client';

import { motion } from 'motion/react';
import { useChat } from '../context/ChatContext';

const VIOLET = '#9370DB';

export default function OffTheClock() {
  const { toggleChat } = useChat();

  return (
    <section
      id="offclock"
      aria-labelledby="offclock-heading"
      className="relative bg-black px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: VIOLET }}
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          ADVANCE / 05 — OFF THE CLOCK
        </motion.p>

        <motion.h2
          id="offclock-heading"
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Off the Clock
        </motion.h2>

        <motion.p
          className="font-body text-base md:text-lg max-w-2xl mt-6 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.72)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Same brain, different mediums.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <motion.a
            href="https://chrisleebergstrom.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-sm bg-black/40 backdrop-blur-md p-7 lg:p-10 transition-all duration-500"
            style={{ border: '1px solid rgba(147, 112, 219, 0.22)' }}
            whileHover={{
              borderColor: 'rgba(147, 112, 219, 0.7)',
              boxShadow: '0 0 32px rgba(147, 112, 219, 0.25)',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
              style={{ color: VIOLET }}
            >
              Substack · Serialized novella
            </p>
            <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-tight text-white">
              The Archivists
            </h3>
            <p
              className="font-body text-base mt-5 leading-relaxed"
              style={{ color: 'rgba(245, 245, 220, 0.82)' }}
            >
              A serialized novella, in progress. Same brain that built the live shows and the
              software — different medium, closer to where the fiction was always headed.
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-white/70 transition-colors group-hover:text-white">
              chrisleebergstrom.substack.com →
            </p>
          </motion.a>

          <motion.button
            type="button"
            onClick={toggleChat}
            className="group relative block text-left rounded-sm bg-black/40 backdrop-blur-md p-7 lg:p-10 cursor-pointer transition-all duration-500"
            style={{ border: '1px solid rgba(147, 112, 219, 0.22)' }}
            whileHover={{
              borderColor: 'rgba(147, 112, 219, 0.7)',
              boxShadow: '0 0 32px rgba(147, 112, 219, 0.25)',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
              style={{ color: VIOLET }}
            >
              Working demo · AI concierge
            </p>
            <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-tight text-white">
              EVE
            </h3>
            <p
              className="font-body text-base mt-5 leading-relaxed"
              style={{ color: 'rgba(245, 245, 220, 0.82)' }}
            >
              The site's own AI concierge. Knows the work, the road, and how to reach Chris. Not a
              widget — a working demo of how the build process actually runs.
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-white/70 transition-colors group-hover:text-white">
              Open the chat →
            </p>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
