import type { ApiResponse, Message } from '@/types';
import { create } from 'zustand';

type ConversationStoreType = {
  messages: ApiResponse[];
  selectedConversation: Message | null;
  setMessages: (message: ApiResponse[]) => void;
  setSelectedConversation: (selectedConversation: Message | null) => void;
};

const useConversationStore = create<ConversationStoreType>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),
}));

const useConversation = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
  } = useConversationStore();

  return {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
  };
};

export { useConversation };
