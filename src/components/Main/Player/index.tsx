import { Box, Flex, Image, Text } from "@chakra-ui/react";
import css from "./player.module.css";
import { Color } from "chess.js";
import dayjs from "dayjs";
import { PlayerInfo } from "../../../types";
import { useChess } from "../../../contexts/ChessContext";
import CapturePieces from "./CapturePieces";
import { useSetting } from "../../../contexts/SettingContext";
import Clock from "./Clock";

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
        {mode === "AI" && <Clock color={color} date={dayjs().add(10, "minute").toDate()} />}
      </Box>
    </Box>
  );
}
