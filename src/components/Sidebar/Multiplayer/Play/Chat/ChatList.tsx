import { Box, Flex } from "@chakra-ui/react";
import ChatInput from "./ChatInput";
import { useChat } from "../../../../../contexts/ChatContext";
import ChatMessage from "./ChatMessage";

export default function ChatList() {
  const { messages } = useChat();

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
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </Box>
        <ChatInput />
      </Flex>
    </Flex>
  );
}
