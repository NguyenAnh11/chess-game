import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useSetting } from "../../../contexts/SettingContext";
import { useChess } from "../../../contexts/ChessContext";
import { useGame } from "../../../contexts/GameContext";
import { useUser } from "../../../contexts/UserContext";
import CapturePieces from "./CapturePieces";
import Clock from "./Clock";
import css from "./player.module.css";

type BoardPlayerProp = {
  isOpponent: boolean;
};

export default function BoardPlayer({ isOpponent }: BoardPlayerProp) {
  const { user } = useUser();
  const { game } = useGame();
  const { mode } = useSetting();
  const { capturePieces, capturePiecesScore } = useChess();

  const color = !isOpponent ? user!.color : user!.color === "w" ? "b" : "w";

  const player = !isOpponent ? user : game.members.find(p => p.id !== user!.id)

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
              src={player ? player.avatar : import.meta.env.VITE_DEFAULT_AVATAR}
            />
            <div>
              <Box color="#fff" className={css.player_row_name}>
                <Text lineHeight="short" fontWeight="semibold" fontSize="sm">
                  {player ? player.name : "Opponent"}
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
        {/* {mode !== "AI" && <Clock color={color} duration={game.duration!} />} */}
      </Box>
    </Box>
  );
}
