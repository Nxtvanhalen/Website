'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import Contact from '../components/Contact';
import History from '../components/History';
import Method from '../components/Method';
import OffTheClock from '../components/OffTheClock';
import SelectedWork from '../components/SelectedWork';
import Skills from '../components/Skills';

const VIOLET = '#9370DB';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function useCircuitNetwork(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pointerX = -1000;
    let pointerY = -1000;
    let rafId = 0;
    let running = true;

    const seedNodes = () => {
      // Cap density on mobile — visible perf win on low-end phones.
      const desktopCount = 90;
      const mobileCount = 35;
      const count = window.innerWidth < 768 ? mobileCount : desktopCount;

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isTouch ? 0.12 : 0.25),
        vy: (Math.random() - 0.5) * (isTouch ? 0.12 : 0.25),
      }));
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const connectDist = 130;
      const pointerInfluence = 90;

      for (const n of nodes) {
        // Pointer pull: nearby nodes drift toward the cursor (or finger).
        // Same logic for mouse + touch — the only difference is the input source.
        const dx = pointerX - n.x;
        const dy = pointerY - n.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < pointerInfluence * pointerInfluence) {
          const pull = 0.0008;
          n.vx += dx * pull;
          n.vy += dy * pull;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Friction so pulled nodes settle back into ambient drift.
        n.vx *= 0.98;
        n.vy *= 0.98;

        // Wrap edges (cheaper than bounce, visually continuous).
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }

      // Draw connections (the "circuit" lines).
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < connectDist * connectDist) {
            const opacity = (1 - Math.sqrt(distSq) / connectDist) * 0.35;
            ctx.strokeStyle = `rgba(147, 112, 219, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes.
      for (const n of nodes) {
        ctx.fillStyle = VIOLET;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      rafId = requestAnimationFrame(loop);
    };

    // Canvas is position:fixed inset:0 — viewport coords map 1:1 to canvas coords.
    const handleMouse = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const handleLeave = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    // Passive touch listeners so we never block native scroll.
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointerX = t.clientX;
      pointerY = t.clientY;
    };

    const handleTouchEnd = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    // Pause when the tab is hidden — battery win on long-running tabs.
    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!reducedMotion) {
        running = true;
        loop();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    if (!reducedMotion) loop();
    else draw(); // Single static frame for users who opted out of motion.

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [canvasRef, reducedMotion]);
}

function useKineticName(nameRef: React.RefObject<HTMLHeadingElement | null>) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = nameRef.current;
    if (!el) return;

    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    let rafId = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const handleMouse = (e: MouseEvent) => {
      // Map cursor to a small tilt range (-4° to +4°).
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetTiltY = ((e.clientX - cx) / cx) * 4;
      targetTiltX = ((cy - e.clientY) / cy) * 2;
    };

    const tick = () => {
      // Ease toward target so the motion doesn't feel jittery.
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;
      el.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      el.style.textShadow = `${(tiltY * 1.5).toFixed(1)}px ${(-tiltX * 1.2).toFixed(1)}px 24px rgba(147, 112, 219, 0.45)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouse);
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [nameRef, reducedMotion]);
}

export default function IndexClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useCircuitNetwork(canvasRef);
  useKineticName(nameRef);

  return (
    <div className="text-white">
      {/* Mouse + touch reactive circuit network — fixed behind every section */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Soft radial vignette so text reads cleanly over the network — also fixed */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        <section className="relative min-h-screen">
        <main
          className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
          aria-label="Chris Lee Bergstrom — Hero"
        >
        <motion.h1
          ref={nameRef}
          data-speakable="true"
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-center leading-[0.95] tracking-tight uppercase will-change-transform"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <span className="block text-white">Chris Lee</span>
          <span className="block" style={{ color: VIOLET }}>
            Bergstrom
          </span>
        </motion.h1>

        <motion.p
          data-speakable="true"
          className="font-body text-base md:text-lg lg:text-xl text-center max-w-2xl mt-10 leading-relaxed"
          style={{ color: 'rgba(245, 245, 220, 0.92)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          I spent 20 years building live shows. Now I build the software that runs them — with AI
          agents as my team.
        </motion.p>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
            Scroll
          </span>
          <motion.span
            className="block w-px h-8 bg-white/40"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
        </main>
      </section>

      <SelectedWork />
      <Method />
      <Skills />
      <History />
      <OffTheClock />
      <Contact />
      </div>
    </div>
  );
}
