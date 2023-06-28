import { Flex } from "@chakra-ui/react";
import ChatList from "./Chat/ChatList";
import LiveControls from "./PlayControls";
import MoveContainer from "./PlayMoves";
import PlayNewGame from "./PlayNewGame";
import AcceptDraw from "./AcceptDraw";
import { useRoom } from "../../../../contexts/RoomContext";
import { useGame } from "../../../../contexts/GameContext";

export default function PlayPanel() {
  const { isShowAcceptOrRejectGameDraw } = useRoom();
  const { isGameOver, isGameDraw } = useGame();

  return (
    <Flex flexGrow="1" flexShrink="1" flexBasis="0" direction="column" minH="0">
      {!isShowAcceptOrRejectGameDraw ? <MoveContainer /> : <AcceptDraw />}
      {(isGameOver || isGameDraw) && <PlayNewGame />}
      <LiveControls />
      <ChatList />
    </Flex>
  );
}
