import React, { forwardRef, RefObject } from "react";
import { Box, useOutsideClick } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import Squares from "./Squares";
import HighlightSquares from "./HighlightSquares";
import Notation from "./Notation";

type BoardMainProps = {};

const BoardMain = forwardRef<HTMLDivElement, BoardMainProps>(
  (props: BoardMainProps, ref) => {
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
          <Notation />
          <HighlightSquares />
          <Squares />
        </Box>
      </React.Fragment>
    );
  }
);

export default BoardMain;
