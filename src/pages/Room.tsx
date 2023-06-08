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
import { GameInfo, UserInfo } from "../types";
import { useSocket } from "../contexts/SocketContext";
import { useUser } from "../contexts/UserContext";

export default function Room() {
  const { code } = useParams();
  const { ws } = useSocket();
  const { user } = useUser();
  const boardRef = useRef<HTMLDivElement>(null);

  const [game, setGame] = useState<GameInfo>({
    code: code!,
    status: "Wait",
    members: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ws.emit("join_room", { code, user });
  }, []);

  useEffect(() => {
    ws.on("get_members", ({ members }: { members: UserInfo[] }) => {
      setGame((prev) => ({
        ...prev,
        members,
      }));
    });

    ws.on("game_ready", () => {
      setGame((prev) => ({
        ...prev,
        status: "Ready"
      }))
    })

    return () => {
      ws.off("get_members");
      ws.off("game_ready");
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
