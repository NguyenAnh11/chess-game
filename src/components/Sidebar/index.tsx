import { Flex } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import GameControls from "./Controls";
import MoveContainer from "./Moves";

export default function BoardSidebar() {
  const {} = useChess();
  
  return (
    <Flex
      direction="column"
      ml="5"
      w="350px"
      h="full"
      bg="white"
      borderRadius="lg"
    >
      <MoveContainer/>
      <GameControls/>
    </Flex>
  );
}
