import { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Color } from "chess.js";
import { UserInfo } from "../../../types";
import { useSetting } from "../../../contexts/SettingContext";
import { useChess } from "../../../contexts/ChessContext";
import { useGame } from "../../../contexts/GameContext";
import CapturePieces from "./CapturePieces";
import Clock from "./Clock";
import css from "./player.module.css";

type BoardPlayerProp = {
  color: Color;
};

export default function BoardPlayer({ color }: BoardPlayerProp) {
  const { game } = useGame();
  const { mode } = useSetting();
  const { duration, capturePieces, capturePiecesScore } = useChess();

  const [user, setUser] = useState<UserInfo | undefined>();

  const captureColor = color === "w" ? "b" : "w";

  const score = capturePiecesScore[color] - capturePiecesScore[captureColor];

  useEffect(() => {
    if (game) {
      const user = game.members.find((p) => p.color === color);
      setUser(user);
    }
  }, [game]);

  return (
    <Box className={css.board_player}>
      <Box className={css.player_row}>
        <Box display="block">
          <Flex color="#fff" h="full">
            <Image
              w="40px"
              h="40px"
              className={css.player_row_avatar}
              src={user ? user.avatar : import.meta.env.VITE_DEFAULT_AVATAR}
            />
            <div>
              <Box color="#fff" className={css.player_row_name}>
                <Text lineHeight="short" fontWeight="semibold" fontSize="sm">
                  {user ? user.name : "Opponent"}
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
        {mode !== "AI" && <Clock color={color} duration={duration} />}
      </Box>
    </Box>
  );
}
