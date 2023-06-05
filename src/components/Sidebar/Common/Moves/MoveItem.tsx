import { Box, Image } from "@chakra-ui/react";
import { Move } from "chess.js";
import classNames from "classnames";
import { useChess } from "../../../../contexts/ChessContext";
import { Piece } from "../../../../types";
import css from "./move.module.css";

type MoveItemProps = {
  index: number;
  move: Move;
};

export default function MoveItem({ move, index }: MoveItemProps) {
  const { lastMove, pieceImages, onStep } = useChess();

  const boxClass = classNames(css.node, {
    [css.white]: move.color === "w",
    [css.black]: move.color !== "w",
    [css.selected]: move === lastMove,
  });

  const piece = (move.color + move.piece.toUpperCase()) as Piece;

  return move.piece === "p" ? (
    <Box className={boxClass} onClick={() => onStep(index + 1)}>
      {move.san}
    </Box>
  ) : (
    <Box className={boxClass} onClick={() => onStep(index + 1)}>
      <Box w="4" h="4" mr="0.5">
        <Image src={pieceImages[piece]} />
      </Box>
      {move.san}
    </Box>
  );
}
