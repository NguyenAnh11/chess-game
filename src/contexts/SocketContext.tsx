import { useContext, createContext, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { socket } from "../services/Socket";

type SocketContextProps = {
  children: ReactNode;
};

type SocketContext = {
  ws: Socket;
};

export const SocketContext = createContext({} as SocketContext);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: SocketContextProps) => {
  return (
    <SocketContext.Provider value={{ ws: socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;