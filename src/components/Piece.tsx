import { Image, Flex } from "@chakra-ui/react";
import { CSSProperties, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useChess } from "../contexts/ChessContext";
import { Square } from "chess.js";
import { Piece as Pc } from "../types";
import { PIECE_COLOR_OPTIONS } from "../utils/consts";

type PieceProps = {
  piece: Pc;
  square: Square;
};

export default function Piece({ piece, square }: PieceProps) {
  const { moveMethod, pieceColor } = useChess();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "piece",
      item: { square },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const pieceStyle = useMemo((): CSSProperties => {
    return {
      zIndex: 5,
      touchAction: "none",
      cursor: moveMethod === "c" ? "default" : "-webkit-grab",
      opacity: isDragging ? 0 : 1,
    };
  }, [moveMethod, isDragging]);

  return (
    <Flex ref={drag} justify="center" align="center" style={pieceStyle}>
      <Image src={PIECE_COLOR_OPTIONS[pieceColor].pieces[piece]} />
    </Flex>
  );
}
