import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameProvider from "../contexts/GameContext";
import SettingProvider from "../contexts/SettingContext";
import ChessProvider from "../contexts/ChessContext";
import BoardPlayer from "../components/Main/Player";
import BoardMain from "../components/Main";
import GameSetting from "../components/Setting";
import BoardSidebar from "../components/Sidebar";
import Loading from "./Loading";
import Layout from "../layout";
import { useRoom } from "../contexts/RoomContext";

export default function Room() {
  const boardRef = useRef<HTMLDivElement>(null);

  const { isLoading, game, onSetGame } = useRoom();
  
  return !isLoading ? (
    <Layout bgColor="#312e2b">
      <SettingProvider mode="Multiplayer">
        <GameProvider game={game} onSetGame={onSetGame}>
          <ChessProvider boardRef={boardRef}>
            <Box flex="1">
              <DndProvider backend={HTML5Backend}>
                <BoardPlayer isOpponent={true} />
                <BoardMain ref={boardRef} />
                <GameSetting />
                <BoardPlayer isOpponent={false} />
              </DndProvider>
            </Box>
            <Box flex="1">
              <BoardSidebar />
            </Box>
          </ChessProvider>
        </GameProvider>
      </SettingProvider>
    </Layout>
  ) : (
    <Loading />
  );
}
