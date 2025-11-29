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
            const timer = setTimeout(() => {
                setShowButler(false);
                setNotificationActive(false);
            }, 7000);
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
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-4 z-[90] mb-2 mr-2 bg-black/80 backdrop-blur-md border-l-4 border-[#9370DB] p-4 rounded-xl shadow-[0_0_15px_rgba(147,112,219,0.3)] max-w-[250px]"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-sm border border-[#9370DB]/50 overflow-hidden shrink-0 relative">
                                <Image
                                    src="/images/projects/EVE.png"
                                    alt="EVE"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                                {isThinking && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-[#9370DB] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#9370DB] uppercase tracking-wider mb-1">
                                    {isThinking ? "Processing..." : "Observation"}
                                </h4>
                                <div className="text-xs text-white/90 leading-tight min-h-[1.2em]">
                                    {isThinking ? (
                                        <span className="animate-pulse">Analyzing context...</span>
                                    ) : (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {butlerMessage}
                                        </motion.span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
