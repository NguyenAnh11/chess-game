import {
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  Text,
  Portal,
  PopoverContent,
  PopoverBody,
  Flex,
  PopoverArrow,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiFlag, HiOutlineFlag } from "react-icons/hi";
import LiveButton from "../../../Common/Button/Live";
import DefaultButton from "../../../Common/Button/Default";
import { useRoom } from "../../../../contexts/RoomContext";
import { useChess } from "../../../../contexts/ChessContext";
import { useChat } from "../../../../contexts/ChatContext";
import { MESSAGES } from "../../../../utils";
import { useGame } from "../../../../contexts/GameContext";
import { useSetting } from "../../../../contexts/SettingContext";

type PlayStartedGameControlsProps = {};

export default function PlayStartedGameControls({}: PlayStartedGameControlsProps) {
  const { setting } = useSetting();
  const { isRequestGameDraw, isShowAcceptOrRejectGameDraw, onRequestGameDraw } =
    useRoom();
  const { onSend } = useChat();
  const { isGameStart } = useGame();
  const { onResign } = useChess();
  const [isOpenPopoverDraw, setIsOpenPopoverDraw] = useState(false);
  const [isOpenPopoverResign, setIsOpenPopoverResign] = useState(false);

  const onClosePopoverDraw = () => {
    setIsOpenPopoverDraw(false);
  };

  const onDraw = () => {
    setIsOpenPopoverDraw(!isOpenPopoverDraw);
  };

  return (
    <React.Fragment>
      {setting.play.confirmResignDraw === 1 ? (
        <Popover
          closeOnBlur={true}
          placement="top"
          isOpen={isOpenPopoverDraw}
          onClose={onClosePopoverDraw}
        >
          <PopoverTrigger>
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
          </PopoverTrigger>
          <Portal>
            <PopoverContent mb="2.5">
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
                      onClick={onClosePopoverDraw}
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
                      onClosePopoverDraw();
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
      ) : (
        <Box mr="10px" gap="5px" color="#666564">
          <LiveButton
            label="draw-offer"
            onClick={onDraw}
            disabled={
              !isGameStart || isRequestGameDraw || isShowAcceptOrRejectGameDraw
            }
          >
            <Icon as={HiOutlineFlag} fontSize="xl" />
            <Text fontSize="sm" fontWeight="semibold">
              Draw
            </Text>
          </LiveButton>
        </Box>
      )}

      <Box mr="10px" gap="5px" color="#666564">
        <LiveButton label="resign" onClick={onResign} disabled={!isGameStart}>
          <Icon as={HiFlag} fontSize="xl" />
          <Text fontSize="sm" fontWeight="semibold">
            Resign
          </Text>
        </LiveButton>
      </Box>
    </React.Fragment>
  );
}
