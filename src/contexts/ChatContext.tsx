import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { SOCKET_EVENTS } from "../services/Socket";
import { Message, MessageSystem } from "../types";
import { useSocket } from "./SocketContext";
import { useUser } from "./UserContext";

type ChatContextProps = {
  children: ReactNode;
};

type ChatContext = {
  messages: Message[];
  onSend: (content: string) => void;
  onSendMessageSystem: (message: MessageSystem) => void;
};

export const ChatContext = createContext({} as ChatContext);

export const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }: ChatContextProps) => {
  const { user } = useUser();
  const { ws } = useSocket();
  const { code } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);

  const onSend = (content: string) => {
    const message: Message = {
      user,
      content,
      timestamp: Date.now(),
      isFromSystem: false,
    };

    setMessages((prev) => [...prev, message]);

    ws.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      code,
      data: message,
    });
  };

  const onSendMessageSystem = (message: MessageSystem) => {
    setMessages((prev) => [...prev, message]);

    ws.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      code,
      data: message
    })
  };

  useEffect(() => {
    ws.on(SOCKET_EVENTS.RECEIVE_MESSAGE, (message: Message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      ws.off(SOCKET_EVENTS.RECEIVE_MESSAGE);
    };
  }, []);

  return (
    <ChatContext.Provider value={{ messages, onSend, onSendMessageSystem }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
