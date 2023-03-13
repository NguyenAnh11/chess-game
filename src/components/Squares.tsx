import { Box, Flex } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { Square as Sq } from "chess.js";
import { COLUMNS, getDefaultSquareStyle } from "../utils";
import Piece from "./Piece";
import Square from "./Square";
import "../index.css";
import { CSSProperties, useMemo } from "react";

export default function Squares() {
  const { width, orientation, squareStyle, position } = useChess();

  const defaultStyle = useMemo(() => getDefaultSquareStyle(width), [width]);

  return (
    <Box w={`${width}px`} h={`${width}px`} cursor="default" position="relative">
      {[...new Array(8)].map((_, row) => (
        <Flex key={row} flexWrap="wrap" w={`${width}px`}>
          {[...new Array(8)].map((_, col) => {
            const square =
              orientation === "w"
                ? ((COLUMNS[col] + (8 - row)) as Sq)
                : ((COLUMNS[7 - col] + (row + 1)) as Sq);

            const isBlack = (row + col) % 2 !== 0;

            const style: CSSProperties = {
              ...defaultStyle,
              backgroundColor: isBlack
                ? squareStyle["default.dark"]
                : squareStyle["default.light"],
              touchAction: "none",
              willChange: "transform",
            };

            return (
              <Flex
                className={`square-${col + 1}${8 - row}`}
                key={`${row}${col}`}
                style={style}
              >
                <Square r={row} c={col} square={square} isBlack={isBlack}>
                  {position[square] && (
                    <Piece piece={position[square]!} square={square} />
                  )}
                </Square>
              </Flex>
            );
          })}
        </Flex>
      ))}
    </Box>
  );
}
