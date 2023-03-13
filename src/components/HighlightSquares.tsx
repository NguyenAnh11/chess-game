import { Box } from "@chakra-ui/react";
import React, { CSSProperties, useMemo } from "react";
import { useChess } from "../contexts/ChessContext";
import { getPosition } from "../utils";
import "../index.css";

type HighlightSquaresProps = {};

export default function HighlightSquares(_: HighlightSquaresProps) {
  const { orientation, boardWidth, squareStyle, highlightSquares } = useChess();

  const style = useMemo(
    (): CSSProperties => ({
      width: `${boardWidth / 8}px`,
      height: `${boardWidth / 8}px`,
      backgroundColor: squareStyle["highlight"],
      pointerEvents: "none",
      opacity: 0.5,
      zIndex: 1,
    }),
    [boardWidth]
  );

  return (
    <React.Fragment>
      {highlightSquares.map((square, index) => {
        const { row, col } = getPosition(square, orientation);

        return (
          <Box
            key={index}
            style={style}
            className={`square square-${col + 1}${8 - row}`}
          />
        );
      })}
    </React.Fragment>
  );
}
