import { Box, Text } from "@chakra-ui/react";
import { UserInfo } from "../../../../../types";

type ChatMessageProps = {
  player: UserInfo;
  message: string;
};

export default function ChatMessage({ player, message }: ChatMessageProps) {
  return (
    <Box
      style={{ wordWrap: "break-word", wordBreak: "break-word" }}
      color="#666564"
      cursor="text"
      mt="7px"
      mx="0"
      mb="0"
      py="0"
      px="4"
    >
      <Box color="#f3c536">
        <Text
          cursor="pointer"
          fontSize="14px"
          fontWeight="semibold"
          lineHeight="1.3"
        >
          {player.name}
        </Text>
      </Box>
      <Text whiteSpace="pre-wrap">{message}</Text>
    </Box>
  );
}
