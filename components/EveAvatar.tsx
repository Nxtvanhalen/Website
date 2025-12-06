import { useRef, useEffect } from 'react';

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
    <div
      className={`overflow-hidden flex-shrink-0 ${className}`}
      style={{ width, height }}
    >
      <video
        ref={videoRef}
        src="/videos/eve-avatar.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
        style={{ width, height }}
      />
    </div>
  );
}
