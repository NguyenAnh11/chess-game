import { Box } from "@chakra-ui/react";
import React, { CSSProperties } from "react";
import { useChess } from "../contexts/ChessContext";
import { getSquareInfo } from "../utils";
import "../index.css";

type HighlightSquaresProps = {};

export default function HighlightSquares(_: HighlightSquaresProps) {
  const { orientation, squareStyle, highlightSquares } = useChess();

  return (
    <React.Fragment>
      {highlightSquares.map((hq, index) => {
        const { row, col, color } = getSquareInfo(hq.square, orientation);

        const style: CSSProperties = {};
        switch (hq.type) {
          case "left":
            style.background = squareStyle["highlight"];
            style.opacity = 0.5;
            break;
          case "premove":
          case "right":
            style.background =
              color === "b"
                ? squareStyle["premove:dark"]
                : squareStyle["premove:light"];
            style.opacity = 0.5;
            break;
          case "king:check":
            style.background = squareStyle["king:check"];
            break;
        }

        return (
          <Box
            key={index}
            style={style}
            className={`highlight square-${col + 1}${8 - row}`}
          />
        );
      })}
    </React.Fragment>
  );
}
