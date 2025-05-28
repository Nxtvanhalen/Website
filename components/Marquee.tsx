import { motion, useScroll, useTransform } from 'framer-motion';
import ChatPanel from './ChatPanel';

export default function Marquee() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, v => `${v * 0.5}px`);
  const logoY = useTransform(scrollY, v => `${v * 0.3}px`);
  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/bus.jpg')",
          backgroundPositionY: bgY
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMinYMin meet"
        className="absolute top-4 left-4 w-12 h-12 opacity-20 text-white overflow-visible"
        style={{ y: logoY }}
      >
        <text x="0" y="200" fontSize="200" fill="currentColor">
          CLB
        </text>
      </motion.svg>
      <div className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-20 text-center text-white">
        <motion.h1
          className="text-6xl font-heading mb-3"
          whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
        >
          Chris Lee Bergstrom
        </motion.h1>
        <div className="relative mb-16">
          <p className="text-2xl font-body opacity-90 inline-block">
            consulting, educating, preserving
          </p>
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-molten block"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-4xl font-heading mb-2 glow">
          EVE AI
        </p>
        <div className="w-full max-w-4xl h-[60vh] mt-2 bg-black rounded-lg shadow-xl overflow-hidden border border-white">
          <ChatPanel />
        </div>
      </div>
    </motion.div>
  );
}