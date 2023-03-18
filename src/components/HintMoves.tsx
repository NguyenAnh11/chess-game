import React, { CSSProperties } from "react";
import { Box } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { getSquareInfo } from "../utils";

export default function HintSquares() {
  const { hintMoves, orientation } = useChess();

  return (
    <React.Fragment>
      {hintMoves.map((move, index) => {
        const { row, col } = getSquareInfo(move.square, orientation);

        const style: CSSProperties = {};
        switch (move.type) {
          case "hint":
            style.padding = "4.2%";
            style.backgroundColor = "rgba(0,0,0, 0.1)";
            break;

          case "capture":
            style.border = "5px solid rgba(0,0,0,0.1)";
            break;
        }

        return (
          <Box
            key={index}
            style={style}
            className={`hint square square-${col + 1}${8 - row}`}
          ></Box>
        );
      })}
    </React.Fragment>
  );
}
