import { Image } from "@chakra-ui/react";
import { CSSProperties, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useChess } from "../../contexts/ChessContext";
import { Square } from "chess.js";
import { Piece as Pc } from "../../types";

type PieceProps = {
  piece: Pc;
  square: Square;
  rects: { [sq in Square]?: DOMRect };
};

export default function Piece({ piece, square, rects }: PieceProps) {
  const {
    animationDuration,
    pieceImages,
    moveMethod,
    leftClick,
    promotion,
    isWaitingForAnimation,
    positionDifference,
    onDragPieceBegin,
  } = useChess();

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
    const isHidePiece =
      isDragging || (square === leftClick && promotion.waiting);

    setPieceStyle((prev) => ({ ...prev, opacity: isHidePiece ? 0 : 1 }));
  }, [isDragging, promotion.waiting]);

  useEffect(() => {
    const removedPiece = positionDifference.removed?.[square];

    if (!positionDifference.added) return;

    const newSquare = (
      Object.entries(positionDifference.added) as [Square, Pc][]
    ).find(
      ([s, p]) =>
        p === removedPiece ||
        (removedPiece?.[1] === "P" && (s[1] === "1" || s[1] === "8"))
    );

    if (isWaitingForAnimation && removedPiece && newSquare) {
      const source = rects[square],
        target = rects[newSquare[0]];
      if (source && target) {
        setPieceStyle((prev) => ({
          ...prev,
          zIndex: 6,
          transition: `transform ${animationDuration}ms`,
          transform: `translate(${target.x - source.x}px, ${
            target.y - source.y
          }px)`,
        }));
      }
    }
  }, [isWaitingForAnimation, positionDifference]);

  return <Image ref={drag} style={pieceStyle} src={pieceImages[piece]} />;
}
