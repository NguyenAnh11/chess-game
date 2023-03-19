import { Flex } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import GameControls from "./GameControls";

export default function BoardSidebar() {
  const {} = useChess();
  
  return (
    <Flex
      direction="column"
      ml="5"
      w="400px"
      h="full"
      bg="white"
      borderRadius="lg"
    >
      <GameControls/>
    </Flex>
  );
}
