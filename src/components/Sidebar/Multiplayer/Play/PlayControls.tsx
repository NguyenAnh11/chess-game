import {
  Flex,
  Text,
  Tooltip,
  Icon,
  Box,
  Image,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import DefaultButton from "../../../Common/Button/Default";
import LiveButton from "../../../Common/Button/Live";
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
  const { isRequestGameDraw, isShowAcceptOrRejectGameDraw, onRequestGameDraw } =
    useRoom();
  const { onOpenEditSetting } = useSetting();
  const { moves, boardIndex, onStep, onResign: onGameOver } = useChess();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const onDraw = () => {
    onToggle();
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
      <Popover
        closeOnBlur={true}
        placement="top"
        isOpen={isOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Box mr="10px" gap="5px" color="#666564">
            <LiveButton
              label="draw-offer"
              onClick={onDraw}
              disabled={isRequestGameDraw || isShowAcceptOrRejectGameDraw}
            >
              <Icon as={HiOutlineFlag} fontSize="2xl" />
              <Text fontSize="sm" fontWeight="semibold">
                Draw
              </Text>
            </LiveButton>
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent mb="2">
            <PopoverBody
              bg="#fff"
              p="15px"
              fontSize="15px"
              cursor="auto"
              textAlign="center"
              width="260px"
              borderRadius="3px"
            >
              <Text mb="4" whiteSpace="break-spaces">
                Do you want to offer/clain a draw?
              </Text>
              <Flex align="center" justify="center">
                <Box mr="3">
                  <DefaultButton
                    label="No"
                    size="sm"
                    variant="basic"
                    onClick={() => onClose()}
                  >
                    <Text>No</Text>
                  </DefaultButton>
                </Box>
                <DefaultButton
                  label="Yes"
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    onRequestGameDraw();
                    onClose();
                  }}
                >
                  <Text>Yes</Text>
                </DefaultButton>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>

      <Box mr="10px" gap="5px" color="#666564">
        <LiveButton label="resign" onClick={onResign}>
          <Icon as={HiFlag} fontSize="2xl" />
          <Text fontSize="sm" fontWeight="semibold">
            Resign
          </Text>
        </LiveButton>
      </Box>

      <Flex flex="1" />

      <Tooltip label="Start">
        <Box mr="0.5" fontSize="2xl" color="#8b8987">
          <LiveButton label="Start" onClick={onStart}>
            <Icon as={BsChevronBarLeft} />
          </LiveButton>
        </Box>
      </Tooltip>

      <Box mr="0.5" fontSize="2xl" color="#8b8987">
        <Tooltip label="Back">
          <LiveButton label="Back" onClick={onBack}>
            <Icon as={BsChevronLeft} />
          </LiveButton>
        </Tooltip>
      </Box>

      <Box mr="0.5" fontSize="2xl" color="#8b8987">
        <Tooltip label="Forward">
          <LiveButton label="Forward" onClick={onForward}>
            <Icon as={BsChevronRight} />
          </LiveButton>
        </Tooltip>
      </Box>

      <Box mr="0.5" fontSize="2xl" color="#8b8987">
        <Tooltip label="Ending">
          <LiveButton label="Ending" onClick={onEnd}>
            <Icon as={BsChevronBarRight} />
          </LiveButton>
        </Tooltip>
      </Box>

      <Box fontSize="2xl" color="#8b8987">
        <Tooltip label="Setting">
          <LiveButton label="Setting" onClick={onSetting}>
            <Icon as={FiSettings} />
          </LiveButton>
        </Tooltip>
      </Box>
    </Flex>
  );
}
