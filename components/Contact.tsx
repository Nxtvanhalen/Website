'use client';

import { motion } from 'motion/react';

const VIOLET = '#9370DB';
const EMAIL = 'chrisleebergstrom@gmail.com';

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-black px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: VIOLET }}
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          ADVANCE / 06 — CONTACT
        </motion.p>

        <motion.h2
          id="contact-heading"
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          End of the Advance.
        </motion.h2>

        <motion.p
          className="font-body text-lg md:text-xl mt-8 leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'rgba(245, 245, 220, 0.85)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Got a project, a venue, a tour, an idea worth building? Send a note. Real replies, real
          fast.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
            className="group inline-flex items-center justify-center gap-3 px-10 py-4 font-heading text-sm tracking-[0.15em] uppercase rounded-sm transition-all duration-300"
            style={{
              background: VIOLET,
              color: '#000',
              boxShadow: '0 0 30px rgba(147, 112, 219, 0.4)',
            }}
          >
            Send a transmission
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        <motion.p
          className="mt-6 font-mono text-xs tracking-[0.3em] uppercase text-white/55"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {EMAIL}
        </motion.p>

        <motion.p
          className="mt-20 font-body text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'rgba(245, 245, 220, 0.55)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Also consult on venue operations, AI training, and web security — ask if it's relevant.
        </motion.p>
      </div>
    </section>
  );
}
