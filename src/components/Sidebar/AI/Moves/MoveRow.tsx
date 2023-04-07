import { Box } from "@chakra-ui/react";
import { Move } from "chess.js";
import MoveItem from "./MoveItem";
import css from "./move.module.css"

type MoveRowProps = {
  index: number;
  steps: Move[];
};

export default function MoveRow({ index, steps }: MoveRowProps) {
  return (
    <Box className={css.move}>
      {index + 1}.
      {steps.map((move, i) => (
        <MoveItem key={i} index={(index * 2) + i} move={move} />
      ))}
    </Box>
  );
}
