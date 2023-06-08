import { BackgroundProps, BorderProps, Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { GameColorOptions } from "../../../types";

type CreateGamePlayerProps<T extends GameColorOptions> = {
  value: T;
  label: string;
  icon: IconType;
  isChoosed: boolean;
  onClick: (value: T) => void;
};

export default function CreateGamePlayer<T extends GameColorOptions>({
  value,
  label,
  icon,
  isChoosed,
  onClick,
}: CreateGamePlayerProps<T>) {
  
  const bgColor: BackgroundProps["backgroundColor"] =
    value === "w" ? "#fff" : value === "b" ? "#262421" : "transparent";

  const border: BorderProps["border"] = isChoosed
    ? "2px solid #7fa650"
    : value === "w"
    ? "1px solid #dad8d6"
    : "none";

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
      border={border}
      borderRadius="5px"
      backgroundColor={bgColor}
      onClick={() => onClick(value)}
    >
      <Icon as={icon} fontSize="3xl" />
    </Flex>
  );
}
