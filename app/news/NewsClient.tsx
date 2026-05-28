'use client';

import { motion } from 'motion/react';

const VIOLET = '#9370DB';

type PressCardProps = {
  code: string;
  kind: string;
  source: string;
  date?: string;
  title: string;
  body: React.ReactNode;
  pullquote?: string;
  meta?: string;
  cta: { label: string; href: string };
  delay?: number;
};

function PressCard({
  code,
  kind,
  source,
  date,
  title,
  body,
  pullquote,
  meta,
  cta,
  delay = 0,
}: PressCardProps) {
  return (
    <motion.article
      className="relative rounded-sm bg-black/40 backdrop-blur-md p-7 md:p-9 transition-all duration-500"
      style={{ border: '1px solid rgba(147, 112, 219, 0.22)' }}
      whileHover={{
        borderColor: 'rgba(147, 112, 219, 0.7)',
        boxShadow: '0 0 32px rgba(147, 112, 219, 0.22)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="mb-5 flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.3em]">
        <span className="text-white/55">
          {code} · {kind} · {source}
        </span>
        {date && <span className="text-white/40">{date}</span>}
      </div>

      <h2 className="font-heading text-xl md:text-2xl lg:text-3xl uppercase tracking-tight leading-snug text-white">
        {title}
      </h2>

      <div
        className="font-body text-base mt-5 leading-relaxed space-y-4"
        style={{ color: 'rgba(245, 245, 220, 0.82)' }}
      >
        {body}
      </div>

      {pullquote && (
        <blockquote
          className="font-body text-base md:text-lg italic mt-6 leading-relaxed pl-5 border-l-2 text-white"
          style={{ borderColor: VIOLET }}
        >
          {pullquote}
        </blockquote>
      )}

      {meta && (
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase mt-6 text-white/60">
          {meta}
        </p>
      )}

      <div className="mt-7 pt-5 border-t border-white/10">
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/80 transition-colors duration-300 hover:text-white"
          style={{ color: VIOLET }}
        >
          <span>{cta.label}</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </motion.article>
  );
}

export default function NewsClient() {
  return (
    <main
      id="main-content"
      className="relative bg-black text-white"
      aria-label="News and Press"
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
            Press
          </motion.p>
          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            News & Press
          </motion.h1>
          <motion.p
            className="font-body text-base md:text-lg lg:text-xl max-w-3xl mt-6 leading-relaxed"
            style={{ color: 'rgba(245, 245, 220, 0.82)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Podcast appearances, mixing-philosophy interviews, live recordings, and the credits
            that came out of the road work.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="relative px-6 py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
          <PressCard
            code="01"
            kind="Podcast"
            source="Spotify"
            title="Performance Anxiety Podcast — behind the scenes of touring"
            body={
              <>
                <p>
                  Chris joins host Adam Grimm for a long-form conversation on what it actually
                  takes to keep a tour moving: load-ins, front-of-house, tour management, the
                  difference between a domestic run and an overseas one.
                </p>
                <p>
                  Bands and rooms mentioned: The Dandy Warhols, Black Rebel Motorcycle Club,
                  Tracy Lawrence, the Oregon Symphony.
                </p>
                <p>
                  Honest on the harder parts too — touring's old stereotype, what's actually
                  changed, and the part nobody warns you about: acclimating back to normal life
                  after the bus stops.
                </p>
              </>
            }
            cta={{
              label: 'Listen on Spotify',
              href: 'https://open.spotify.com/episode/4IKQSQspGrdKMzGoublusH',
            }}
            delay={0}
          />

          <PressCard
            code="02"
            kind="Live recording"
            source="Bandcamp"
            date="2020"
            title='The Dandy Warhols — "Warhol Wednesday Endless Live Album"'
            body={
              <p>
                A never-ending live album. Every Wednesday subscribers get a new live song from a
                past performance in a different city — a living archive that keeps growing week
                after week.
              </p>
            }
            meta="Recorded live, mixed, and mastered by Chris Bergstrom · Band: Courtney Taylor Taylor, Peter Holmström, Zia McCabe, Brent DeBoer"
            cta={{
              label: 'Listen on Bandcamp',
              href: 'https://thedandywarholsofficial.bandcamp.com/album/warhol-wednesday-endless-live-album',
            }}
            delay={0.05}
          />

          <PressCard
            code="03"
            kind="Music video"
            source="YouTube"
            title='The Dandy Warhols — "Next Thing I Know" (official music video)'
            body={
              <p>
                Off the band's 2019 album <em>Why You So Crazy</em>. Their current LP{' '}
                <em>ROCKMAKER</em> is out on Sunset Blvd Records.
              </p>
            }
            meta="Edited by Chris Bergstrom with Ticky Hambly"
            cta={{
              label: 'Watch on YouTube',
              href: 'https://youtu.be/4WOSPFjKH3Y?si=L8scdGw4JsCyGqol',
            }}
            delay={0.1}
          />

          <PressCard
            code="04"
            kind="Feature"
            source="Mix Online"
            date="January 21, 2022"
            title="Chris Bergstrom assembles a Campfire Audio toolkit for mixing on and off-stage"
            body={
              <>
                <p>
                  Nearly two decades of mixing live sound — The Dandy Warhols, the Oregon
                  Symphony — and a working setup built around Campfire Audio in-ear monitors for
                  consistent monitoring across very different rooms.
                </p>
                <p>
                  The piece runs through virtual playback during soundchecks, the Solstice and
                  Equinox IEMs for different scenarios, and the shift from speakers to in-ears
                  for studio work during quarantine.
                </p>
              </>
            }
            pullquote="I don't believe audio engineers should insert much of themselves in the project. Accurate audio is what I need."
            cta={{
              label: 'Read on Mix Online',
              href: 'https://www.mixonline.com/the-wire/chris-bergstrom-assembles-campfire-audio-toolkit-for-mixing-on-and-off-stage',
            }}
            delay={0.15}
          />

          <PressCard
            code="05"
            kind="Interview"
            source="MusicRadar"
            date="June 24, 2021"
            title="Sound advice and mixing know-how from pro engineer Chris Bergstrom"
            body={
              <p>
                Mixing techniques from years of live and studio work — the importance of accurate
                monitoring, the collaborative process between engineer and artist, and the skills
                that translate from the road into the studio.
              </p>
            }
            cta={{
              label: 'Read on MusicRadar',
              href: 'https://www.musicradar.com/news/sound-advice-and-mixing-know-how-from-pro-engineer-chris-bergstrom',
            }}
            delay={0.2}
          />

          <motion.p
            className="text-center font-mono text-[10px] tracking-[0.3em] uppercase pt-8 text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            More press coverage on the way
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="font-heading text-3xl md:text-4xl uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            Need a quote or want to talk shop?
          </motion.h2>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <a
              href="mailto:chrisleebergstrom@gmail.com?subject=Press%20Inquiry"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 font-heading text-sm tracking-[0.15em] uppercase rounded-sm transition-all duration-300"
              style={{
                background: VIOLET,
                color: '#000',
                boxShadow: '0 0 30px rgba(147, 112, 219, 0.4)',
              }}
            >
              Send a message
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 font-heading text-sm tracking-[0.15em] uppercase rounded-sm border transition-all duration-300 hover:bg-white/5"
              style={{
                borderColor: 'rgba(147, 112, 219, 0.5)',
                color: VIOLET,
              }}
            >
              ← Back to the work
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
