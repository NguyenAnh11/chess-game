import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { Square as Sq } from "chess.js";
import { COLUMNS } from "../utils";
import Piece from "./Piece";
import Square from "./Square";

export default function Squares() {
  const { orientation, position } = useChess();

  return (
    <Box position="relative" w="full" h="full" cursor="default">
      {[...new Array(8)].map((_, row) => (
        <Wrap key={row}>
          {[...new Array(8)].map((_, col) => {
            const square =
              orientation === "w"
                ? ((COLUMNS[col] + (8 - row)) as Sq)
                : ((COLUMNS[7 - col] + (row + 1)) as Sq);

            const squareColor = (row + col) % 2 === 0 ? "w" : "b"

            return (
              <WrapItem key={`${row}${col}`}>
                <Square row={row} col={col} square={square} squareColor={squareColor}>
                  {position[square] && (
                    <Piece piece={position[square]!} square={square} />
                  )}
                </Square>
              </WrapItem>
            );
          })}
        </Wrap>
      ))}
    </Box>
  );
}
