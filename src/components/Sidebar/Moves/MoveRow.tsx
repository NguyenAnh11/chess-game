import { Box } from "@chakra-ui/react";
import { Move } from "chess.js";
import { useChess } from "../../../contexts/ChessContext";
import MoveItem from "./MoveItem";

type MoveRowProps = {
  index: number;
  steps: Move[];
};

export default function MoveRow({ index, steps }: MoveRowProps) {
  const { lastMove } = useChess();

  return (
    <Box className="move">
      {index}.
      {steps.map((move, i) => (
        <MoveItem key={i} move={move}/>
      ))}
    </Box>
  );
}
