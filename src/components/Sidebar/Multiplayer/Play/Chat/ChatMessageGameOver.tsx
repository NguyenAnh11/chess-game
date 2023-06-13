import { Flex, Text } from "@chakra-ui/react";
import { MessageGameOver } from "../../../../../types";

type ChatMessageGameOverProps = {
  message: MessageGameOver;
};

export default function ChatMessageGameOver({
  message,
}: ChatMessageGameOverProps) {
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
      <strong>GAME OVER</strong>
      <Text mt="1">{message.content}</Text>
    </Flex>
  );
}
