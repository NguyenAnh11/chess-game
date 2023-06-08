import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { ColorOptions } from "../../../types";

type CreateGamePlayerProps<T extends ColorOptions> = {
  value: T;
  label: string;
  icon: IconType;
  isChoosed: boolean;
  onClick: (value: T) => void;
};

export default function CreateGamePlayer<T extends ColorOptions>({
  value,
  label,
  icon,
  isChoosed,
  onClick,
}: CreateGamePlayerProps<T>) {
  return (
    <Flex
      aria-label={label}
      p="0"
      m="0"
      w="12"
      h="12"
      pos="relative"
      align="center"
      justify="center"
      cursor="pointer"
      borderRadius="5px"
      backgroundColor="transparent"
      border={isChoosed ? "2px solid #7fa650" : "none"}
      onClick={() => onClick(value)}
    >
      <Icon as={icon} fontSize="3xl" />
    </Flex>
  );
}
