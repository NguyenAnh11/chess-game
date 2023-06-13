import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatMessageGameOver from "./ChatMessageGameOver";
import { useChat } from "../../../../../contexts/ChatContext";
import { MessageGameOver, MessageSystem } from "../../../../../types";

export default function ChatList() {
  const { messages } = useChat();

  const messageNodes = useMemo((): ReactNode[] => {
    const nodes: ReactNode[] = [];

    for (const message of messages) {
      if (message.isFromSystem) {
        const messageSystem = message as MessageSystem;

        if (messageSystem.type === "Game Over") {
          nodes.push(
            <ChatMessageGameOver
              key={message.timestamp}
              message={message as MessageGameOver}
            />
          );
        }
      } else {
        nodes.push(<ChatMessage key={message.timestamp} message={message} />);
      }
    }

    return nodes;
  }, [messages]);

  return (
    <Flex pos="relative" flex="0" direction="column" minH="200px" h="200px">
      <Flex pos="relative" flex="1 1 auto" direction="column">
        <Box
          flex="1 0 0"
          fontSize="13px"
          lineHeight="shorter"
          m="0"
          py="4"
          px="0"
          overflow="auto"
        >
          {messageNodes}
        </Box>
        <ChatInput />
      </Flex>
    </Flex>
  );
}
