import {
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  useDisclosure,
  Text,
  Portal,
  PopoverContent,
  PopoverBody,
  Flex,
  Tooltip,
  PopoverArrow,
} from "@chakra-ui/react";
import React from "react";
import { HiFlag, HiOutlineFlag } from "react-icons/hi";
import LiveButton from "../../../Common/Button/Live";
import DefaultButton from "../../../Common/Button/Default";
import { useRoom } from "../../../../contexts/RoomContext";
import { useChess } from "../../../../contexts/ChessContext";
import { useUser } from "../../../../contexts/UserContext";
import { useChat } from "../../../../contexts/ChatContext";
import { MESSAGES } from "../../../../utils";
import { useGame } from "../../../../contexts/GameContext";

type PlayStartedGameControlsProps = {};

export default function PlayStartedGameControls({}: PlayStartedGameControlsProps) {
  const { user } = useUser();
  const { isRequestGameDraw, isShowAcceptOrRejectGameDraw, onRequestGameDraw } =
    useRoom();
  const { onSend } = useChat();
  const { isGameStart } = useGame();
  const { onResign: onGameOver } = useChess();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const onResign = () => {
    onGameOver(user!.id);
  };

  const onDraw = () => {
    onToggle();
  };

  return (
    <React.Fragment>
      <Popover
        closeOnBlur={true}
        placement="top"
        isOpen={isOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Tooltip label="Draw" placement="top">
            <Box mr="10px" gap="5px" color="#666564">
              <LiveButton
                label="draw-offer"
                onClick={onDraw}
                disabled={
                  !isGameStart ||
                  isRequestGameDraw ||
                  isShowAcceptOrRejectGameDraw
                }
              >
                <Icon as={HiOutlineFlag} fontSize="xl" />
                <Text fontSize="sm" fontWeight="semibold">
                  Draw
                </Text>
              </LiveButton>
            </Box>
          </Tooltip>
        </PopoverTrigger>
        <Portal>
          <PopoverContent mb="2">
            <PopoverArrow />
            <PopoverBody
              bg="#fff"
              p="15px"
              fontSize="15px"
              cursor="auto"
              textAlign="center"
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
                    onSend(MESSAGES["OFFER_DRAW"]);
                  }}
                >
                  <Text>Yes</Text>
                </DefaultButton>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>

      <Tooltip label="Resign" placement="top">
        <Box mr="10px" gap="5px" color="#666564">
          <LiveButton label="resign" onClick={onResign} disabled={!isGameStart}>
            <Icon as={HiFlag} fontSize="2xl" />
            <Text fontSize="sm" fontWeight="semibold">
              Resign
            </Text>
          </LiveButton>
        </Box>
      </Tooltip>
    </React.Fragment>
  );
}
