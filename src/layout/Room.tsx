import { useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { cloneDeep } from "lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GameInfo, GameStatus, UserInfo } from "../types";
import GameProvider, { GameContextProps } from "../contexts/GameContext";
import SettingProvider from "../contexts/SettingContext";
import ChessProvider from "../contexts/ChessContext";
import { useUser } from "../contexts/UserContext";
import BoardPlayer from "../components/Main/Player";
import BoardMain from "../components/Main";
import GameSetting from "../components/Setting";
import BoardSidebar from "../components/Sidebar";

export default function Room() {
  const boardRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  const [game, setGame] = useState<GameInfo>({
    code: "",
    status: "Ready",
    members: [],
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

  const gameContextProps: GameContextProps = {
    game,
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
