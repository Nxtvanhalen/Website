'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EveAvatar from './EveAvatar';

type Message = { role: 'user' | 'assistant'; content: string };

import { useChat } from '../context/ChatContext';

export default function ChatPanel() {
  const { currentContext } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Welcome — I'm EVE, Chris's portfolio assistant. Ask me about the work, the road, or how to reach him.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseId, setResponseId] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('responseId') : null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount - DISABLED to prevent auto-scroll
  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  // Load messages from LocalStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('eve_chat_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
  }, []);

  // Save messages to LocalStorage whenever they change
  useEffect(() => {
    if (messages.length > 1) {
      // Don't save if it's just the initial welcome message
      localStorage.setItem('eve_chat_history', JSON.stringify(messages));
    }

    // Scroll to bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

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

  // Handle mobile keyboard show/hide - only when user is actively using chat input
  useEffect(() => {
    let initialHeight = 0;
    let isKeyboardVisible = false;
    let isUserInteractingWithChat = false;

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

      // Only recenter when:
      // 1. User was interacting with chat input
      // 2. Keyboard was visible and now disappears
      if (isUserInteractingWithChat && wasKeyboardVisible && !isKeyboardVisible) {
        setTimeout(() => {
          const eveHeading = document.getElementById('eve-ai-heading');
          if (eveHeading) {
            // Get the element's position and scroll with offset to show input area
            const rect = eveHeading.getBoundingClientRect();
            const offsetTop = window.pageYOffset + rect.top;

            // Scroll 120px higher than center to ensure more of input area is visible
            window.scrollTo({
              top: offsetTop - 120,
              behavior: 'smooth',
            });
          }
          // Reset interaction flag after recentering
          isUserInteractingWithChat = false;
        }, 200);
      }
    };

    const handleInputFocus = () => {
      isUserInteractingWithChat = true;
    };

    const handleInputBlur = () => {
      // Don't immediately reset - let the viewport handler decide
      setTimeout(() => {
        if (!isKeyboardVisible) {
          isUserInteractingWithChat = false;
        }
      }, 500);
    };

    if (typeof window !== 'undefined' && window.visualViewport) {
      const viewport = window.visualViewport;
      const input = inputRef.current;

      initialHeight = viewport.height;
      viewport.addEventListener('resize', handleViewportChange);

      if (input) {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
      }

      return () => {
        viewport.removeEventListener('resize', handleViewportChange);
        if (input) {
          input.removeEventListener('focus', handleInputFocus);
          input.removeEventListener('blur', handleInputBlur);
        }
      };
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
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          previousResponseId: responseId,
          context: currentContext,
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content:
          data.reply || "I apologize, but I couldn't process that request. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (data.responseId && data.responseId !== responseId) {
        setResponseId(data.responseId);
        localStorage.setItem('responseId', data.responseId);
      }
    } catch (_err) {
      const errorMsg: Message = {
        role: 'assistant',
        content:
          "I'm experiencing some technical difficulties. Please try again in a moment, or feel free to email me directly!",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="max-w-full px-4 py-3 rounded-lg bg-transparent text-white self-start flex items-center space-x-2 border border-mauve">
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
                  ? 'bg-transparent text-white self-end ml-auto border-l-4 border-mauve'
                  : 'bg-transparent text-white self-start mr-auto border-l-4 border-mauve'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <EveAvatar width={56} height={32} className="border border-mauve/40" />
                  <div className="text-xs font-bold opacity-70">EVE</div>
                </div>
              )}
              <div className="leading-relaxed markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }: any) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mauve underline hover:text-white transition-colors"
                      />
                    ),
                    p: ({ node, ...props }: any) => <p {...props} className="mb-2 last:mb-0" />,
                    ul: ({ node, ...props }: any) => (
                      <ul {...props} className="list-disc ml-4 mb-2" />
                    ),
                    ol: ({ node, ...props }: any) => (
                      <ol {...props} className="list-decimal ml-4 mb-2" />
                    ),
                    li: ({ node, ...props }: any) => <li {...props} className="mb-1" />,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>
      <form onSubmit={sendMessage} className="flex border-t border-mauve/30 bg-black/30">
        <input
          ref={inputRef}
          className="chat-input flex-1 p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mauve/50 rounded-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isTyping
              ? 'EVE is thinking...'
              : 'Ask me anything about AI, consulting, or development...'
          }
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="px-6 bg-transparent text-mauve font-bold hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-mauve hover:border-white hover:scale-105 active:scale-95"
        >
          {isTyping ? '...' : '→'}
        </button>
      </form>
    </div>
  );
}
