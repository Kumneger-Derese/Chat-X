import { useAuthStore } from '@/store/authStore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type ProviderProps = {
  children: React.ReactNode;
};

//  Define the shape of your context value
interface SocketContextType {
  socket: Socket | null; // socket can be a Socket instance or null
  onlineUsers: string[];
}

// Provide a default value that matches the SocketContextType interface
//    This is crucial for createContext in TypeScript.

// socket context
const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});


// Custom provider
const SocketContextProvider = ({ children }: ProviderProps) => {
  const backendUrl: string = import.meta.env.VITE_BACKEND_SOCKET_URL as string;

  // Explicitly type the useState for socket
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { userInfo } = useAuthStore();

  useEffect(() => {
    // Only connect if userInfo exists and socket is not already connected
    // or needs to be reconnected due to userInfo change.
    if (userInfo && !socket) {
      const newSocket: Socket = io(backendUrl, { query: { userId: userInfo?._id } });
      setSocket(newSocket);

      newSocket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users)
      })

      return () => {
        newSocket.off('getOnlineUsers')
        newSocket.close();
        setSocket(null); // Clear socket state on close
      };
    } else if (!userInfo && socket) {
      // Close socket if user logs out
      socket.close();
      setSocket(null);
      setOnlineUsers([]);
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
//custom hook
const useSocketContext = () => {
  return useContext(SocketContext)
}

export { SocketContext, SocketContextProvider, useSocketContext };
