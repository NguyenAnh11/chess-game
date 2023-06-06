import { Flex } from "@chakra-ui/react";
import ChatList from "./Chat/ChatList";
import LiveControls from "./PlayControls";
import MoveContainer from "./PlayMoves";
import PlayNewGame from "./PlayNewGame";

export default function PlayPanel() {
  return (
    <Flex flexGrow="1" flexShrink="1" flexBasis="0" direction="column" minH="0">
      <MoveContainer />
      <PlayNewGame/>
      <LiveControls />
      <ChatList />
    </Flex>
  );
}
