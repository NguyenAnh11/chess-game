import { Flex, Icon } from "@chakra-ui/react";
import { TbChessKing } from "react-icons/tb";
import { PlayerProps } from "../SelectAsPlayer";

export default function SelectAsWhitePlayer({
  value,
  isChoosedColor,
  onClick,
}: PlayerProps<"w">) {
  return (
    <Flex
      pos="relative"
      w="10"
      h="10"
      gap="20px"
      gridRow="1"
      bg="#f1f1f1"
      border={isChoosedColor ? "2px solid #7fa650": ""}
      color="#262421"
      justify="center"
      fontSize="40px"
      borderRadius="3px"
      cursor="pointer"
      onClick={() => onClick(value)}
    >
      <Icon
        as={TbChessKing}
        display="inline-block"
        textAlign="center"
        lineHeight="1"
      />
    </Flex>
  );
}
