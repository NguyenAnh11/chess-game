import { Box, Image } from "@chakra-ui/react";
import { Move } from "chess.js";
import { useMemo } from "react";
import { useChess } from "../../../contexts/ChessContext";
import { Piece } from "../../../types";

type MoveItemProps = {
  index: number;
  move: Move;
};

export default function MoveItem({ move, index }: MoveItemProps) {
  const { lastMove, pieceStyle, onStep } = useChess();

  const className = useMemo((): string => {
    let name = "node ";
    name += move.color === "w" ? "white " : "black ";
    name += move === lastMove ? "selected" : "";
    return name;
  }, [move, lastMove]);

  const piece = (move.color + move.piece.toUpperCase()) as Piece;

  return move.piece === "p" ? (
    <Box className={className} onClick={() => onStep(index)}>
      {move.san}
    </Box>
  ) : (
    <Box className={className} onClick={() => onStep(index)}>
      <Image className="icon-font-chess" src={pieceStyle[piece]} />
      {move.san}
    </Box>
  );
}
