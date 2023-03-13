import { Box, Flex } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { Square as Sq } from "chess.js";
import { COLUMNS } from "../utils";
import Piece from "./Piece";
import Square from "./Square";

export default function Squares() {
  const { boardWidth: width, orientation, position } = useChess();

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
            return (
              <Square
                key={`${row}${col}`}
                row={row}
                col={col}
                square={square}
                isBlack={isBlack}
              >
                {position[square] && (
                  <Piece piece={position[square]!} square={square} />
                )}
              </Square>
            );
          })}
        </Flex>
      ))}
    </Box>
  );
}
