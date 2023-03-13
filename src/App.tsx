import React, { useRef, useState } from "react";
import BoardMain from "./components/BoardMain";
import { Flex, Box, Container } from "@chakra-ui/react";
import ChessProvider from "./contexts/ChessContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Setting } from "./types";
import BoardSidebar from "./components/BoardSidebar";

const App = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [setting, setSetting] = useState<Setting>({
    squareColor: "green",
    coordinate: "inside",
    moveMethod: "dc",
    enablePremove: false,
    showLegalMove: true,
    showHighlightMove: true,
  });

  return (
    <React.Fragment>
      <Container w="100%" h="100%" userSelect="none">
        <Box w="min-content" margin="0 auto" position="relative">
          <ChessProvider width={640} orientation="w" {...setting}>
            <Flex direction="column">
              <Box my="2">
                <DndProvider backend={HTML5Backend}>
                  <BoardMain ref={ref} />
                </DndProvider>
                <BoardSidebar/>
              </Box>
            </Flex>
          </ChessProvider>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default App;
