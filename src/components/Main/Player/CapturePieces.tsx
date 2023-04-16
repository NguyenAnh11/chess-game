import React, { useMemo } from "react";
import { PieceSymbol } from "chess.js";
import css from "./player.module.css";
import cn from "classnames";
import { Flex } from "@chakra-ui/react";

type CapturePiecesProps = {
  color: "w" | "b";
  score: number;
  pieces: { [p in Exclude<PieceSymbol, "k">]: number };
};

export default function CapturePieces({
  color,
  score,
  pieces,
}: CapturePiecesProps) {
  const piecesInfo: { [p in Exclude<PieceSymbol, "k">]: string } = {
    p: "pawn",
    b: "bishop",
    n: "knight",
    r: "rock",
    q: "queen",
  };

  const capturePiecesClassNames = useMemo(() => {
    const classNames = (
      Object.entries(piecesInfo) as [Exclude<PieceSymbol, "k">, string][]
    ).map(([pieceSymbol, pieceName]) => {
      let num = pieces[pieceSymbol];
      if (num === 1) return `captured_pieces_${color}_${pieceName}`;
      return `captured_pieces_${color}_${num}_${pieceName}s`;
    });

    return classNames;
  }, [pieces]);

  return (
    <React.Fragment>
      <Flex align="center">
        {capturePiecesClassNames.map((cpcn, index) => (
          <span
            key={index}
            className={cn(css.capture_pieces, css[cpcn])}
          ></span>
        ))}
        {score > 0 && (
          <span className={cn(css.capture_pieces, css.capture_pieces_score)}>
            +{score}
          </span>
        )}
      </Flex>
    </React.Fragment>
  );
}
