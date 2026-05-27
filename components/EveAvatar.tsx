'use client';

import { useEffect, useRef } from 'react';

interface EveAvatarProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function EveAvatar({ width = 80, height = 45, className = '' }: EveAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay - video will show first frame
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      aria-label="EVE — animated AI concierge avatar; decorative loop"
      className={`object-contain ${className}`}
      style={{
        width,
        height,
        borderRadius: '12px',
        mask: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMask:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <source src="/videos/eve-avatar.mp4" type="video/mp4" />
    </video>
  );
}
