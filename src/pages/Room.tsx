import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameProvider from "../contexts/GameContext";
import SettingProvider from "../contexts/SettingContext";
import ChessProvider from "../contexts/ChessContext";
import { useUser } from "../contexts/UserContext";
import BoardPlayer from "../components/Main/Player";
import BoardMain from "../components/Main";
import GameSetting from "../components/Setting";
import BoardSidebar from "../components/Sidebar";
import Layout from "../layout";

export default function Room() {
  const boardRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  return (
    <Layout bgColor="#312e2b">
      <SettingProvider mode="Multiplayer">
        <GameProvider>
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
        </GameProvider>
      </SettingProvider>
    </Layout>
  );
}
