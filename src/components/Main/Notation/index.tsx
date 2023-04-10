import { Box } from "@chakra-ui/react";
import { CSSProperties, useMemo } from "react";
import { useChess } from "../../../contexts/ChessContext";
import { BLACK_ROWS, COLUMNS, WHITE_ROWS } from "../../../utils";
import css from "./notation.module.css";
import cn from "classnames";

type NotationProps = {
  r: number;
  c: number;
  isBlack: boolean;
};

export default function Notation({ r, c, isBlack }: NotationProps) {
  const { orientation, squareStyle } = useChess();

  const row = useMemo(
    () => (orientation === "w" ? WHITE_ROWS[r] : BLACK_ROWS[r]) + 1,
    [orientation, r]
  );

  const col = useMemo(
    () => (orientation === "w" ? COLUMNS[c] : COLUMNS[7 - c]),
    [orientation, c]
  );

  const colorStyle = useMemo(
    (): CSSProperties => ({
      color: isBlack
        ? squareStyle["default.light"]
        : squareStyle["default.dark"],
    }),
    [squareStyle]
  );

  return (
    <>
      {r === 7 && c === 0 && (
        <>
          <Box style={colorStyle} className={cn(css.notation, css.number)}>
            {row}
          </Box>
          <Box style={colorStyle} className={cn(css.notation, css.alpha)}>
            {col}
          </Box>
        </>
      )}
      {c === 0 && r !== 7 && (
        <Box style={colorStyle} className={cn(css.notation, css.number)}>
          {row}
        </Box>
      )}
      {r === 7 && c !== 0 && (
        <Box style={colorStyle} className={cn(css.notation, css.alpha)}>
          {col}
        </Box>
      )}
    </>
  );
}
