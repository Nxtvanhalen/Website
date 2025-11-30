import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
    className = "",
    butlerMessage,
    lingerDuration = 3000
}: SectionTrackerProps) {
    const ref = useRef(null);
    // Use margin to restrict detection to the center of the viewport
    // "-40% 0px -40% 0px" means the element must be in the middle 20% of the screen height to trigger
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
    const { setContext, isOpen, isNotificationActive, setNotificationActive } = useChat();
    const [showButler, setShowButler] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        if (isInView) {
            setContext(name);
            console.log(`Context updated to: ${name}`);
        }
    }, [isInView, name, setContext]);

    // Effect 1: Triggering
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isInView && butlerMessage && !hasTriggered && !isOpen && !isNotificationActive) {
            timer = setTimeout(() => {
                // Check session storage to avoid spamming the same message
                const storageKey = `eve_butler_${name.replace(/\s+/g, '_')}`;
                const alreadyShown = sessionStorage.getItem(storageKey);

                if (!alreadyShown && !isNotificationActive) {
                    setShowButler(true);
                    setIsThinking(true);
                    setHasTriggered(true);
                    setNotificationActive(true);
                    sessionStorage.setItem(storageKey, 'true');
                }
            }, lingerDuration);
        }

        return () => clearTimeout(timer);
    }, [isInView, butlerMessage, hasTriggered, isOpen, lingerDuration, name, isNotificationActive, setNotificationActive]);

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
            // Auto-hide after 4 seconds
            const timer = setTimeout(() => {
                setShowButler(false);
                setNotificationActive(false);
            }, 4000);
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
                        className="fixed bottom-24 right-[2px] z-[90] mb-4 mr-2 bg-black/80 backdrop-blur-md border border-[#9370DB]/50 p-2 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(147,112,219,0.3)] max-w-[90px]"
                    >
                        {isThinking ? (
                            <div className="flex items-center justify-center h-full min-h-[40px] w-full">
                                <div className="flex space-x-1">
                                    <motion.div
                                        className="w-1.5 h-1.5 bg-[#9370DB] rounded-full"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                                    />
                                    <motion.div
                                        className="w-1.5 h-1.5 bg-[#9370DB] rounded-full"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                    />
                                    <motion.div
                                        className="w-1.5 h-1.5 bg-[#9370DB] rounded-full"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col items-start gap-1 border-b border-white/10 pb-2">
                                    <div className="w-6 h-6 rounded-sm border border-[#9370DB]/50 overflow-hidden shrink-0 relative">
                                        <Image
                                            src="/images/projects/EVE.png"
                                            alt="EVE"
                                            width={24}
                                            height={24}
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="text-[10px] font-bold text-[#9370DB] uppercase tracking-wider leading-tight">
                                        Observation
                                    </h4>
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
