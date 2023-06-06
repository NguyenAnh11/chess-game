import { Flex, Icon } from "@chakra-ui/react";
import { TbChessKingFilled } from "react-icons/tb";
import { PlayerProps } from "../SelectAsPlayer";

export default function SelectAsBlackPlayer({
  value,
  isChoosedColor,
  onClick,
}: PlayerProps<"b">) {
  return (
    <Flex
      pos="relative"
      w="10"
      h="10"
      justify="center"
      gap="20px"
      gridRow="1"
      fontSize="40px"
      borderRadius="3px"
      border={isChoosedColor ? "2px solid #7fa650": ""}
      bg="#262421"
      color="#fff"
      cursor="pointer"
      onClick={() => onClick(value)}
    >
      <Icon
        as={TbChessKingFilled}
        display="inline-block"
        textAlign="center"
        lineHeight="1"
      />
    </Flex>
  );
}
