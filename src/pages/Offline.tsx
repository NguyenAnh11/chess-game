import { Box } from "@chakra-ui/react";
import { useRef } from "react";
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
import { UserInfo } from "../types";
import Layout from "../layout";

export default function Offline() {
  const boardRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  const members: UserInfo[] = [
    user!,
    {
      id: uuidv4(),
      name: "AI",
      avatar: `${import.meta.env.VITE_AVATAR}/AI`,
      color: user!.color === "w" ? "b" : "w",
      countryFlag: import.meta.env.VITE_COUNTRY_FLAG_VIETNAM,
      isLoser: false,
    },
  ];

  return (
    <Layout bgColor="#312e2b">
      <SettingProvider mode="AI">
        <GameProvider code={uuidv4()} members={members}>
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
  );
}
