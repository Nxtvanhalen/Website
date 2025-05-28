import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to CLB Consulting! I\'m EVE, your AI assistant. How can I help you with your project needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('threadId') : null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInput('');
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || isTyping) return;
    
    const userMsg: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Add realistic delay for typing effect
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: content, history: messages, threadId })
      });
      
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await res.json();
      const assistantMsg: Message = { 
        role: 'assistant', 
        content: data.reply || 'I apologize, but I couldn\'t process that request. Please try again.' 
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
      if (data.threadId && data.threadId !== threadId) {
        setThreadId(data.threadId);
        localStorage.setItem('threadId', data.threadId);
      }
    } catch (err) {
      const errorMsg: Message = { 
        role: 'assistant', 
        content: 'I\'m experiencing some technical difficulties. Please try again in a moment, or feel free to email me directly!' 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full px-4 py-3 rounded-lg bg-molten text-black self-start flex items-center space-x-2"
    >
      <span>EVE is thinking</span>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-black rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full font-body">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 bg-black">
        <div className="flex flex-col space-y-3">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`max-w-[85%] px-4 py-3 rounded-lg shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-white text-black self-end ml-auto border-l-4 border-molten' 
                    : 'bg-molten text-black self-start mr-auto border-l-4 border-white'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="text-xs font-bold mb-1 opacity-70">EVE</div>
                )}
                <div className="leading-relaxed">{msg.content}</div>
              </motion.div>
            ))}
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
        </div>
      </div>
      <form onSubmit={sendMessage} className="flex border-t border-molten/30 bg-black">
        <input
          ref={inputRef}
          className="flex-1 p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-molten/50 rounded-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isTyping ? "EVE is thinking..." : "Ask me anything about AI, consulting, or development..."}
          disabled={isTyping}
        />
        <motion.button 
          type="submit" 
          disabled={isTyping || !input.trim()}
          className="px-6 bg-molten text-black font-bold hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isTyping ? '⏳' : '🚀'}
        </motion.button>
      </form>
    </div>
  );
}