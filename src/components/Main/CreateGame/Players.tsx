import { Flex, Text } from "@chakra-ui/react";
import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { TbChessKing, TbChessKingFilled } from "react-icons/tb";
import { GameColorOptions } from "../../../types";
import CreateGamePlayer from "./Player";

type CreateGamePlayersProps = {
  color: GameColorOptions;
  onSetColor: Dispatch<SetStateAction<GameColorOptions>>;
};

export default function CreateGamePlayers({
  color,
  onSetColor,
}: CreateGamePlayersProps) {
  const options: { [p in GameColorOptions]: { component: ReactNode } } = {
    w: {
      component: (
        <CreateGamePlayer
          label="white"
          value="w"
          icon={TbChessKing}
          isChoosed={color === "w"}
          onClick={() => onSetColor("w")}
        />
      ),
    },
    random: {
      component: (
        <CreateGamePlayer
          label="random"
          value="random"
          icon={BiQuestionMark}
          isChoosed={color === "random"}
          onClick={() => onSetColor("random")}
        />
      ),
    },
    b: {
      component: (
        <CreateGamePlayer
          label="black"
          value="b"
          icon={TbChessKingFilled}
          isChoosed={color === "b"}
          onClick={() => onSetColor("b")}
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
          {options[color as GameColorOptions].component}
        </React.Fragment>
      ))}
    </Flex>
  );
}
