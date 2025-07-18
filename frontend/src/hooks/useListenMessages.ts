import { useEffect } from 'react';
import { useConversation } from '@/store/useConversation';
import { useSocketContext } from '@/context/socketContext';
import notiificationSound from '../assets/sound/alert.wav';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notiificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
      });
    }

    return () => {
      if (socket) socket?.off('newMessage');
    };
  }, [socket, messages, setMessages]);
};
export default useListenMessages;
