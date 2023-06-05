import {
  Box,
  Flex,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsSend } from "react-icons/bs";

export default function ChatInput() {
  const [value, setValue] = useState("");

  const onSend = () => {
    console.log("Value: ", value);
    setValue("");
  };

  return (
    <Box pos="relative" flexShrink="0" w="full">
      <Flex pos="relative" align="center" justify="center">
        <InputGroup>
          <Input
            aria-label="Send a message"
            placeholder="Send a message"
            size="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onSend();
              }
            }}
          />
          <InputRightElement pos="absolute" top="-3px">
            <Icon
              as={BsSend}
              cursor="pointer"
              fontSize="2xl"
              onClick={onSend}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}
