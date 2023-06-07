import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import { useUser } from "../../../../contexts/UserContext";
import { Color } from "chess.js";
import React, { ReactNode, useEffect, useState } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { TbChessKing, TbChessKingFilled } from "react-icons/tb";
import SelectPlayer from "./SelectPlayer";

export type SelectPlayerProps<T extends Color | "random"> = {
  color: T;
  value: number;
  isChoosedColor: boolean;
  onClick: (index: number) => void;
};

export default function SelectAsPlayer() {
  const { user, onSetUserColor } = useUser();

  const [index, setIndex] = useState<number>();

  const onChooseColor = (index: number) => {
    setIndex(index);

    let color: Color = index === 0 ? "w" : "b";
    if (index === 2) {
      const colors: Color[] = ["w", "b"];
      color = colors[Math.floor(Math.random() * colors.length)];
    }

    onSetUserColor(color);
  };

  const options: {
    [p in Color | "random"]: { value: number; color: p; component: ReactNode };
  } = {
    w: {
      value: 0,
      color: "w",
      component: (
        <SelectPlayer
          value={0}
          color="w"
          isChoosedColor={index === 0}
          onClick={onChooseColor}
          icon={TbChessKing}
          textColor="#262421"
          backgroundColor="#f1f1f1"
          style={{ fontSize: "40px" }}
        />
      ),
    },
    random: {
      value: 2,
      color: "random",
      component: (
        <SelectPlayer
          value={2}
          color="random"
          isChoosedColor={index === 2}
          onClick={onChooseColor}
          icon={BiQuestionMark}
          textColor="#fff"
          backgroundColor="linear-gradient(90deg,#f1f1f1 50%,#262421 0)"
          style={{ paddingTop: "5px", fontSize: "35px" }}
        />
      ),
    },
    b: {
      value: 1,
      color: "b",
      component: (
        <SelectPlayer
          value={1}
          color="b"
          isChoosedColor={index === 1}
          onClick={onChooseColor}
          icon={TbChessKingFilled}
          textColor="#fff"
          backgroundColor="#262421"
          style={{ fontSize: "40px" }}
        />
      ),
    },
  };

  useEffect(() => {
    const index = user!.color === "w" ? 0 : 1;
    setIndex(index);
  }, [])

  return (
    <Box h="100%" pos="relative" overflow="auto">
      <Flex direction="column" align="center">
        <Text
          fontSize="12px"
          fontWeight="semibold"
          textAlign="center"
          textTransform="uppercase"
        >
          I Play As
        </Text>
        <Grid gap="20px" justifyContent="center" m="13px">
          {Object.keys(options).map((color, index) => (
            <React.Fragment key={index}>
              {options[color as Color | "random"].component}
            </React.Fragment>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}
