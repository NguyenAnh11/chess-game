import { Box } from "@chakra-ui/react";
import React, { CSSProperties, useMemo } from "react";
import { useChess } from "../contexts/ChessContext";
import { getPosition, getDefaultSquareStyle } from "../utils";
import "../index.css";

type HighlightSquaresProps = {};

export default function HighlightSquares(props: HighlightSquaresProps) {
  const { width, orientation, squareStyle, highlightMoves } = useChess();

  const style = useMemo((): CSSProperties => {
    return {
      ...getDefaultSquareStyle(width),
      backgroundColor: squareStyle["highlight"],
      pointerEvents: "none",
      opacity: 0.5,
      zIndex: 1,
    };
  }, [width]);

  return (
    <React.Fragment>
      {highlightMoves.map((square, index) => {
        const { row, col } = getPosition(square, orientation);

        return (
          <Box
            key={index}
            style={style}
            className={`square-${col + 1}${8 - row}`}
            onMouseDownCapture={(e) => {
              console.log(e.target);
            }}
          />
        );
      })}
    </React.Fragment>
  );
}
