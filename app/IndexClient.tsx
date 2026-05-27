'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import SelectedWork from '../components/SelectedWork';

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
    let mouseX = -1000;
    let mouseY = -1000;
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
      const mouseInfluence = isTouch ? 0 : 90;

      for (const n of nodes) {
        // Mouse pull: nearby nodes drift toward the cursor slightly.
        if (!isTouch) {
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseInfluence * mouseInfluence) {
            const pull = 0.0008;
            n.vx += dx * pull;
            n.vy += dy * pull;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        // Friction so mouse-influenced nodes settle back into ambient drift.
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

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    // Pause the loop when the canvas is off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion) {
          if (!running) {
            running = true;
            loop();
          }
        } else {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleLeave);

    if (!reducedMotion) loop();
    else draw(); // Single static frame for users who opted out of motion.

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleLeave);
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
    <div className="bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        {/* Mouse-reactive circuit network */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Subtle radial vignette so the hero text reads cleanly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        <main
          className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
          style={{ zIndex: 10 }}
          aria-label="Chris Lee Bergstrom — Hero"
        >
        <motion.p
          className="font-mono text-xs tracking-[0.35em] uppercase mb-8"
          style={{ color: VIOLET }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          ADVANCE / 01 — PERSONNEL
        </motion.p>

        <motion.h1
          ref={nameRef}
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
          className="flex flex-col sm:flex-row gap-4 mt-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <Link
            href="#work"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase rounded-sm transition-all duration-300"
            style={{
              background: VIOLET,
              color: '#000',
              boxShadow: `0 0 30px rgba(147, 112, 219, 0.35)`,
            }}
          >
            Start the Advance
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="#work"
            className="inline-flex items-center justify-center px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase rounded-sm border transition-all duration-300 hover:bg-white/5"
            style={{
              borderColor: 'rgba(147, 112, 219, 0.5)',
              color: VIOLET,
            }}
          >
            Selected Work
          </Link>
        </motion.div>

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
    </div>
  );
}
