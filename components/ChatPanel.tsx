import { useState, useRef, useEffect, FormEvent } from 'react';

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

  // Auto-focus input on mount - DISABLED to prevent auto-scroll
  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

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

  // Handle mobile keyboard show/hide - recenter chat when keyboard disappears
  useEffect(() => {
    let initialHeight = 0;
    let isKeyboardVisible = false;
    
    const handleViewportChange = () => {
      if (typeof window === 'undefined' || !window.visualViewport) return;
      
      const currentHeight = window.visualViewport.height;
      
      // Initialize on first run
      if (initialHeight === 0) {
        initialHeight = currentHeight;
        return;
      }
      
      const heightDiff = initialHeight - currentHeight;
      const wasKeyboardVisible = isKeyboardVisible;
      
      // Keyboard is considered visible if viewport height reduced by more than 150px
      isKeyboardVisible = heightDiff > 150;
      
      // Only recenter when keyboard was visible and now disappears
      if (wasKeyboardVisible && !isKeyboardVisible) {
        setTimeout(() => {
          const chatSection = document.getElementById('eve-chat');
          if (chatSection) {
            chatSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 200); // Delay for keyboard animation
      }
    };
    
    if (typeof window !== 'undefined' && window.visualViewport) {
      const viewport = window.visualViewport;
      // Set initial height
      initialHeight = viewport.height;
      viewport.addEventListener('resize', handleViewportChange);
      return () => viewport.removeEventListener('resize', handleViewportChange);
    }
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
    <div className="max-w-full px-4 py-3 rounded-lg bg-transparent text-white self-start flex items-center space-x-2 border border-molten">
      <span>EVE is thinking</span>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full font-body">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 bg-transparent">
        <div className="flex flex-col space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
                msg.role === 'user' 
                  ? 'bg-transparent text-white self-end ml-auto border-l-4 border-molten' 
                  : 'bg-transparent text-white self-start mr-auto border-l-4 border-molten'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full border border-molten/40 overflow-hidden flex-shrink-0">
                    <img 
                      src="/images/projects/EVE.png" 
                      alt="EVE" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-xs font-bold opacity-70">EVE</div>
                </div>
              )}
              <div className="leading-relaxed">{msg.content}</div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>
      <form onSubmit={sendMessage} className="flex border-t border-molten/30 bg-black/30">
        <input
          ref={inputRef}
          className="flex-1 p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-molten/50 rounded-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isTyping ? "EVE is thinking..." : "Ask me anything about AI, consulting, or development..."}
          disabled={isTyping}
        />
        <button 
          type="submit" 
          disabled={isTyping || !input.trim()}
          className="px-6 bg-transparent text-molten font-bold hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-molten hover:border-white hover:scale-105 active:scale-95"
        >
          {isTyping ? '⏳' : '→'}
        </button>
      </form>
    </div>
  );
}