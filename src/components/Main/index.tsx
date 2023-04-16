import React, { forwardRef, RefObject } from "react";
import { Box, Flex, useOutsideClick } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import Squares from "./Squares";
import HighlightSquares from "./HighlightSquares";
import HintMoves from "./HintMoves";
import Arrows from "./Arrows";
import Promotion from "./Promotion";

type BoardMainProps = {};

const BoardMain = forwardRef<HTMLDivElement, BoardMainProps>(({}, ref) => {
  const { promotion, onClearLeftClick, onClearRightClicks } = useChess();

  useOutsideClick({
    ref: ref as RefObject<HTMLDivElement>,
    handler: () => {
      onClearLeftClick();
      onClearRightClicks();
    },
  });

  return (
    <React.Fragment>
      <Flex direction="column" my="2.5">
        <Box ref={ref} position="relative" w="xl" height="xl">
          <HighlightSquares />
          <Squares />
          <HintMoves />
          <Arrows />
          {promotion.show && <Promotion />}
        </Box>
      </Flex>
    </React.Fragment>
  );
});

export default BoardMain;
