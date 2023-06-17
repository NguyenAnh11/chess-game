import { Flex, Text } from "@chakra-ui/react";
import { MessageSystem } from "../../../../../types";

type ChatMessageSystemProps = {
  message: MessageSystem;
};

export default function ChatMessageSystem({ message }: ChatMessageSystemProps) {
  return (
    <Flex
      style={{ wordWrap: "break-word" }}
      cursor="text"
      color="#666564"
      mt="7px"
      py="0"
      px="4"
      wordBreak="break-word"
      direction="column"
    >
      <strong style={{ textTransform: "uppercase" }}>{message.type}</strong>
      <Text mt="1">{message.content}</Text>
    </Flex>
  );
}
