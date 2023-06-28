import { BackgroundProps, BorderProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { GameColorOptions } from "../../../types";

type CreateGamePlayerProps<T extends GameColorOptions> = {
  value: T;
  label: string;
  isChoosed: boolean;
  onClick: (value: T) => void;
  children: ReactNode;
};

export default function CreateGamePlayer<T extends GameColorOptions>({
  value,
  label,
  isChoosed,
  onClick,
  children
}: CreateGamePlayerProps<T>) {
  const bgColor: BackgroundProps["backgroundColor"] =
    value === "w" ? "#fff" : "transparent";

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
      bgImage={
        value === "random"
          ? "linear-gradient(90deg,#fff 50%,#262421 0)"
          : undefined
      }
      onClick={() => onClick(value)}
    >
      {children}
    </Flex>
  );
}
