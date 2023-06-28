import React from "react";
import { useGame } from "../../../contexts/GameContext";
import GameControls from "./Controls";
import MoveContainer from "./Moves";
import SelectionSidebar from "./Selection";

export default function AISidebar() {
  const { isGameWaiting } = useGame();

  return !isGameWaiting ? (
    <React.Fragment>
      <MoveContainer />
      <GameControls />
    </React.Fragment>
  ) : (
    <SelectionSidebar/>
  );
}
