import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useChat } from '../context/ChatContext';
import ChatPanel from './ChatPanel';
import EveAvatar from './EveAvatar';

export default function PersistentChat() {
    const { isOpen, toggleChat, setNotificationActive, setLastNotificationTime } = useChat();
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
                setLastNotificationTime(Date.now());
                sessionStorage.setItem('eve_notification_shown_v2', 'true');

                // Auto-hide after 4 seconds
                setTimeout(() => {
                    setShowNotification(false);
                    setNotificationActive(false);
                }, 4000);
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
                                <EveAvatar width={80} height={45} className="border border-mauve/50" />
                                <div>
                                    <h3 className="font-heading text-white text-sm tracking-wide">EVE AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[10px] text-white/60 uppercase tracking-wider">Online • GPT-5.1</span>
                                    </div>
                                </div>
                                <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-mauve font-bold tracking-wider uppercase">System v2.0</span>
                                        <span className="text-[9px] text-white/30 uppercase tracking-wider border border-white/10 px-1 rounded">Air-Gapped</span>
                                    </div>
                                    <span className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Capable: Email • Strategy • Logistics</span>
                                </div>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-white/50 hover:text-white transition-colors p-1"
                                aria-label="Close chat"
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
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-20 right-0 mb-4 mr-[-12px] bg-black/80 backdrop-blur-md border border-[#9370DB]/50 p-2 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(147,112,219,0.3)] max-w-[90px]"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-start gap-1 border-b border-white/10 pb-2">
                                <EveAvatar width={64} height={36} className="border border-[#9370DB]/50" />
                                <h4 className="text-[10px] font-bold text-[#9370DB] uppercase tracking-wider leading-tight">Incoming Transmission</h4>
                            </div>
                            <div>
                                <p className="text-[11px] text-white/90 leading-tight">
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
                    {!isOpen && !showNotification && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 10, x: "-50%" }}
                            className="absolute bottom-full mb-1.5 left-1/2 px-3 py-1.5 bg-black/80 rounded-xl text-white text-xs font-medium whitespace-nowrap"
                        >
                            EVE AI
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={toggleChat}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border-none p-0 cursor-pointer outline-none"
                    style={{ background: 'none', border: 'none' }}
                    aria-label={isOpen ? "Close EVE AI chat" : "Open EVE AI chat assistant"}
                >
                    {isOpen ? (
                        <div className="w-20 h-12 rounded-lg bg-black/80 border-2 border-mauve/50 flex items-center justify-center text-mauve">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    ) : (
                        <EveAvatar width={80} height={80} className="" />
                    )}
                </motion.button>
            </div>
        </div>
    );
}
