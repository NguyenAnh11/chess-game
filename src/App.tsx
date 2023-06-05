import React from "react";
import { Flex } from "@chakra-ui/react";
import "./index.css";
import OfflineGame from "./layout/OfflineGame";

const App = () => {
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
          <OfflineGame/>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default App;
