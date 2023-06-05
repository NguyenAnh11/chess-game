import { Box } from "@chakra-ui/react";
import { cloneDeep } from "lodash";
import { useRef, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardMain from "../components/Main";
import BoardPlayer from "../components/Main/Player";
import GameSetting from "../components/Setting";
import BoardSidebar from "../components/Sidebar";
import ChessProvider from "../contexts/ChessContext";
import GameProvider, { GameContextProps } from "../contexts/GameContext";
import SettingProvider from "../contexts/SettingContext";
import { useUser } from "../contexts/UserContext";
import { GameInfo, GameStatus, UserInfo } from "../types";

export default function OfflineGame() {
  const boardRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  const [game, setGame] = useState<GameInfo>({
    code: uuidv4(),
    status: "Ready",
    members: [
      user!,
      {
        id: uuidv4(),
        name: "AI",
        avatar: `${import.meta.env.VITE_AVATAR}/AI`,
        color: user!.color === "w" ? "b" : "w",
        isLoser: false,
      },
    ],
  });

  const onSetGameStatus = (status: GameStatus) => {
    setGame((prev) => ({ ...prev, status }));
  };

  const onSetPlayerAsLoser = (playerId: string) => {
    const cloneGame = cloneDeep(game);

    cloneGame.status = "End";

    cloneGame.members = game.members.reduce(
      (prev: UserInfo[], curr: UserInfo) => {
        if (curr.id === playerId) curr.isLoser = true;
        return [...prev, curr];
      },
      []
    );

    setGame(cloneGame);
  };

  const isGameOver = useMemo(() => game.status === "End", [game.status]);

  const isGameDraw = useMemo(() => game.status === "Draw", [game.status]);

  const isGameStart = useMemo(() => game.status === "Ready", [game.status]);

  const gameContextProps: GameContextProps = {
    game,
    isGameDraw,
    isGameOver,
    isGameStart,
    onSetGameStatus,
    onSetPlayerAsLoser,
  };

  return (
    <GameProvider {...gameContextProps}>
      <SettingProvider mode="Multiplayer">
        <ChessProvider boardRef={boardRef} orientation={user!.color}>
          <Box flex="1">
            <DndProvider backend={HTML5Backend}>
              <BoardPlayer color={user!.color === "w" ? "b" : "w"} />
              <BoardMain ref={boardRef} />
              <GameSetting />
              <BoardPlayer color={user!.color} />
            </DndProvider>
          </Box>
          <Box flex="1">
            <BoardSidebar />
          </Box>
        </ChessProvider>
      </SettingProvider>
    </GameProvider>
  );
}
