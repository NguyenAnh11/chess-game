import { Image } from "@chakra-ui/react";
import { CSSProperties, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useChess } from "../../contexts/ChessContext";
import { Square } from "chess.js";
import { Piece as Pc } from "../../types";

type PieceProps = {
  piece: Pc;
  square: Square;
  rect: DOMRect | undefined;
};

export default function Piece({ piece, square }: PieceProps) {
  const { pieceImages, moveMethod, onDragPieceBegin } = useChess();

  const [pieceStyle, setPieceStyle] = useState<CSSProperties>({
    zIndex: 5,
    opacity: 1,
    cursor: moveMethod === "c" ? "default" : "-webkit-grab",
  });

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "piece",
      item: () => {
        onDragPieceBegin(square);
        return { square };
      },
      options: {
        dropEffect: "move",
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    setPieceStyle((prev) => ({ ...prev, opacity: isDragging ? 0 : 1 }));
  }, [isDragging]);

  return <Image ref={drag} style={pieceStyle} src={pieceImages[piece]} />;
}
