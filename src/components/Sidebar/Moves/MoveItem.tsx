import { Box, Image } from "@chakra-ui/react";
import { Move } from "chess.js";
import { useMemo } from "react";
import { useChess } from "../../../contexts/ChessContext";
import { Piece } from "../../../types";

type MoveItemProps = {
  move: Move;
};

export default function MoveItem({ move }: MoveItemProps) {
  const { lastMove, pieceStyle } = useChess();

  const className = useMemo((): string => {
    let name = "node ";
    name += move.color === "w" ? "white " : "black ";
    name += move === lastMove ? "selected" : "";
    return name;
  }, [move, lastMove]);

  const piece = (move.color + move.piece.toUpperCase()) as Piece;

  return move.piece === "p" ? (
    <Box className={className}>{move.san}</Box>
  ) : (
    <Box className={className}>
      <Image className="icon-font-chess" src={pieceStyle[piece]} />
      {move.san}
    </Box>
  );
}
