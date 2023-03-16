import { Box } from "@chakra-ui/react";
import { CSSProperties, useMemo } from "react";
import { useChess } from "../contexts/ChessContext";
import { BLACK_ROWS, COLUMNS, WHITE_ROWS } from "../utils";

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

  const baseStyle = useMemo(
    (): CSSProperties => ({
      position: "absolute",
      userSelect: "none",
      padding: "0px 2px",
      fontWeight: 600,
      fontSize: 576 / 35,
      zIndex: 2,
      color: isBlack
        ? squareStyle["default.light"]
        : squareStyle["default.dark"],
    }),
    [squareStyle]
  );

  const alphaStyle = { alignSelf: "flex-end", right: 0 };

  const numbericStyle = { alignSelf: "flex-start" };

  if (r === 7 && c === 0)
    return (
      <>
        <Box style={{ ...baseStyle, ...numbericStyle }}>{row}</Box>
        <Box style={{ ...baseStyle, ...alphaStyle }}>{col}</Box>
      </>
    );

  if (c === 0)
    return <Box style={{ ...baseStyle, ...numbericStyle }}>{row}</Box>;

  if (r === 7) return <Box style={{ ...baseStyle, ...alphaStyle }}>{col}</Box>;

  return null;
}
