import React, { forwardRef, RefObject } from "react";
import { Box, useOutsideClick } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import Squares from "./Squares";
import HighlightSquare from "./HighlightSquares";

type BoardProps = {};

const Board = forwardRef<HTMLDivElement, BoardProps>((_: BoardProps, ref) => {
  const { width, onClearSelectedSquare } = useChess();

  useOutsideClick({
    ref: ref as RefObject<HTMLDivElement>,
    handler: () => {
      onClearSelectedSquare();
    },
  });

  return (
    <React.Fragment>
      <Box
        ref={ref}
        position="relative"
        width={`${width}px`}
        height={`${width}px`}
      >
        <HighlightSquare />
        <Squares />
      </Box>
    </React.Fragment>
  );
});

export default Board;
