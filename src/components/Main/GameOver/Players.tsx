import { PlayerInfoGame } from "../../../types";
import GameOverPlayer from "./Player";
import css from "./gameover.module.css";

type GameOverPlayersProps = {
  playerGames: PlayerInfoGame[];
};

export default function GameOverPlayers({ playerGames }: GameOverPlayersProps) {
  return (
    <div className={css.modal_game_over_players}>
      <GameOverPlayer player={playerGames[0]} />
      <p className={css.modal_game_over_score}>
        {playerGames[0].lose ? <span>0 - 1</span> : <span>1 - 0</span>}
      </p>
      <GameOverPlayer player={playerGames[1]} />
    </div>
  );
}
