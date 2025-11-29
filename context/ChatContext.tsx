import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
    isOpen: boolean;
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
    currentContext: string;
    setContext: (context: string) => void;
    isNotificationActive: boolean;
    setNotificationActive: (active: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentContext, setCurrentContext] = useState('Home');
    const [isNotificationActive, setNotificationActive] = useState(false);

    const openChat = () => setIsOpen(true);
    const closeChat = () => setIsOpen(false);
    const toggleChat = () => setIsOpen(prev => !prev);
    const setContext = (context: string) => setCurrentContext(context);

    return (
        <ChatContext.Provider value={{
            isOpen,
            openChat,
            closeChat,
            toggleChat,
            currentContext,
            setContext,
            isNotificationActive,
            setNotificationActive
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
