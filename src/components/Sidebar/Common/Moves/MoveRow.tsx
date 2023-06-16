import { Fragment } from "react";
import { Box } from "@chakra-ui/react";
import MoveItem from "./MoveItem";
import css from "./move.module.css";
import { Move } from "chess.js";

type MoveRowProps = {
  index: number;
  steps: Move[];
};

export default function MoveRow({ index, steps }: MoveRowProps) {
  return (
    <Box className={css.move} bg={index % 2 === 1 ? "#f8f8f8" : "#fff"}>
      {index + 1}.
      {steps.map((move, i) => (
        <Fragment key={i}>
          <MoveItem index={index * 2 + i} move={move} />
        </Fragment>
      ))}
    </Box>
  );
}
