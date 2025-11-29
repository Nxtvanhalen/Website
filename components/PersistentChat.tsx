import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import ChatPanel from './ChatPanel';
import Image from 'next/image';

export default function PersistentChat() {
    const { isOpen, toggleChat, setNotificationActive } = useChat();
    const [showNotification, setShowNotification] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Check if we've shown the notification in this session
        const hasShown = sessionStorage.getItem('eve_notification_shown_v2');
        if (!hasShown && !isOpen) {
            // Delay slightly for effect (reduced to 1s)
            const timer = setTimeout(() => {
                setShowNotification(true);
                setNotificationActive(true);
                sessionStorage.setItem('eve_notification_shown_v2', 'true');

                // Auto-hide after 10 seconds
                setTimeout(() => {
                    setShowNotification(false);
                    setNotificationActive(false);
                }, 10000);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, setNotificationActive]);

    return (
        <div className="fixed bottom-6 right-[15px] z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 mr-4 w-[90vw] md:w-[400px] h-[450px] max-h-[calc(100vh-180px)] bg-black/90 backdrop-blur-xl border border-mauve/50 rounded-2xl shadow-[0_0_30px_rgba(147,112,219,0.3)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-mauve/20 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-mauve/50 overflow-hidden relative">
                                    <Image
                                        src="/images/projects/EVE.png"
                                        alt="EVE"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-heading text-white text-sm tracking-wide">EVE AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[10px] text-white/60 uppercase tracking-wider">Online • GPT-5.1</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-white/50 hover:text-white transition-colors p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-hidden relative">
                            <ChatPanel />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className="absolute bottom-20 right-0 mb-2 mr-2 bg-black/80 backdrop-blur-md border-l-4 border-[#9370DB] p-4 rounded-xl shadow-[0_0_15px_rgba(147,112,219,0.3)] max-w-[250px]"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-sm border border-[#9370DB]/50 overflow-hidden shrink-0">
                                <Image
                                    src="/images/projects/EVE.png"
                                    alt="EVE"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#9370DB] uppercase tracking-wider mb-1">Incoming Transmission</h4>
                                <p className="text-xs text-white/90 leading-tight">
                                    I'm EVE. Tactical Intelligence Engine running on GPT-5.1. I don't just answer—I synthesize. Try me.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button Container */}
            <div
                className="relative flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 10, x: "-50%" }}
                            className="absolute bottom-full mb-3 left-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-mauve/50 rounded-lg text-white text-xs font-medium whitespace-nowrap shadow-[0_0_15px_rgba(147,112,219,0.3)]"
                        >
                            EVE AI
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={toggleChat}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        boxShadow: ["0 0 0px rgba(147,112,219,0.4)", "0 0 35px rgba(147,112,219,1)", "0 0 0px rgba(147,112,219,0.4)"]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isOpen ? 'bg-black border-mauve text-mauve' : 'bg-mauve border-mauve text-white'}`}
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    ) : (
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                                src="/images/projects/EVE.png"
                                alt="Chat with EVE"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
