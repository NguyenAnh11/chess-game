import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { SOCKET_EVENTS } from "../services/Socket";
import { Message } from "../types";
import { useSocket } from "./SocketContext";
import { useUser } from "./UserContext";

type ChatContextProps = {
  children: ReactNode;
};

type ChatContext = {
  messages: Message[];
  onSend: (content: string) => void;
};

export const ChatContext = createContext({} as ChatContext);

export const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }: ChatContextProps) => {
  const { ws } = useSocket();
  const { user } = useUser();
  const { code } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);

  const onSend = (content: string) => {
    const message: Message = {
      content,
      user: user!,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, message]);

    ws.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      code: code,
      data: message,
    });
  };

  useEffect(() => {
    ws.on(SOCKET_EVENTS.RECEIVE_MESSAGE, (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      ws.off(SOCKET_EVENTS.RECEIVE_MESSAGE);
    };
  }, []);

  return (
    <ChatContext.Provider value={{ messages, onSend }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
