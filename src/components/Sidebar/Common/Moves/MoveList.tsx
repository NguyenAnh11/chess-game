import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useChess } from "../../../../contexts/ChessContext";
import MoveRow from "./MoveRow";
import { Move } from "chess.js";

export default function MoveList() {
  const { moves } = useChess();

  const viewSteps = useMemo((): Array<Move[]> => {
    const steps: Array<Move[]> = [];
    const chunkSize = 2;
    for (let index = 0; index < moves.length; index += chunkSize) {
      const step = moves.slice(index, index + chunkSize);
      steps.push(step);
    }

    return steps;
  }, [moves]);

  return (
    <Box overflowX="hidden" overflowY="auto" userSelect="none">
      {viewSteps.map((steps, index) => (
        <MoveRow key={index} index={index} steps={steps} />
      ))}
    </Box>
  );
}
