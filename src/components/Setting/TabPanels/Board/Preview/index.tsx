import { Box, Flex, Image } from "@chakra-ui/react";
import { useMemo } from "react";
import { Square } from "chess.js";
import css from "./preview.module.css";
import { PieceColor, SquareColor } from "../../../../../types";
import {
  getPosition,
  INITIAL_BOARD_POSITION,
  PIECE_COLOR_IMAGES,
} from "../../../../../utils";

type BoardPreviewProps = {
  piece: PieceColor;
  square: SquareColor;
};

export default function BoardPreview({ piece, square }: BoardPreviewProps) {
  const bgSrc = useMemo(
    () => `${import.meta.env.VITE_IMAGE_BOARD_URL}${square}/120.png`,
    [square]
  );

  return (
    <Flex className={css.preview}>
      <Box className={css.preview_content} bgImage={`url("${bgSrc}")`}>
        {Object.entries(INITIAL_BOARD_POSITION)
          .filter((p) => p[1] !== undefined)
          .map(([sq, p], idx) => {
            const { row, col } = getPosition(sq as Square);

            const left = 12.5 * col;
            const bottom = 12.5 * (7 - row);

            return (
              <Image
                key={idx}
                pos="absolute"
                w="12.5%"
                h="12.5%"
                left={`${left}%`}
                bottom={`${bottom}%`}
                src={PIECE_COLOR_IMAGES[piece][p]}
              />
            );
          })}
      </Box>
    </Flex>
  );
}
