import { Box, Image } from "@chakra-ui/react";
import classNames from "classnames";
import { Move } from "chess.js";
import { useChess } from "../../../contexts/ChessContext";
import { Piece } from "../../../types";

type MoveItemProps = {
  index: number;
  move: Move;
};

export default function MoveItem({ move, index }: MoveItemProps) {
  const { lastMove, pieceImages: pieceStyle, onStep } = useChess();

  const boxClass = classNames(
    "node",
    { white: move.color === "w", black: move.color !== "w" },
    { selected: move === lastMove }
  );

  const piece = (move.color + move.piece.toUpperCase()) as Piece;

  return move.piece === "p" ? (
    <Box className={boxClass} onClick={() => onStep(index)}>
      {move.san}
    </Box>
  ) : (
    <Box className={boxClass} onClick={() => onStep(index)}>
      <Image className="icon-font-chess" src={pieceStyle[piece]} />
      {move.san}
    </Box>
  );
}
