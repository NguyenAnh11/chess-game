import { Box } from "@chakra-ui/react";
import { Move } from "chess.js";
import MoveItem from "./MoveItem";

type MoveRowProps = {
  index: number;
  steps: Move[];
};

export default function MoveRow({ index, steps }: MoveRowProps) {
  return (
    <Box className="move">
      {index}.
      {steps.map((move, i) => (
        <MoveItem key={i} move={move} />
      ))}
    </Box>
  );
}
