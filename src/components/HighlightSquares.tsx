import { Box } from "@chakra-ui/react";
import React, { CSSProperties } from "react";
import { useChess } from "../contexts/ChessContext";
import "../index.css";

type HighlightSquaresProps = {};

export default function HighlightSquares(_: HighlightSquaresProps) {
  const { squareStyle, highlightSquares, kingUnderAttack } = useChess();

  return (
    <React.Fragment>
      {highlightSquares.map((hq, index) => {
        const style: CSSProperties = {};
        switch (hq.type) {
          case "left":
            style.background = squareStyle["highlight"];
            break;
          case "premove":
          case "right":
            style.background =
              hq.color === "b"
                ? squareStyle["premove:dark"]
                : squareStyle["premove:light"];
            break;
        }

        return (
          <Box
            key={index}
            style={style}
            className={`highlight square square-${hq.col + 1}${8 - hq.row}`}
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
