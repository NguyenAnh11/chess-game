import { Flex, Box } from "@chakra-ui/react";
import MoveList from "../../Common/Moves/MoveList";

export default function MoveContainer() {
  return (
    <Flex flex="4 1 0" minH="0" direction="column" overflow="hidden">
      <Box overflow="auto" overflowY="scroll">
        <MoveList />
      </Box>
    </Flex>
  );
}
