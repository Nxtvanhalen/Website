'use client';

import Image from 'next/image';

interface EveAvatarProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function EveAvatar({ width = 80, height = 45, className = '' }: EveAvatarProps) {
  return (
    <Image
      src="/images/EVEP.png"
      alt="EVE — the site's AI concierge"
      width={width}
      height={height}
      className={`object-cover object-top ${className}`}
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
    />
  );
}
