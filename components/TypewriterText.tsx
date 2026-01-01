'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number; // ms per character
  delay?: number; // initial delay in ms
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  style = {},
  speed = 100,
  delay = 500,
  showCursor = true,
  cursorChar = '|',
  onComplete,
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Use motion values for performance optimization - no re-renders during animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  
  useEffect(() => {
    // Set a timer for the initial delay
    const delayTimer = setTimeout(() => {
      setHasStarted(true);
      
      // Animate the count from 0 to text length
      const controls = animate(count, text.length, {
        type: "tween",
        duration: (text.length * speed) / 1000, // Convert ms to seconds
        ease: "linear",
        onComplete: () => {
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        },
      });
      
      // Return cleanup function for the animation
      return () => controls.stop();
    }, delay);
    
    // Cleanup function for the timer
    return () => {
      clearTimeout(delayTimer);
    };
  }, [count, text.length, speed, delay, onComplete]);
  
  return (
    <span
      className={`${className} ${isComplete ? 'typewriter-glow' : ''}`}
      style={style}
      aria-label={text}
      role="heading"
      aria-level={1}
    >
      <motion.span style={{ filter: 'none', opacity: 1 }}>{displayText}</motion.span>
      {showCursor && hasStarted && !isComplete && (
        <span className="typewriter-cursor" aria-hidden="true">
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypewriterText;