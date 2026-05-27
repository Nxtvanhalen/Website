'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useChat } from '../context/ChatContext';

const VIOLET = '#9370DB';

export default function OffTheClock() {
  const { toggleChat } = useChat();

  return (
    <section
      id="offclock"
      aria-labelledby="offclock-heading"
      className="relative px-6 py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
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
            href="https://chrisleebergstrom.substack.com/p/the-archivist"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-sm bg-black/40 backdrop-blur-md transition-all duration-500"
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
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              <Image
                src="/images/SciFi-Chroma-Moonscape-04.png"
                alt="The Archivists — surreal moonscape with twin moons rising over a chroma-streaked desert horizon"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(147,112,219,0) 60%, rgba(147,112,219,0.18) 100%)',
                }}
              />
            </div>

            <div className="p-7 lg:p-10">
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
                Read on Substack →
              </p>
            </div>
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
