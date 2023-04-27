import React, { useRef } from "react";
import { Flex, Box } from "@chakra-ui/react";
import SettingProvider from "./contexts/SettingContext";
import ChessProvider from "./contexts/ChessContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSidebar from "./components/Sidebar";
import BoardMain from "./components/Main";
import GameSetting from "./components/Setting/";
import BoardPlayer from "./components/Main/Player";
import { PlayerInfo } from "./types";
import "./index.css";

const App = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  const players = useRef<PlayerInfo[]>([
    {
      id: "1",
      name: "AI",
      avatar:
        "https://images.chesscomfiles.com/uploads/v1/user/245425421.309e579e.200x200o.39adf462b98e.png",
    },
    {
      id: "2",
      name: "Anh",
      avatar:
        "https://images.chesscomfiles.com/uploads/v1/user/71619756.cd8be4a4.50x50o.539eb11f041e.png",
    },
  ]);

  return (
    <React.Fragment>
      <Flex
        h="100vh"
        bgColor="#312e2b"
        align="center"
        justify="center"
        userSelect="none"
      >
        <Flex position="relative" h="min-content">
          <SettingProvider mode="AI">
            <ChessProvider boardRef={boardRef} orientation="w">
              <Box flex="1">
                <DndProvider backend={HTML5Backend}>
                  <BoardPlayer color="b" info={players.current[0]} />
                  <BoardMain ref={boardRef} />
                  <GameSetting />
                  <BoardPlayer color="w" info={players.current[1]} />
                </DndProvider>
              </Box>
              <Box flex="1">
                <BoardSidebar />
              </Box>
            </ChessProvider>
          </SettingProvider>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default App;
