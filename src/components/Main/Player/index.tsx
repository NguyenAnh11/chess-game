import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Color } from "chess.js";
import { PlayerInfo } from "../../../types";
import { useSetting } from "../../../contexts/SettingContext";
import { useChess } from "../../../contexts/ChessContext";
import CapturePieces from "./CapturePieces";
import Clock from "./Clock";
import css from "./player.module.css";

type BoardPlayerProp = {
  color: Color;
  info: PlayerInfo;
};

export default function BoardPlayer({ color, info }: BoardPlayerProp) {
  const { mode } = useSetting();
  const { capturePieces, capturePiecesScore } = useChess();

  const captureColor = color === "w" ? "b" : "w";

  const score = capturePiecesScore[color] - capturePiecesScore[captureColor];

  return (
    <Box className={css.board_player}>
      <Box className={css.player_row}>
        <Box display="block">
          <Flex color="#fff" h="full">
            <Image
              w="40px"
              h="40px"
              className={css.player_row_avatar}
              src={info.avatar}
            />
            <div>
              <Box color="#fff" className={css.player_row_name}>
                <Text lineHeight="short" fontWeight="semibold" fontSize="sm">
                  {info.name}
                </Text>
              </Box>
              <CapturePieces
                color={captureColor}
                score={score}
                pieces={capturePieces[captureColor]}
              />
            </div>
          </Flex>
        </Box>
        {mode === "AI" && <Clock color={color} date={Date.now() + 3 * 60000} />}
      </Box>
    </Box>
  );
}
