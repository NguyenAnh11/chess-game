import { Flex, Text } from "@chakra-ui/react";
import { Message } from "../../../../../types";

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Flex
      style={{ wordWrap: "break-word", wordBreak: "break-word" }}
      color="#666564"
      cursor="text"
      mt="7px"
      mx="0"
      mb="0"
      py="0"
      px="4"
    >
      <Text
        color="#f3c536"
        fontSize="14px"
        cursor="pointer"
        lineHeight="1.3"
        fontWeight="semibold"
      >
        {message.user.name}:
      </Text>
      <Text ml="1.5" whiteSpace="pre-wrap">{message.content}</Text>
    </Flex>
  );
}
