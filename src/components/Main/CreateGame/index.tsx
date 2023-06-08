import { Dispatch, SetStateAction } from "react";
import { Box } from "@chakra-ui/react";
import { CreateGameModel } from "../../../types";
import CreateGameTimer from "./Timer";
import CreateGamePlayers from "./Players";

export type CreateGameProps = {
  game: CreateGameModel;
  onSetGame: Dispatch<SetStateAction<CreateGameModel>>;
};

export default function CreateGame(props: CreateGameProps) {
  return (
    <Box p="6">
      <CreateGameTimer {...props}/>
      <CreateGamePlayers {...props}/>
    </Box>
  );
}
