import { Box } from "@chakra-ui/react";
import React, { CSSProperties } from "react";
import { useChess } from "../contexts/ChessContext";
import { getSquareInfo } from "../utils";
import "../index.css";

type HighlightSquaresProps = {};

export default function HighlightSquares(_: HighlightSquaresProps) {
  const { orientation, squareStyle, highlightSquares, kingUnderAttack } =
    useChess();

  return (
    <React.Fragment>
      {highlightSquares.map((hq, index) => {
        const { row, col, color } = getSquareInfo(hq.square, orientation);

        const style: CSSProperties = {};
        switch (hq.type) {
          case "left":
            style.background = squareStyle["highlight"];
            break;
          case "premove":
          case "right":
            style.background =
              color === "b"
                ? squareStyle["premove:dark"]
                : squareStyle["premove:light"];
            break;
        }

        return (
          <Box
            key={index}
            style={style}
            className={`highlight square square-${col + 1}${8 - row}`}
          />
        );
      })}
      {kingUnderAttack && (
        <Box
          bg={squareStyle["king:check"]}
          className={`king square square-${kingUnderAttack.col + 1}${
            8 - kingUnderAttack.row
          }`}
        />
      )}
    </React.Fragment>
  );
}
