import { useRef, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { useNavigate, useParams } from "react-router-dom";
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
import { SOCKET_EVENTS } from "../services/Socket";

export default function Room() {
  const navigate = useNavigate();
  const { code } = useParams();
  const { ws } = useSocket();
  const boardRef = useRef<HTMLDivElement>(null);

  const [game, setGame] = useState<GameInfo>({
    code: code!,
    status: "Wait",
    members: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ws.emit(SOCKET_EVENTS.REQ_GAME_INFO, { code });

    ws.on(SOCKET_EVENTS.RES_GAME_INFO, (data) => {
      if (!data.success) {
        navigate("/online");
      }

      setGame((prev) => ({
        ...prev,
        ...data.info,
      }));

      setIsLoading(false);
    });

    return () => {
      ws.off(SOCKET_EVENTS.RES_GAME_INFO);
    };
  }, []);

  return !isLoading ? (
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
  ) : (
    <Loading />
  );
}
