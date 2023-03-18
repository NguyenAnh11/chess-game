import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ChessProvider from "./contexts/ChessContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Setting } from "./types";
import BoardSidebar from "./components/Board.Sidebar";
import BoardMain from "./components/Board.Main";

const App = () => {
  const [setting, setSetting] = useState<Setting>({
    squareColor: "green",
    coordinate: "inside",
    moveMethod: "dc",
    enablePremove: false,
    showHintMove: true,
    showHighlightMove: true,
  });

  return (
    <React.Fragment>
      <Flex h="100vh" align="center" justify="center" userSelect="none">
        <Flex position="relative" h="min-content">
          <ChessProvider orientation="w" {...setting}>
            <Box flex="1">
              <DndProvider backend={HTML5Backend}>
                <BoardMain />
              </DndProvider>
            </Box>
            <Box flex="1">
              <BoardSidebar />
            </Box>
          </ChessProvider>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default App;
