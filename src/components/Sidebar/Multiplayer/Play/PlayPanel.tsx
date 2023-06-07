import { Flex } from "@chakra-ui/react";
import { useGame } from "../../../../contexts/GameContext";
import ChatList from "./Chat/ChatList";
import LiveControls from "./PlayControls";
import MoveContainer from "./PlayMoves";
import PlayNewGame from "./PlayNewGame";

export default function PlayPanel() {
  const { isGameOver } = useGame();

  return (
    <Flex flexGrow="1" flexShrink="1" flexBasis="0" direction="column" minH="0">
      <MoveContainer />
      {isGameOver && <PlayNewGame />}
      <LiveControls />
      <ChatList />
    </Flex>
  );
}
