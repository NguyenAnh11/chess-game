import React, { CSSProperties } from "react";
import { Box } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";

export default function HintSquares() {
  const { hintMoves } = useChess();

  return (
    <React.Fragment>
      {hintMoves.map((move, index) => {
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
            className={`hint square square-${move.col + 1}${8 - move.row}`}
          ></Box>
        );
      })}
    </React.Fragment>
  );
}
