import { Flex, Text, Tooltip } from "@chakra-ui/react";
import Button from "../../../Common/Button/Live";
import { HiOutlineFlag, HiFlag } from "react-icons/hi";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import Icon from "../../../Common/Icon";
import { useChess } from "../../../../contexts/ChessContext";

export default function LiveControls() {
  const { turn, moves, boardIndex, onStep, onGameOver } =
    useChess();

  const onDraw = () => {};

  const onResign = () => {
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

  return (
    <Flex
      pos="relative"
      px="4"
      align="center"
      height="10"
      gap="1px"
      bgColor="#f1f1f1"
    >
      <Button
        label="draw-offer"
        onClick={onDraw}
        customStyle={{ gap: "5px", marginRight: "10px", color: "#666564" }}
      >
        <Icon icon={HiOutlineFlag} style={{ fontSize: "24px" }} />
        <Text fontSize="sm" fontWeight="semibold">
          Draw
        </Text>
      </Button>

      <Button
        label="resign"
        onClick={onResign}
        customStyle={{ gap: "5px", marginRight: "10px", color: "#666564" }}
      >
        <Icon icon={HiFlag} style={{ fontSize: "24px" }} />
        <Text fontSize="sm" fontWeight="semibold">
          Resign
        </Text>
      </Button>

      <Flex flex="1" />

      <Tooltip label="Start">
        <Button
          label="Start"
          onClick={onStart}
          customStyle={{ fontSize: "24px", color: "#8b8987" }}
        >
          <Icon icon={BsChevronBarLeft} />
        </Button>
      </Tooltip>

      <Tooltip label="Back">
        <Button
          label="Back"
          onClick={onBack}
          customStyle={{ fontSize: "24px", color: "#8b8987" }}
        >
          <Icon icon={BsChevronLeft} />
        </Button>
      </Tooltip>

      <Tooltip label="Forward">
        <Button
          label="Forward"
          onClick={onForward}
          customStyle={{ fontSize: "24px", color: "#8b8987" }}
        >
          <Icon icon={BsChevronRight} />
        </Button>
      </Tooltip>

      <Tooltip label="Ending">
        <Button
          label="Ending"
          onClick={onEnd}
          customStyle={{ fontSize: "24px", color: "#8b8987" }}
        >
          <Icon icon={BsChevronBarRight} />
        </Button>
      </Tooltip>
    </Flex>
  );
}
