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
  const [isStreaming, setIsStreaming] = useState(false);
  const [responseId, setResponseId] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('responseId') : null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Drives the smooth typewriter reveal; held in a ref so we can cancel it on unmount.
  const rafRef = useRef<number | null>(null);

  // Cancel any in-flight streaming reveal if the panel unmounts mid-stream.
  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

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

  // Persist history — but not on every streaming frame. While a reply reveals we
  // skip the (expensive) serialize+write and persist once when it settles.
  useEffect(() => {
    if (!isStreaming && messages.length > 1) {
      // Don't save if it's just the initial welcome message
      localStorage.setItem('eve_chat_history', JSON.stringify(messages));
    }

    // Scroll to bottom (kept live so the view follows the streaming text)
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

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
    if (!content || isTyping || isStreaming) return;

    const userMsg: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Replace the last (assistant) message in place as the reply reveals.
    const replaceLast = (text: string) =>
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: 'assistant', content: text };
        return next;
      });

    // Smooth typewriter reveal. The network delivers tokens in uneven bursts, so
    // we buffer the full received text in `target` and reveal it at a steady
    // cadence (`shown` chars). Speed eases up the further `shown` trails `target`,
    // so long bursts drain quickly without the reveal ever lagging far behind.
    const BASE_CPS = 40; // baseline reveal speed (characters/second)
    const CATCHUP = 0; // extra chars/second per pending character (0 = constant speed)
    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let target = '';
    let shown = 0;
    let streamDone = false;
    let finalText: string | null = null;
    let finalized = false;
    let lastTs: number | null = null;

    const stopRaf = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const finalizeReply = () => {
      if (finalized) return;
      finalized = true;
      stopRaf();
      replaceLast(finalText ?? target);
      setIsStreaming(false);
      inputRef.current?.focus();
    };

    const tick = (ts: number) => {
      const dt = lastTs == null ? 0 : (ts - lastTs) / 1000;
      lastTs = ts;

      if (shown < target.length) {
        const remaining = target.length - shown;
        const cps = Math.max(BASE_CPS, remaining * CATCHUP);
        // Accumulate fractional progress so slow speeds aren't floored up to one
        // character per frame (≈ the display's refresh rate). Render floor(shown).
        shown = Math.min(target.length, shown + cps * dt);
        replaceLast(target.slice(0, Math.floor(shown)));
      }

      if (streamDone && shown >= target.length) {
        finalizeReply();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    let placeholderAdded = false;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          previousResponseId: responseId,
          context: currentContext,
        }),
      });

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Network response was not ok');
      }

      // First byte is on the way — swap the "thinking" indicator for a live,
      // streaming bubble and start revealing buffered tokens at a steady pace.
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      placeholderAdded = true;
      setIsTyping(false);
      setIsStreaming(true);
      if (!reduceMotion) {
        rafRef.current = requestAnimationFrame(tick);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;
          let evt: {
            type: string;
            text?: string;
            finalText?: string;
            responseId?: string | null;
            message?: string;
          };
          try {
            evt = JSON.parse(line);
          } catch {
            continue;
          }

          if (evt.type === 'delta' && evt.text) {
            target += evt.text;
            if (reduceMotion) {
              shown = target.length;
              replaceLast(target);
            }
          } else if (evt.type === 'done') {
            // Server sends the authoritative, sanitized full text on completion.
            if (typeof evt.finalText === 'string') {
              finalText = evt.finalText;
              if (evt.finalText !== target) target = evt.finalText;
            }
            if (evt.responseId && evt.responseId !== responseId) {
              setResponseId(evt.responseId);
              localStorage.setItem('responseId', evt.responseId);
            }
            streamDone = true;
          } else if (evt.type === 'error' && !target) {
            target = evt.message || "I couldn't process that request. Please try again.";
            finalText = target;
            streamDone = true;
            if (reduceMotion) {
              shown = target.length;
              replaceLast(target);
            }
          }
        }
      }

      // Stream closed. Make sure we have something, then let the reveal finish.
      streamDone = true;
      if (!target) {
        target = "I couldn't process that request. Please try again.";
        finalText = target;
      }
      // If no reveal loop is running (reduced motion, or it already drained),
      // settle immediately; otherwise `tick` finalizes once it catches up.
      if (rafRef.current == null) {
        finalizeReply();
      }
    } catch (_err) {
      stopRaf();
      const errorText =
        "I'm experiencing some technical difficulties. Please try again in a moment, or feel free to email me directly!";
      if (placeholderAdded) {
        replaceLast(errorText);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: errorText }]);
      }
      setIsStreaming(false);
      inputRef.current?.focus();
    } finally {
      // isStreaming is cleared by finalizeReply (or the catch) so the caret/raw
      // text stays until the reveal completes — not the instant the network ends.
      setIsTyping(false);
    }
  };

  // Shared markdown renderer config for completed assistant messages.
  const markdownComponents = {
    a: ({ node, ...props }: any) => (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="text-mauve underline hover:text-white transition-colors"
      />
    ),
    p: ({ node, ...props }: any) => <p {...props} className="mb-2 last:mb-0" />,
    ul: ({ node, ...props }: any) => <ul {...props} className="list-disc ml-4 mb-2" />,
    ol: ({ node, ...props }: any) => <ol {...props} className="list-decimal ml-4 mb-2" />,
    li: ({ node, ...props }: any) => <li {...props} className="mb-1" />,
  };

  // Shown after the user sends, before the first token streams back.
  const TypingIndicator = () => (
    <div className="animate-message-in self-start mr-auto max-w-[85%] px-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl rounded-bl-md">
      <div className="flex items-center gap-2 mb-2">
        <EveAvatar width={28} height={28} className="border border-mauve/40" />
        <span className="text-[11px] font-bold tracking-wider text-mauve/90">EVE</span>
      </div>
      <div className="flex items-center gap-1.5 h-3" role="status" aria-label="EVE is typing">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="eve-typing-dot w-1.5 h-1.5 rounded-full bg-mauve"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full font-body">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 bg-transparent">
        <div className="flex flex-col space-y-3">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            const isStreamingMsg = isStreaming && !isUser && idx === messages.length - 1;
            return (
              <div
                key={idx}
                className={`animate-message-in max-w-[85%] px-4 py-3 ${
                  isUser
                    ? 'self-end ml-auto bg-mauve/15 border border-mauve/30 rounded-2xl rounded-br-md text-white'
                    : 'self-start mr-auto bg-white/[0.04] border border-white/10 rounded-2xl rounded-bl-md text-white'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <EveAvatar width={28} height={28} className="border border-mauve/40" />
                    <span className="text-[11px] font-bold tracking-wider text-mauve/90">EVE</span>
                  </div>
                )}
                <div className="leading-relaxed markdown-content">
                  {isStreamingMsg ? (
                    // Render raw text while streaming so partial markdown never
                    // flickers; swap to formatted markdown once the reply completes.
                    <span className="whitespace-pre-wrap">
                      {msg.content}
                      <span className="eve-stream-cursor" aria-hidden="true" />
                    </span>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            );
          })}
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
            isTyping || isStreaming
              ? 'EVE is responding…'
              : 'Ask me anything about AI, consulting, or development...'
          }
          disabled={isTyping || isStreaming}
        />
        <button
          type="submit"
          disabled={isTyping || isStreaming || !input.trim()}
          className="px-6 bg-transparent text-mauve font-bold hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-mauve hover:border-white hover:scale-105 active:scale-95"
        >
          {isTyping || isStreaming ? '…' : '→'}
        </button>
      </form>
    </div>
  );
}
