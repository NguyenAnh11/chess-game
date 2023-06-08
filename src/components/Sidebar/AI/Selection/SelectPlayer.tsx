import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { ColorOptions } from "../../../../types";
import { SelectPlayerProps } from "./SelectAsPlayer";

type PlayerProps<T extends ColorOptions> = SelectPlayerProps<T> & {
  icon: IconType;
  textColor: string;
  backgroundColor: string;
  style: React.CSSProperties;
};

export default function SelectPlayer<T extends ColorOptions>({
  value,
  isChoosedColor,
  icon,
  textColor,
  backgroundColor,
  style,
  onClick,
}: PlayerProps<T>) {
  return (
    <Flex
      style={style}
      pos="relative"
      w="10"
      h="10"
      justify="center"
      gap="20px"
      gridRow="1"
      color={textColor}
      bg={backgroundColor}
      borderRadius="3px"
      border={isChoosedColor ? "2px solid #7fa650" : ""}
      cursor="pointer"
      onClick={() => onClick(value)}
    >
      <Icon
        as={icon}
        display="inline-block"
        textAlign="center"
        lineHeight="1"
      />
    </Flex>
  );
}
