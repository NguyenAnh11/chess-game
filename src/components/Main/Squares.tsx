import { ReactElement } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import { Square as Sq } from "chess.js";
import { COLUMNS } from "../../utils";
import Piece from "./Piece";
import Square from "./Square";

export default function Squares() {
  const { orientation, position } = useChess();

  const _render = (): ReactElement[] => {
    const squares: ReactElement[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square =
          orientation === "w"
            ? ((COLUMNS[col] + (8 - row)) as Sq)
            : ((COLUMNS[7 - col] + (row + 1)) as Sq);

        const squareColor = (row + col) % 2 === 0 ? "w" : "b";
        squares.push(
          <Square
            key={`${row}-${col}`}
            row={row}
            col={col}
            square={square}
            squareColor={squareColor}
          >
            {position[square] && (
              <Piece piece={position[square]!} square={square} />
            )}
          </Square>
        );
      }
    }

    return squares;
  };

  return (
    <Box position="relative" w="full" h="full" cursor="default">
      <Grid templateRows="8" templateColumns="8">
        {_render()}
      </Grid>
    </Box>
  );
}
