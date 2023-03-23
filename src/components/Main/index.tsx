import React, { useRef } from "react";
import { Box, Flex, useOutsideClick } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import Squares from "./Squares";
import HighlightSquares from "./HighlightSquares";
import HintMoves from "./HintMoves";
import Arrows from "./Arrows";

export default function BoardMain() {
  const ref = useRef<HTMLDivElement>(null);

  const { onClearLeftClick, onClearRightClicks } = useChess();

  useOutsideClick({
    ref: ref,
    handler: () => {
      onClearLeftClick();
      onClearRightClicks();
    },
  });

  return (
    <React.Fragment>
      <Flex direction="column">
        <Box ref={ref} position="relative" w="xl" height="xl">
          <HighlightSquares />
          <Squares />
          <HintMoves />
          <Arrows/>
        </Box>
      </Flex>
    </React.Fragment>
  );
}
