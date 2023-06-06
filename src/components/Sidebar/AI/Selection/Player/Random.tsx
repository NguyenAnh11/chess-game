import { Flex, Icon } from "@chakra-ui/react";
import { BiQuestionMark } from "react-icons/bi";
import { PlayerProps } from "../SelectAsPlayer";

export default function SelectAsRandomPlayer({
  value,
  isChoosedColor,
  onClick,
}: PlayerProps<"random">) {
  return (
    <Flex
      pos="relative"
      w="10"
      h="10"
      justify="center"
      gap="20px"
      gridRow="1"
      borderRadius="3px"
      fontSize="35px"
      pt="5px"
      color="#fff"
      border={isChoosedColor ? "2px solid #7fa650": ""}
      bg="linear-gradient(90deg,#f1f1f1 50%,#262421 0)"
      cursor="pointer"
      onClick={() => onClick(value)}
    >
      <Icon
        as={BiQuestionMark}
        display="inline-block"
        textAlign="center"
        lineHeight="1"
      />
    </Flex>
  );
}
