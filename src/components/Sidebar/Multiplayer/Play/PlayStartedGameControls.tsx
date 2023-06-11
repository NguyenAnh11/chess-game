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
  PopoverArrow,
} from "@chakra-ui/react";
import React from "react";
import { HiFlag, HiOutlineFlag } from "react-icons/hi";
import { useRoom } from "../../../../contexts/RoomContext";
import LiveButton from "../../../Common/Button/Live";
import DefaultButton from "../../../Common/Button/Default";
import { useChess } from "../../../../contexts/ChessContext";
import { useUser } from "../../../../contexts/UserContext";
import { useChat } from "../../../../contexts/ChatContext";
import { MESSAGES } from "../../../../utils";

type PlayStartedGameControlsProps = {};

export default function PlayStartedGameControls({}: PlayStartedGameControlsProps) {
  const { user } = useUser();
  const { isRequestGameDraw, isShowAcceptOrRejectGameDraw, onRequestGameDraw } =
    useRoom();
  const { onSend } = useChat();
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

      <Box mr="10px" gap="5px" color="#666564">
        <LiveButton label="resign" onClick={onResign}>
          <Icon as={HiFlag} fontSize="2xl" />
          <Text fontSize="sm" fontWeight="semibold">
            Resign
          </Text>
        </LiveButton>
      </Box>
    </React.Fragment>
  );
}
