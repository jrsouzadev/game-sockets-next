/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import socketio, { Socket } from "socket.io-client";
import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";

export const SocketsContext = createContext<SocketsContextObject>({});

export function useSocketsContext() {
  const context = useContext(SocketsContext);
  return context;
}

export function SocketsProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<SocketsContextObject>({});

  useEffect(() => {
    if (!socket.socket) {
      const newConnection = socketio();
      setSocket({ socket: newConnection });
    }
  }, []);

  return (
    <SocketsContext.Provider value={socket}>{children}</SocketsContext.Provider>
  );
}
