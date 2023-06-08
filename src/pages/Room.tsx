import { useRef, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { useParams } from "react-router-dom";
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
import { GameInfo } from "../types";
import { useSocket } from "../contexts/SocketContext";

export default function Room() {
  const { code } = useParams();
  const { socket } = useSocket();
  const boardRef = useRef<HTMLDivElement>(null);

  const [game, setGame] = useState<GameInfo>({
    code: code!,
    status: "Wait",
    members: []
  })

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

  }, [])

  useEffect(() => {

  }, [])

  return !isLoading ?  (
    <Layout bgColor="#312e2b">
      <SettingProvider mode="Multiplayer">
        <GameProvider game={game} onSetGame={setGame}>
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
  ) : <Loading/>;
}
