import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import { useUser } from "../../../../contexts/UserContext";
import { Color } from "chess.js";
import React, { ReactNode, useState } from "react";
import White from "./Player/White";
import SelectAsBlackPlayer from "./Player/Black";
import SelectAsRandomPlayer from "./Player/Random";

type Players = Color | "random";

export type PlayerProps<T extends Players> = {
  color: T;
  value: number;
  isChoosedColor: boolean;
  onClick: (index: number) => void;
};

export default function SelectAsPlayer() {
  const { onSetColor } = useUser();

  const [index, setIndex] = useState<number>(0);

  const onChooseColor = (index: number) => {
    setIndex(index);

    let color: Color = index === 0 ? "w" : "b";
    if (index === 2) {
      const colors: Color[] = ["w", "b"];
      color = colors[Math.floor(Math.random() * colors.length)];
    }

    onSetColor(color);
  };

  const options: {
    [p in Players]: { value: number; color: p; component: ReactNode };
  } = {
    w: {
      value: 0,
      color: "w",
      component: (
        <White
          value={0}
          color="w"
          isChoosedColor={index === 0}
          onClick={onChooseColor}
        />
      ),
    },
    b: {
      value: 1,
      color: "b",
      component: (
        <SelectAsBlackPlayer
          value={1}
          color="b"
          isChoosedColor={index === 1}
          onClick={onChooseColor}
        />
      ),
    },
    random: {
      value: 2,
      color: "random",
      component: (
        <SelectAsRandomPlayer
          value={2}
          color="random"
          isChoosedColor={index === 2}
          onClick={onChooseColor}
        />
      ),
    },
  };

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
              {options[color as Players].component}
            </React.Fragment>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}
