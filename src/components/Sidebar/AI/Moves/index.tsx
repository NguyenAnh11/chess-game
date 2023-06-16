import { Flex, Box } from "@chakra-ui/react";
import MoveList from "../../Common/Moves/MoveList";

export default function MoveContainer() {
  return (
    <Flex flex="4" h="full" direction="column" overflow="hidden">
      <Box overflow="auto" overflowY="scroll">
        <MoveList />
      </Box>
    </Flex>
  );
}
