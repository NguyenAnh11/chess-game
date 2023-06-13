import { Flex, Text, Tooltip, Icon, Box, Image } from "@chakra-ui/react";
import LiveButton from "../../../Common/Button/Live";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { IoReload } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";
import { useSetting } from "../../../../contexts/SettingContext";
import { useRoom } from "../../../../contexts/RoomContext";
import { useGame } from "../../../../contexts/GameContext";
import PlayStartedGameControls from "./PlayStartedGameControls";
import PlayEndGameControls from "./PlayEndGameControls";

export default function LiveControls() {
  const { isRequestGameDraw } = useRoom();
  const { onOpenEditSetting } = useSetting();
  const { isGameEnd } = useGame();
  const { moves, boardIndex, setBoardIndex, onStep } = useChess();

  const onBack = () => {
    if (boardIndex.step > 0) {
      onStep(boardIndex.step - 1);
    }
  };

  const onForward = () => {
    if (boardIndex.step < moves.length) {
      onStep(boardIndex.step + 1);
    }
  };

  const onStart = () => {
    if (boardIndex.step !== 0) {
      onStep(0);
    }
  };

  const onEnd = () => {
    if (boardIndex.step !== moves.length) {
      onStep(moves.length);
    }
  };

  const onSetting = () => {
    onOpenEditSetting(true);
  };

  const onReload = () => {
    if (boardIndex.step !== moves.length) {
      setBoardIndex((prev) => ({ ...prev, step: moves.length }));
    }
  };

  return (
    <Flex
      pos="relative"
      px="4"
      align="center"
      height="10"
      gap="1px"
      bgColor="#f1f1f1"
    >
      {isRequestGameDraw && (
        <Flex
          pos="absolute"
          p="4"
          fontSize="3"
          justify="space-between"
          right="0"
          left="0"
          bottom="100%"
        >
          <Flex direction="column" gap="2px">
            <Text color="#666564" fontWeight="semibold" fontSize="sm">
              Draw Offered
            </Text>
            <Text color="#8b8987" fontSize="sm">
              Waiting for opponent's response
            </Text>
          </Flex>
          <Image
            alt="Spinner"
            h="20px"
            w="20px"
            alignSelf="center"
            ml="4"
            src={import.meta.env.VITE_SPINNER_URL}
          />
        </Flex>
      )}

      {!isGameEnd ? <PlayStartedGameControls /> : <PlayEndGameControls />}

      <Flex flex="1" />

      <Tooltip label="Start" placement="top">
        <Box mr="0.5" fontSize="xl" color="#8b8987">
          <LiveButton label="Start" onClick={onStart}>
            <Icon as={BsChevronBarLeft} />
          </LiveButton>
        </Box>
      </Tooltip>

      <Tooltip label="Back" placement="top">
        <Box mr="0.5" fontSize="xl" color="#8b8987">
          <LiveButton label="Back" onClick={onBack}>
            <Icon as={BsChevronLeft} />
          </LiveButton>
        </Box>
      </Tooltip>

      <Tooltip label="Forward" placement="top">
        <Box mr="0.5" fontSize="xl" color="#8b8987">
          <LiveButton label="Forward" onClick={onForward}>
            <Icon as={BsChevronRight} />
          </LiveButton>
        </Box>
      </Tooltip>

      <Tooltip label="Ending" placement="top">
        <Box mr="0.5" fontSize="xl" color="#8b8987">
          <LiveButton label="Ending" onClick={onEnd}>
            <Icon as={BsChevronBarRight} />
          </LiveButton>
        </Box>
      </Tooltip>

      {isGameEnd && (
        <Tooltip label="Reload" placement="top">
          <Box mr="1" fontSize="xl" color="#8b8987">
            <LiveButton label="Reload" onClick={onReload}>
              <Icon as={IoReload} />
            </LiveButton>
          </Box>
        </Tooltip>
      )}

      <Tooltip label="Setting" placement="top">
        <Box fontSize="xl" color="#8b8987">
          <LiveButton label="Setting" onClick={onSetting}>
            <Icon as={FiSettings} />
          </LiveButton>
        </Box>
      </Tooltip>
    </Flex>
  );
}
