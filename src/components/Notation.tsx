import { Box } from "@chakra-ui/react";
import React, { CSSProperties, useMemo } from "react";
import { useChess } from "../contexts/ChessContext";
import { BLACK_ROWS, WHITE_ROWS, COLUMNS } from "../utils/consts";

type NotationProps = {
  r: number;
  c: number;
  isBlack: boolean;
};

export default function Notation({ r, c, isBlack }: NotationProps) {
  const { orientation, coordinate, squareStyle } = useChess();

  const row = useMemo(
    () => (orientation === "w" ? WHITE_ROWS[r] : BLACK_ROWS[r]) + 1,
    [r, orientation]
  );

  const col = useMemo(
    () => (orientation === "w" ? COLUMNS[c] : COLUMNS[7 - c]),
    [c, orientation]
  );

  const boxStyle = useMemo(() => {
    const style: CSSProperties = {
      zIndex: 2,
      position: "absolute",
      userSelect: "none",
      color:
        coordinate === "outside"
          ? "black"
          : isBlack
          ? squareStyle["default.light"]
          : squareStyle["default.dark"],
      fontWeight: 600,
      padding: "0px 5px",
    };

    return style;
  }, [coordinate]);

  const numbericStyle = useMemo((): CSSProperties => {
    return coordinate === "inside"
      ? { alignSelf: "flex-start" }
      : { left: "-45%", alignSelf: "center" };
  }, [coordinate]);

  const alphaStyle = useMemo((): CSSProperties => {
    return coordinate === "inside"
      ? { alignSelf: "flex-end", right: 0 }
      : { bottom: "-45%", left: "-35%" };
  }, [coordinate]);

  if (r === 7 && c === 0)
    return (
      <React.Fragment>
        <Box style={{ ...boxStyle, ...numbericStyle }}>{row}</Box>
        <Box style={{ ...boxStyle, ...alphaStyle }}>{col}</Box>
      </React.Fragment>
    );

  if (c === 0)
    return <Box style={{ ...boxStyle, ...numbericStyle }}>{row}</Box>;

  if (r === 7) return <Box style={{ ...boxStyle, ...alphaStyle }}>{col}</Box>;

  return null;
}
