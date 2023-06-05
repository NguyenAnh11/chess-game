import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardMain from "../components/Main";
import BoardPlayer from "../components/Main/Player";
import GameSetting from "../components/Setting";
import BoardSidebar from "../components/Sidebar";
import ChessProvider from "../contexts/ChessContext";
import GameProvider from "../contexts/GameContext";
import SettingProvider from "../contexts/SettingContext";
import { useUser } from "../contexts/UserContext";
import { GameInfo, GameStatus } from "../types";

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

  console.log(game);

  return (
    <GameProvider game={game} onSetGameStatus={onSetGameStatus}>
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
