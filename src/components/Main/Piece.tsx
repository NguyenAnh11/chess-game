import { Box, Image } from "@chakra-ui/react";
import { CSSProperties, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useChess } from "../../contexts/ChessContext";
import { Square } from "chess.js";
import { Piece as Pc } from "../../types";

type PieceProps = {
  piece: Pc;
  square: Square;
};

export default function Piece({ piece, square }: PieceProps) {
  const { moveMethod, onDragPieceBegin, pieceStyle } = useChess();

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

  const style = useMemo(
    (): CSSProperties => ({
      opacity: isDragging ? 0 : 1,
      cursor: moveMethod === "c" ? "default" : "grab",
    }),
    [moveMethod, isDragging]
  );

  return (
    <Box ref={drag} w="full" h="full" zIndex="5" style={style}>
      <Image src={pieceStyle[piece]}/>
    </Box>
  );
}
