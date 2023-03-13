import React, { useRef } from "react";
import { Box, Flex, useOutsideClick } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import Squares from "./Squares";
import HighlightSquares from "./HighlightSquares";

type BoardMainProps = {};

export default function BoardMain(_: BoardMainProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { boardWidth, onClearSelectedSquare: onClearSelectedSquare } =
    useChess();

  useOutsideClick({
    ref: ref,
    handler: () => {
      onClearSelectedSquare();
    },
  });

  return (
    <React.Fragment>
      <Flex direction="column">
        <Box
          ref={ref}
          position="relative"
          width={`${boardWidth}px`}
          height={`${boardWidth}px`}
        >
          <HighlightSquares />
          <Squares />
        </Box>
      </Flex>
    </React.Fragment>
  );
}
