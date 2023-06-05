import { Box, Flex } from "@chakra-ui/react";
import ChatInput from "./ChatInput";

export default function ChatList() {
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
          
        </Box>
        <ChatInput/>
      </Flex>
    </Flex>
  );
}
