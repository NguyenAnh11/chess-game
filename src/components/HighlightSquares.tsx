import { Box } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useChess } from "../contexts/ChessContext";

export default function HighlightSquare() {
  const { highlightSquares, squareCoords, width } = useChess();

  const highlightBox = useMemo(
    () =>
      highlightSquares.map((sq, index) => {
        const coord = squareCoords[sq]!;
        return (
          <Box
            key={index}
            position="absolute"
            top={coord.y}
            left={coord.x}
            w={width / 8}
            h={width / 8}
            bg="red.200"
            zIndex={1}
          />
        );
      }),
    [highlightSquares]
  );

  return <React.Fragment>{highlightBox}</React.Fragment>;
}
