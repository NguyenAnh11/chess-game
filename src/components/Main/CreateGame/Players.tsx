import { Flex, Text, Icon } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { CreateGameProps } from ".";
import { ColorOptions } from "../../../types";
import CreateGamePlayer from "./Player";
import { BiQuestionMark } from "react-icons/bi";
import { TbChessKing, TbChessKingFilled } from "react-icons/tb";

type CreateGamePlayersProps = CreateGameProps;

export default function CreateGamePlayers({
  game,
  onSetGame,
}: CreateGamePlayersProps) {
  const onChooseColor = (color: ColorOptions) => {
    onSetGame((prev) => ({ ...prev, color }));
  };

  const options: { [p in ColorOptions]: { component: ReactNode } } = {
    w: {
      component: (
        <CreateGamePlayer
          label="White"
          value="w"
          icon={TbChessKing}
          isChoosed={game.color === "w"}
          onClick={onChooseColor}
        />
      ),
    },
    random: {
      component: (
        <CreateGamePlayer
          label="Random"
          value="random"
          icon={BiQuestionMark}
          isChoosed={game.color === "random"}
          onClick={onChooseColor}
        />
      ),
    },
    b: {
      component: (
        <CreateGamePlayer
          label="Black"
          value="b"
          icon={TbChessKingFilled}
          isChoosed={game.color === "b"}
          onClick={onChooseColor}
        />
      ),
    },
  };

  return (
    <Flex mb="4" align="center" gap="12px">
      <Text flex="1" color="#4b4847" fontSize="17px" fontWeight="600">
        I play as
      </Text>
      {Object.keys(options).map((color, index) => (
        <React.Fragment key={index}>
          {options[color as ColorOptions].component}
        </React.Fragment>
      ))}
    </Flex>
  );
}
