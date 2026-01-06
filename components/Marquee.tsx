import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useChat } from '../context/ChatContext';
import SectionTracker from './SectionTracker';

export default function Marquee() {
  const { openChat } = useChat();
  const containerRef = useRef<HTMLDivElement>(null);
  /* 
    EXPERIMENTAL CONTAINER STYLES
    Uncomment one of the following lines to switch styles.
  */
  /* Option 1: Current (Purple Border Glass) */
  /* const boxStyle = "bg-black/30 border-2 border-purple-400 rounded-lg p-4 w-full max-w-[340px] lg:w-[300px] h-[220px] backdrop-blur-sm shadow-lg flex flex-row justify-between items-center gap-4 lg:gap-2"; */

  /* Option 2: Modern Clean Glass (No Border, High Blur) */
  /* const boxStyle = "bg-white/5 border border-white/10 rounded-xl p-4 w-full max-w-[340px] lg:w-[300px] h-[220px] backdrop-blur-md shadow-xl flex flex-row justify-between items-center gap-4 lg:gap-2 hover:bg-white/10 transition-colors"; */

  /* Option 3: Neon Molten Glow */
  const boxStyle = "bg-black/80 !border-2 !border-mauve/50 rounded-lg p-4 w-full max-w-[340px] lg:w-[300px] h-[220px] !shadow-[0_0_30px_rgba(147,112,219,0.4)] flex flex-row justify-between items-center gap-4 lg:gap-2 hover:!shadow-[0_0_40px_rgba(147,112,219,0.6)] transition-shadow duration-300";

  /* Option 4: Minimal Dark (Solid) */
  /* const boxStyle = "bg-zinc-900/90 border border-zinc-800 rounded-lg p-4 w-full max-w-[340px] lg:w-[300px] h-[220px] flex flex-row justify-between items-center gap-4 lg:gap-2"; */

  /* ACTIVE STYLE */
  /* const boxStyle = "bg-black/30 border-2 border-purple-400 rounded-lg p-4 w-full max-w-[340px] lg:w-[300px] h-[220px] backdrop-blur-sm shadow-lg flex flex-row justify-between items-center gap-4 lg:gap-2"; */

  /* 
    EXPERIMENTAL TITLE STYLES
    Uncomment one of the following lines to switch styles.
  */
  /* Option 1: Plain White (Current) */
  /* const titleStyle = "text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 text-center text-white"; */

  /* Option 2: Cinematic Wide (Tracking + Light) */
  const titleStyle = "text-5xl lg:text-6xl font-heading mb-2 transition-transform duration-200 ease-out hover:-translate-y-0.5 text-center text-white tracking-[0.2em] font-light uppercase";

  /* Option 3: Hollow Outline */
  /* const titleStyle = "text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 text-center text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] hover:[-webkit-text-stroke:1px_rgba(147,112,219,1)] transition-colors"; */

  /* Option 4: Purple Gradient */
  /* const titleStyle = "text-6xl font-heading mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-mauve"; */

  const galleryRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const isUserInteractingRef = useRef(false);

  // Respect prefers-reduced-motion - stop gallery auto-scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsUserInteracting(true);
      isUserInteractingRef.current = true;
    }
  }, []);

  // Auto-scroll animation using setInterval for simplicity
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Wait for component to mount
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (galleryRef.current && !isUserInteractingRef.current) {
          const container = galleryRef.current;
          const currentScroll = container.scrollLeft;
          const scrollAmount = 1; // pixels per frame

          // Calculate max scroll before reset
          const itemWidth = 344; // 320px + 24px gap
          const totalItems = 9;
          const resetPoint = itemWidth * totalItems;

          if (currentScroll >= resetPoint) {
            // Reset to start
            container.scrollLeft = 0;
          } else {
            // Normal scroll
            container.scrollLeft = currentScroll + scrollAmount;
          }
        }
      }, 20); // Run every 20ms (50fps)
    }, 1000); // Wait 1 second before starting

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  // Touch/Mouse handlers
  const handleTouchStart = () => {
    setIsUserInteracting(true);
    isUserInteractingRef.current = true;
  };

  const handleTouchEnd = () => {
    // Small delay before resuming auto-scroll for natural feel
    setTimeout(() => {
      setIsUserInteracting(false);
      isUserInteractingRef.current = false;
    }, 1000); // Increased delay for better UX
  };

  // Prevent context menu on gallery images
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  // Gallery image component
  const GalleryImage = ({ src, alt }: { src: string; alt: string }) => {
    return (
      <div className="gallery-item-with-watermark flex-shrink-0 w-80 h-60 rounded-lg border border-molten/30 overflow-hidden relative">
        <Image
          src={src}
          alt={alt}
          width={320}
          height={240}
          className="w-full h-full object-cover"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          draggable={false}
          loading="lazy"
          quality={85}
          onError={(e) => {
            console.log('Image failed to load:', src);
            const target = e.target as HTMLImageElement;
            target.style.opacity = '0.3';
            target.style.background = '#333';
          }}
        />
        <div className="gallery-watermark">
          <Image
            src="/images/Purple Logo.png"
            alt="A stylized purple 'CLB' logo composed of bold geometric shapes. The letters incorporate circuit-like lines and nodes, blending a modern tech aesthetic with clean, minimalist typography on a white background."
            width={48}
            height={12}
            className="h-3 w-auto opacity-60"
          />
        </div>
      </div>
    );
  };

  // Sub-CTA categories for services
  const subCTAs = [
    { label: "Operations", subject: "Operational Consulting Inquiry" },
    { label: "AI Training", subject: "AI Education & Training Inquiry" },
    { label: "Web Security", subject: "Guardian / Web Security Inquiry" },
    { label: "Executive Coaching", subject: "Executive Coaching Inquiry" }
  ];

  // Service cards data
  const serviceCards = [
    {
      title: "OPERATIONAL CONSULTING",
      description: "Logistics, production systems, and workflow optimization",
      subject: "Operational Consulting Inquiry"
    },
    {
      title: "AI EDUCATION & TRAINING",
      description: "In the top 3.7% of AI users worldwide. Ethics, implementation, and practical training for teams.",
      subject: "AI Education & Training Inquiry"
    },
    {
      title: "GUARDIAN / WEB SECURITY",
      description: "Bot protection, ticket scalping protection, security hardening, and accessibility for venue websites",
      subject: "Guardian / Web Security Inquiry"
    },
    {
      title: "EXECUTIVE COACHING",
      description: "Strategic guidance for arts leaders navigating growth and change",
      subject: "Executive Coaching Inquiry"
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-visible mb-16">
      <div className="marquee-content scroll-fade relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-16 md:pt-32 pb-16 text-center text-white">
        {/* Mobile Profile Picture - Above heading */}
        <div className="md:hidden mb-2 flex justify-center">
          <div className="w-20 h-20 rounded-full border border-molten/50 overflow-hidden bg-gradient-to-br from-molten/30 to-gray-700/50 relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-top"
            >
              <source src="/videos/cbai-profile-v2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Chris Lee Bergstrom heading with CTA box */}
        <SectionTracker
          name="Homepage - Hero"
          className="w-full mb-6"
          butlerMessage="Operations, AI training, web security, or leadership coaching—Chris has you covered. Reach out or ask me more."
        >
          <motion.h1
            className={titleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Chris Lee Bergstrom
          </motion.h1>
          <motion.p
            className="text-sm md:text-base font-heading font-light text-white tracking-wide text-center max-w-2xl mx-auto mb-6 transition-transform duration-200 ease-out hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            20 years in live entertainment. Now I help venues and arts organizations operate smarter, safer, and more efficiently.
          </motion.p>

          {/* CTA Boxes Layout */}
          <motion.div
            className="flex justify-center items-stretch gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Operational Consulting Box - Links to dedicated page */}
            <Link href="/operations-consulting" className="block">
              <motion.div
                className={boxStyle}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  role="region"
                  aria-label="Operational Consulting - Click to learn more"
                  className="w-full h-full flex flex-row justify-between items-center gap-4 lg:gap-2"
                >
                  <motion.div
                    className="w-1/2 h-full rounded overflow-hidden relative cursor-pointer flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <video
                      src="/videos/operations-loop.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain scale-[1.65] opacity-50"
                      aria-label="Operational Consulting - Logistics, production systems, and workflow optimization"
                      style={{
                        mask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        maskComposite: 'intersect',
                        WebkitMask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskComposite: 'source-in'
                      }}
                    />
                  </motion.div>
                  <div className="w-1/2 flex flex-col justify-center items-center">
                    <div
                      className="nav-link text-center block w-full py-0 glow-subtle"
                      style={{ color: '#F5F5DC', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}
                    >
                      Operational Consulting
                    </div>
                    <p className="text-[13px] leading-tight text-center mt-1 opacity-80 italic" style={{ color: '#F5F5DC' }}>
                      The whole venue, not just the stage.<br />
                      <strong className="not-italic">Booking</strong>, <strong className="not-italic">marketing</strong>, <strong className="not-italic">F&B</strong>, <strong className="not-italic">security</strong>, and <strong className="not-italic">safety</strong>.<br />
                      Analyzed from load in to load out.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* AI Education and Training Box */}
            <motion.div
              className={boxStyle}
              whileHover={{ scale: 1.02 }}
            >
              <div
                role="region"
                aria-label="AI Education and Training"
                className="w-full h-full flex flex-row justify-between items-center gap-4 lg:gap-2"
              >
                <motion.div
                  className="w-1/2 h-full rounded overflow-hidden relative cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <video
                    src="/videos/ai-training-loop.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain scale-[1.65] opacity-50"
                    aria-label="AI Education and Training - In the top 3.7% of AI users worldwide, offering ethics and implementation training for teams ready to lead"
                    style={{
                      mask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                      maskComposite: 'intersect',
                      WebkitMask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                      WebkitMaskComposite: 'source-in'
                    }}
                  />
                </motion.div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                  <div
                    className="nav-link text-center block w-full py-0"
                    style={{ color: '#F5F5DC', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}
                  >
                    AI Education & Training
                  </div>
                  <p className="text-sm leading-tight text-center mt-1 opacity-80 italic" style={{ color: '#F5F5DC' }}>
                    In the <strong className="not-italic">top 3.7%</strong> of AI users worldwide.<br />
                    From <strong className="not-italic">ethics</strong> to <strong className="not-italic">implementation</strong>—<br />
                    practical training for <strong className="not-italic">teams</strong> ready to lead.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Guardian / Web Security Box */}
            <motion.div
              className={boxStyle}
              whileHover={{ scale: 1.02 }}
            >
              <div
                role="region"
                aria-label="Guardian Web Security"
                className="w-full h-full flex flex-row justify-between items-center gap-4 lg:gap-2"
              >
                <motion.div
                  className="w-1/2 h-full rounded overflow-hidden relative cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <video
                    src="/videos/guardian-loop.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain scale-[1.65] opacity-50"
                    aria-label="Guardian Web Security - Bot protection, ticket scalping protection, security hardening, and accessibility for venue websites"
                    style={{
                      mask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                      maskComposite: 'intersect',
                      WebkitMask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                      WebkitMaskComposite: 'source-in'
                    }}
                  />
                </motion.div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                  <div
                    className="nav-link text-center block w-full py-0"
                    style={{ color: '#F5F5DC', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}
                  >
                    Guardian / Web Security
                  </div>
                  <p className="text-sm leading-tight text-center mt-1 opacity-80 italic" style={{ color: '#F5F5DC' }}>
                    Protect your venue from <strong className="not-italic">bots</strong> and <strong className="not-italic">scalpers</strong>.<br />
                    Protect your audience with <strong className="not-italic">accessible</strong>, <strong className="not-italic">compliant</strong> design.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Executive Coaching Box */}
            <motion.div
              className={boxStyle}
              whileHover={{ scale: 1.02 }}
            >
              <div
                role="region"
                aria-label="Executive Coaching"
                className="w-full h-full flex flex-row justify-between items-center gap-4 lg:gap-2"
              >
                <motion.div
                  className="w-1/2 h-full rounded overflow-hidden relative cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <video
                    src="/videos/coaching-loop.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain scale-[1.65] opacity-50"
                    aria-label="Executive Coaching - Strategic guidance for arts leaders navigating growth and change"
                    style={{
                      mask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                      maskComposite: 'intersect',
                      WebkitMask: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                      WebkitMaskComposite: 'source-in'
                    }}
                  />
                </motion.div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                  <div
                    className="nav-link text-center block w-full py-0"
                    style={{ color: '#F5F5DC', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}
                  >
                    Executive Coaching
                  </div>
                  <p className="text-sm leading-tight text-center mt-1 opacity-80 italic" style={{ color: '#F5F5DC' }}>
                    Smart leaders ask for help.<br />
                    <strong className="not-italic">Governance</strong>, <strong className="not-italic">leadership development</strong>, <strong className="not-italic">boards</strong>, <strong className="not-italic">budgets</strong>—<br />
                    and the chaos between vision and execution.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA Box */}
            <motion.div
              className={`${boxStyle} relative overflow-hidden flex-col !gap-4 !justify-center basis-full max-w-[280px] !border-4 !shadow-[0_0_50px_rgba(147,112,219,0.8)] hover:!shadow-[0_0_70px_rgba(147,112,219,0.95)]`}
              role="region"
              aria-label="Primary call to action"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Headline */}
              <p className="nav-link text-center" style={{ color: '#F5F5DC', fontSize: '14px', fontWeight: 700 }}>
                Let's build the future of live experience — together.
              </p>

              {/* Let's Talk Button */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block py-2 px-6 bg-black border border-molten text-molten text-sm font-medium rounded hover:bg-black/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-molten focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Scroll to contact section"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
              </motion.a>

              {/* Email link */}
              <a
                href="mailto:chrisleebergstrom@gmail.com"
                className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: '#F5F5DC' }}
              >
                chrisleebergstrom@gmail.com
              </a>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {subCTAs.map((cta, index) => (
                  <motion.a
                    key={index}
                    href={`mailto:chrisleebergstrom@gmail.com?subject=${encodeURIComponent(cta.subject)}`}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-mauve/60 text-mauve hover:border-mauve hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    {cta.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </SectionTracker>
        <motion.p
          className="text-xl font-body italic text-center mb-8 max-w-2xl opacity-90"
          style={{ color: '#F5F5DC' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          "The advancement of the arts is directly related to the advancement of a society"
        </motion.p>

        {/* BRMC2 Circular Image */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full border-2 border-molten/50 overflow-hidden relative shadow-[0_0_15px_rgba(147,112,219,0.3)]">
            <Image
              src="/images/gallery/BRMC2.webp"
              alt="Chris Lee Bergstrom mixing live sound for Black Rebel Motorcycle Club concert"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Horizontal scrolling gallery - ticker style */}
        <SectionTracker
          name="Homepage - Gallery"
          className="mb-2 w-full max-w-6xl mx-auto px-4"
          butlerMessage="A visual history of chaos tamed. See a project that catches your eye?"
        >
          <div
            ref={galleryRef}
            className="gallery-container overflow-x-scroll overflow-y-hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'auto' // Prevent smooth scrolling conflicts
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            onFocus={handleTouchStart}
            onBlur={handleTouchEnd}
            tabIndex={0}
            aria-label="Gallery of project images - focus to pause scrolling"
          >
            <div
              className="gallery-track flex gap-6"
              style={{ width: 'max-content' }}
              role="img"
              aria-label="Interactive gallery of project screenshots and portfolio images"
            >
              {/* First set of items - starting with Project9 as first */}
              <GalleryImage src="/images/gallery/Project9.webp" alt="Pic of reflection of a long road in mirrored glasses, the 1000 mile stare" />
              <GalleryImage src="/images/gallery/Project1.webp" alt="A wide nighttime view of an outdoor concert shows a large crowd gathered behind security barriers, facing a brightly lit main stage. Purple and pink stage lights fill the air with haze, while large video screens on both sides display the performer. A central access walkway leads from the foreground toward the stage, emphasizing the scale and energy of the live music event." />
              <GalleryImage src="/images/gallery/Project2.webp" alt="View from a theater balcony shows a large stage framed by ornate architecture and bathed in blue and purple lighting, with a full band performing beneath a backdrop reading 'The Dandy Warhols.' In the foreground, a digital audio mixing console with colorful illuminated controls and screens is visible, emphasizing the perspective of live sound mixing during a concert in Portland, OR at the Arlene Schnitzer Concert Hall." />
              <GalleryImage src="/images/gallery/Project3.webp" alt="Silhouetted musicians perform on a dimly lit stage, backlit by intense white light and haze. A guitarist and vocalist are visible in profile near microphones, while the audience stands close at the front of the stage, faces faintly illuminated by the glow, capturing the raw atmosphere of an intimate live concert." />
              <GalleryImage src="/images/gallery/BRMC2.webp?v=20250628" alt="A large, packed concert audience fills a historic theater, facing a brightly lit stage beneath an ornate arched proscenium. Hundreds of people stand shoulder to shoulder with hands raised and clapping, while performers are visible onstage under warm and cool stage lights, capturing the energy of a live music performance." />
              <GalleryImage src="/images/gallery/Project5.webp" alt="A sound engineer sits with their back to the camera at a control desk filled with laptops, audio interfaces, and multiple computer monitors displaying mixing software. The setup faces a concert stage with lighting fixtures, equipment cases, and a textured stage backdrop visible. Cables, racks of audio gear, and tools surround the workstation, conveying an active live-production environment during setup or rehearsal." />
              <GalleryImage src="/images/gallery/Project6AI.webp" alt="International Tour Management, Pic of Chris in Chicago next to a tour bus" />
              <GalleryImage src="/images/gallery/Project7.webp" alt="A large professional audio mixing console fills the frame in a dimly lit concert environment. Rows of faders, knobs, and illuminated buttons stretch across the surface, with a printed setlist resting near the center. Stage lighting and equipment racks glow in the background, suggesting a live music performance in progress." />
              <GalleryImage src="/images/gallery/Project8.webp" alt="A vivid rainbow arcs across a stormy gray sky above a straight paved road. On the right, the smooth reflective side of a large vehicle mirrors the road, grassy hills, and the rainbow, creating a symmetrical reflection that emphasizes the open landscape and dramatic weather." />
              {/* Duplicate set for seamless loop */}
              <GalleryImage src="/images/gallery/Project9.webp" alt="Pic of reflection of a long road in mirrored glasses, the 1000 mile stare" />
              <GalleryImage src="/images/gallery/Project1.webp" alt="A wide nighttime view of an outdoor concert shows a large crowd gathered behind security barriers, facing a brightly lit main stage. Purple and pink stage lights fill the air with haze, while large video screens on both sides display the performer. A central access walkway leads from the foreground toward the stage, emphasizing the scale and energy of the live music event." />
              <GalleryImage src="/images/gallery/Project2.webp" alt="View from a theater balcony shows a large stage framed by ornate architecture and bathed in blue and purple lighting, with a full band performing beneath a backdrop reading 'The Dandy Warhols.' In the foreground, a digital audio mixing console with colorful illuminated controls and screens is visible, emphasizing the perspective of live sound mixing during a concert in Portland, OR at the Arlene Schnitzer Concert Hall." />
              <GalleryImage src="/images/gallery/Project3.webp" alt="Silhouetted musicians perform on a dimly lit stage, backlit by intense white light and haze. A guitarist and vocalist are visible in profile near microphones, while the audience stands close at the front of the stage, faces faintly illuminated by the glow, capturing the raw atmosphere of an intimate live concert." />
              <GalleryImage src="/images/gallery/BRMC2.webp?v=20250628" alt="A large, packed concert audience fills a historic theater, facing a brightly lit stage beneath an ornate arched proscenium. Hundreds of people stand shoulder to shoulder with hands raised and clapping, while performers are visible onstage under warm and cool stage lights, capturing the energy of a live music performance." />
              <GalleryImage src="/images/gallery/Project5.webp" alt="A sound engineer sits with their back to the camera at a control desk filled with laptops, audio interfaces, and multiple computer monitors displaying mixing software. The setup faces a concert stage with lighting fixtures, equipment cases, and a textured stage backdrop visible. Cables, racks of audio gear, and tools surround the workstation, conveying an active live-production environment during setup or rehearsal." />
              <GalleryImage src="/images/gallery/Project6AI.webp" alt="International Tour Management, Pic of Chris in Chicago next to a tour bus" />
              <GalleryImage src="/images/gallery/Project7.webp" alt="A large professional audio mixing console fills the frame in a dimly lit concert environment. Rows of faders, knobs, and illuminated buttons stretch across the surface, with a printed setlist resting near the center. Stage lighting and equipment racks glow in the background, suggesting a live music performance in progress." />
              <GalleryImage src="/images/gallery/Project8.webp" alt="A vivid rainbow arcs across a stormy gray sky above a straight paved road. On the right, the smooth reflective side of a large vehicle mirrors the road, grassy hills, and the rainbow, creating a symmetrical reflection that emphasizes the open landscape and dramatic weather." />
            </div>
          </div>
        </SectionTracker>


      </div>
    </div>
  );
}