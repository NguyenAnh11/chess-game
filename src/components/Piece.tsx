import { Box } from "@chakra-ui/react";
import { CSSProperties, ReactNode, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useChess } from "../contexts/ChessContext";
import { Square } from "chess.js";
import { Piece as Pc } from "../types";
import { PIECES } from "../utils";

type PieceProps = {
  piece: Pc;
  square: Square;
};

export default function Piece({ piece, square }: PieceProps) {
  const { moveMethod, width } = useChess();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "piece",
      item: { square },
      options: {
        dropEffect: "move"
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const pieceStyle = useMemo((): CSSProperties => {
    return {
      zIndex: 5,
      opacity: isDragging ? 0 : 1,
      cursor: moveMethod === "c" ? "default" : "grab",
    };
  }, [moveMethod, isDragging]);

  return (
    <Box ref={drag} style={pieceStyle}>
      <svg viewBox={"1 1 43 43"} width={width / 8} height={width / 8}>
        <g>{PIECES[piece] as ReactNode}</g>
      </svg>
    </Box>
  );
}
