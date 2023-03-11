import { Box, Flex } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { Square as Sq } from "chess.js";
import { COLUMNS } from "../utils/consts";
import Piece from "./Piece";
import Square from "./Square";

export default function Squares() {
  const { width, orientation, position } = useChess();

  return (
    <Box w={`${width}px`} h={`${width}px`} cursor="default">
      {[...new Array(8)].map((_, row) => (
        <Flex key={row} flexWrap="wrap" w={`${width}px`}>
          {[...new Array(8)].map((_, col) => {
            const square =
              orientation === "w"
                ? ((COLUMNS[col] + (8 - row)) as Sq)
                : ((COLUMNS[7 - col] + (row + 1)) as Sq);
            const isBlack = (row + col) % 2 !== 0;

            return (
              <Box key={`${row}${col}`}>
                <Square r={row} c={col} square={square} isBlack={isBlack}>
                  {position[square] && (
                    <Piece piece={position[square]!} square={square} />
                  )}
                </Square>
              </Box>
            );
          })}
        </Flex>
      ))}
    </Box>
  );
}
