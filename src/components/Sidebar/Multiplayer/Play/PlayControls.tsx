import { Flex, Text, Tooltip, Icon, Box } from "@chakra-ui/react";
import Button from "../../../Common/Button/Live";
import { HiOutlineFlag, HiFlag } from "react-icons/hi";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useChess } from "../../../../contexts/ChessContext";
import { useUser } from "../../../../contexts/UserContext";
import { useSetting } from "../../../../contexts/SettingContext";
import { useRoom } from "../../../../contexts/RoomContext";

export default function LiveControls() {
  const { user } = useUser();
  const { onRequestGameDraw } = useRoom();
  const { onOpenEditSetting } = useSetting();
  const { moves, boardIndex, onStep, onResign: onGameOver } = useChess();

  const onDraw = () => {
    
  };

  const onResign = () => {
    onGameOver(user!.id);
  };

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
    if (boardIndex.step === 0) return;
    onStep(0);
  };

  const onEnd = () => {
    if (boardIndex.step === moves.length) return;
    onStep(moves.length);
  };

  const onSetting = () => {
    onOpenEditSetting(true);
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
      <Box mr="10px" gap="5px" color="#666564">
        <Button label="draw-offer" onClick={onDraw}>
          <Icon as={HiOutlineFlag} fontSize="2xl" />
          <Text fontSize="sm" fontWeight="semibold">
            Draw
          </Text>
        </Button>
      </Box>

      <Box mr="10px" gap="5px" color="#666564">
        <Button label="resign" onClick={onResign}>
          <Icon as={HiFlag} fontSize="2xl" />
          <Text fontSize="sm" fontWeight="semibold">
            Resign
          </Text>
        </Button>
      </Box>

      <Flex flex="1" />

      <Tooltip label="Start">
        <Box mr="0.5" fontSize="2xl" color="#8b8987">
          <Button label="Start" onClick={onStart}>
            <Icon as={BsChevronBarLeft} />
          </Button>
        </Box>
      </Tooltip>

      <Box mr="0.5" fontSize="2xl" color="#8b8987">
        <Tooltip label="Back">
          <Button label="Back" onClick={onBack}>
            <Icon as={BsChevronLeft} />
          </Button>
        </Tooltip>
      </Box>

      <Box mr="0.5" fontSize="2xl" color="#8b8987">
        <Tooltip label="Forward">
          <Button label="Forward" onClick={onForward}>
            <Icon as={BsChevronRight} />
          </Button>
        </Tooltip>
      </Box>

      <Box mr="0.5" fontSize="2xl" color="#8b8987">
        <Tooltip label="Ending">
          <Button label="Ending" onClick={onEnd}>
            <Icon as={BsChevronBarRight} />
          </Button>
        </Tooltip>
      </Box>

      <Box fontSize="2xl" color="#8b8987">
        <Tooltip label="Setting">
          <Button label="Setting" onClick={onSetting}>
            <Icon as={FiSettings} />
          </Button>
        </Tooltip>
      </Box>
    </Flex>
  );
}
