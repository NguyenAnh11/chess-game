import React, { useRef } from "react";
import { Box, Flex, useOutsideClick } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import Squares from "./Squares";
import HighlightSquares from "./HighlightSquares";
import MoveHints from "./MoveHints";
import CaptureHints from "./CaptureHints";

type BoardMainProps = {};

export default function BoardMain(_: BoardMainProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { onClearLeftClick } = useChess();

  useOutsideClick({
    ref: ref,
    handler: () => {
      onClearLeftClick();
    },
  });

  return (
    <React.Fragment>
      <Flex direction="column">
        <Box ref={ref} position="relative" w="xl" height="xl">
          <HighlightSquares />
          <Squares />
          <MoveHints/>
          <CaptureHints/>
        </Box>
      </Flex>
    </React.Fragment>
  );
}
