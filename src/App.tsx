import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import SettingProvider from "./contexts/SettingContext";
import ChessProvider from "./contexts/ChessContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSidebar from "./components/Sidebar";
import BoardMain from "./components/Main";
import GameSetting from "./components/Setting/";
import "./index.css";

const App = () => {
  return (
    <React.Fragment>
      <Flex
        h="100vh"
        bg="black"
        align="center"
        justify="center"
        userSelect="none"
      >
        <Flex position="relative" h="min-content">
          <SettingProvider mode="Multiplayer">
            <ChessProvider orientation="w">
              <Box flex="1">
                <DndProvider backend={HTML5Backend}>
                  <BoardMain />
                  <GameSetting />
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
