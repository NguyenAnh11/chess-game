import { Dispatch, SetStateAction } from "react";
import { Box } from "@chakra-ui/react";
import { GameColorOptions } from "../../../types";
import CreateGameTimer from "./Timer";
import CreateGamePlayers from "./Players";

export type CreateGameProps = {
  color: GameColorOptions;
  onSetColor: Dispatch<SetStateAction<GameColorOptions>>;
  duration: { text: string; value: number };
  onSetDuration: Dispatch<
    SetStateAction<{
      text: string;
      value: number;
    }>
  >;
};

export default function CreateGame(props: CreateGameProps) {
  return (
    <Box p="6">
      <CreateGameTimer {...props} />
      <CreateGamePlayers {...props} />
    </Box>
  );
}
