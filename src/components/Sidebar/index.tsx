import { Flex } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import GameControls from "./AI/Controls";
import MoveContainer from "./AI/Moves";

export default function BoardSidebar() {
  const {} = useChess();

  return (
    <Flex direction="column" ml="3" w="350px" h="full" bg="white">
      <MoveContainer />
      <GameControls />
    </Flex>
  );
}
