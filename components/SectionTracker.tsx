'use client';

import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '../context/ChatContext';
import EveAvatar from './EveAvatar';

interface SectionTrackerProps {
  name: string;
  children: React.ReactNode;
  className?: string;
  butlerMessage?: string; // Optional message for active "Butler" mode
  lingerDuration?: number; // Time in ms to wait before triggering butler message (default 10s)
}

export default function SectionTracker({
  name,
  children,
  className = '',
  butlerMessage,
  lingerDuration = 2000,
}: SectionTrackerProps) {
  const ref = useRef(null);
  // Use margin to restrict detection to the center of the viewport
  // "-40% 0px -40% 0px" means the element must be in the middle 20% of the screen height to trigger
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const {
    setContext,
    isOpen,
    isNotificationActive,
    setNotificationActive,
    lastNotificationTime,
    setLastNotificationTime,
  } = useChat();
  const [showButler, setShowButler] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Keep a ref to the current notification state to avoid stale closures in setTimeout
  const isNotificationActiveRef = useRef(isNotificationActive);
  useEffect(() => {
    isNotificationActiveRef.current = isNotificationActive;
  }, [isNotificationActive]);

  useEffect(() => {
    if (isInView) {
      setContext(name);
      console.log(`Context updated to: ${name}`);
    }
  }, [isInView, name, setContext]);

  // Effect 1: Triggering
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let retryTimer: NodeJS.Timeout;

    // Check if the global welcome message is pending (prevents collision on first load)
    const _welcomeShown =
      typeof window !== 'undefined' ? sessionStorage.getItem('eve_notification_shown_v2') : 'true';

    const tryTrigger = () => {
      // Check session storage to avoid spamming the same message
      const storageKey = `eve_butler_${name.replace(/\s+/g, '_')}`;
      const alreadyShown = sessionStorage.getItem(storageKey);
      const welcomeShown = sessionStorage.getItem('eve_notification_shown_v2');

      // Check global cooldown (5 seconds)
      const timeSinceLast = Date.now() - lastNotificationTime;
      const cooldown = 5000;

      if (!alreadyShown && !isNotificationActiveRef.current && welcomeShown) {
        if (timeSinceLast < cooldown) {
          // Too soon! Retry in 1 second
          console.log(`[${name}] Cooldown active (${timeSinceLast}ms). Retrying...`);
          retryTimer = setTimeout(tryTrigger, 1000);
        } else {
          // Safe to fire
          setShowButler(true);
          setIsThinking(true);
          setHasTriggered(true);
          setNotificationActive(true);
          setLastNotificationTime(Date.now());
          sessionStorage.setItem(storageKey, 'true');
        }
      }
    };

    if (isInView && butlerMessage && !hasTriggered && !isOpen && !isNotificationActive) {
      timer = setTimeout(tryTrigger, lingerDuration);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(retryTimer);
    };
  }, [
    isInView,
    butlerMessage,
    hasTriggered,
    isOpen,
    lingerDuration,
    name,
    isNotificationActive,
    setNotificationActive,
    lastNotificationTime,
    setLastNotificationTime,
  ]);

  // Effect 2: Thinking to Message Transition
  useEffect(() => {
    if (showButler && isThinking) {
      const timer = setTimeout(() => {
        setIsThinking(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showButler, isThinking]);

  // Effect 3: Auto-hide
  useEffect(() => {
    if (showButler && !isThinking) {
      // Auto-hide after 6 seconds
      const timer = setTimeout(() => {
        setShowButler(false);
        setNotificationActive(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showButler, isThinking, setNotificationActive]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}

      {/* Butler Notification */}
      <AnimatePresence>
        {showButler && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-[104px] right-[3px] z-[101] bg-black/80 backdrop-blur-md border border-[#9370DB]/50 p-2 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(147,112,219,0.3)] max-w-[90px]"
          >
            {isThinking ? (
              <div className="flex items-center justify-center h-full min-h-[40px] w-full">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-1.5 h-1.5 bg-[#9370DB] rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-[#9370DB] rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-[#9370DB] rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-1 border-b border-white/10 pb-2">
                  <EveAvatar width={64} height={36} className="border border-[#9370DB]/50" />
                  <span className="text-[10px] font-bold text-[#9370DB] uppercase tracking-wider leading-tight block">
                    Observation
                  </span>
                </div>
                <div className="text-[11px] text-white/90 leading-tight min-h-[1.2em]">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {butlerMessage}
                  </motion.span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
