import { Axios } from '../utils/axios';
import type { ApiResponse, Message, UnseenMessageCount } from '@/types';

type SendMessageProps = {
  message: string;
  receiverId: string | null;
};

//gets users for sidebar
const getConversations = async (): Promise<Message[]> => {
  const { data } = await Axios.get('/users');
  return data;
};

//fetch messages
const getMessages = async (receiverId: string): Promise<ApiResponse[]> => {
  const { data } = await Axios.get(`/messages/${receiverId}`);
  return data;
};

//send messages
const sendMessage = async ({ message, receiverId }: SendMessageProps) => {
  const { data } = await Axios.post(`/messages/send/${receiverId}`, {
    message,
  });
  return data;
};

// unseem msg count
const unseenMessageCount = async (
  conversationId: string
): Promise<UnseenMessageCount> => {
  const { data } = await Axios.get(`/messages/unseen-count/${conversationId}`);
  return data;
};

export { getConversations, sendMessage, getMessages, unseenMessageCount };
