import { Box, Flex } from "@chakra-ui/react";
import MoveList from "../../Common/Moves/MoveList";

export default function MoveContainer() {
  return (
    <Flex flex="1 1 0" direction="column" minH="0">
      <Box overflow="auto" overflowY="scroll">
        <MoveList />
      </Box>
    </Flex>
  );
}
