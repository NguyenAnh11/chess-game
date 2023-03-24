import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useChess } from "../../../contexts/ChessContext";
import { Move } from "chess.js";
import MoveRow from "./MoveRow";

export default function MoveList() {
  const { viewHistory } = useChess();

  const viewSteps = useMemo((): Array<Move[]> => {
    const step: Array<Move[]> = [];
    const chunkSize = 2;
    for (let index = 0; index < viewHistory.length; index += chunkSize) {
      const moves = viewHistory.slice(index, index + chunkSize);
      step.push(moves);
    }

    return step;
  }, [viewHistory]);

  return (
    <Box overflowX="hidden" overflowY="auto" userSelect="none">
      {viewSteps.map((steps, index) => (
        <MoveRow key={index} index={index + 1} steps={steps} />
      ))}
    </Box>
  );
}
