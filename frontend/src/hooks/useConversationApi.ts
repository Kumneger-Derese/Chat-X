import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiResponse, Message, UnseenMessageCount } from '../types/index';
import {
  getConversations,
  getMessages,
  sendMessage,
  unseenMessageCount,
} from '@/api/conversationApi';
import { useConversation } from '@/store/useConversation';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';

// get users for sidebar
const useGetConversation = () => {
  return useQuery<Message[], Error>({
    queryKey: ['user'],
    queryFn: getConversations,

    // if the data from th api is not an array, wrap it in one
    //otherwise return it as is
    select: (data) => {
      if (!Array.isArray(data)) {
        return [data];
      }
      return data;
    },
  });
};

// get users for sidebar
const useGetMessages = (id: string) => {
  return useQuery<ApiResponse[], Error>({
    queryKey: ['chat', id],
    queryFn: () => getMessages(id),
    enabled: !!id,
  });
};

// get users for sidebar
const useGetUnseenMessageCount = (conversationId: string) => {
  return useQuery<UnseenMessageCount, Error>({
    queryKey: ['chat', conversationId],
    queryFn: () => unseenMessageCount(conversationId),
    enabled: !!conversationId,
  });
};

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { messages, setMessages } = useConversation();

  return useMutation({
    mutationFn: sendMessage,
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ||'Failed to send message.');
    },
    onSuccess: (data) => {
      setMessages([...messages, data]);
      queryClient.invalidateQueries({ queryKey: ['chat'] });
    },
  });
};

export {
  useGetConversation,
  useSendMessage,
  useGetMessages,
  useGetUnseenMessageCount,
};
