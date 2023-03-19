import { Box } from "@chakra-ui/react";
import { useChess } from "../../../contexts/ChessContext";
import PrimaryControls from "./Primary";
import BottomControls from "./Bottom";

export default function GameControls() {
  const {} = useChess();

  return (
    <Box flex="1" bg="#f1f1f1" w="full" px="6" pt="10" pb="4">
      <PrimaryControls />
      <BottomControls />
    </Box>
  );
}
