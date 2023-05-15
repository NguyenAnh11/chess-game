import { useMemo } from "react";
import { Box, Icon } from "@chakra-ui/react";
import cn from "classnames";
import css from "./promotion.module.css";
import { IoMdClose } from "react-icons/io";
import { useChess } from "../../../contexts/ChessContext";
import { BoardColumn, Piece } from "../../../types";
import { BLACK_COLUMNS, WHITE_COLUMNS, PROMOTION_PIECES } from "../../../utils";

export default function Promotion() {
  const {
    orientation,
    pieceImages,
    promotion: { color, square },
    onClosePromotion,
    onChoosedPiecePromotion,
  } = useChess();

  const col = useMemo((): number => {
    const columns = orientation === "w" ? WHITE_COLUMNS : BLACK_COLUMNS;
    return columns[square![0] as BoardColumn];
  }, [orientation, square]);

  const position = useMemo((): { top: boolean; bottom: boolean } => {
    return orientation === color
      ? { top: true, bottom: false }
      : { top: false, bottom: true };
  }, []);
  
  return (
    <Box
      style={{ transform: `translateX(${col * 100}%)` }}
      className={cn(
        css.promotion_window,
        position.top && css.top,
        position.bottom && css.bottom
      )}
    >
      <button className={css.close_button} onClick={onClosePromotion}>
        <Icon as={IoMdClose} />
      </button>
      {PROMOTION_PIECES.map((piece, index) => {
        const pieceImage = pieceImages[(color + piece.toUpperCase()) as Piece];
        return (
          <Box
            key={index}
            bgImage={`url(${pieceImage})`}
            className={css.promotion_price}
            onClick={() => onChoosedPiecePromotion(piece)}
          />
        );
      })}
    </Box>
  );
}
