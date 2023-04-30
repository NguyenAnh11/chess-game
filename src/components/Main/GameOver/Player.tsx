import css from "./gameover.module.css";
import { PlayerInfoGame } from "../../../types";

type GameOverPlayerProps = {
  player: PlayerInfoGame;
};

export default function GameOverPlayer({ player }: GameOverPlayerProps) {
  return (
    <div className={css.modal_game_over_player}>
      <div className={css.modal_game_over_player_avatar_container}>
        <div className={css.modal_game_over_player_avatar}>
          <img
            className={css.modal_game_over_player_avatar}
            style={{ objectFit: "cover" }}
            src={player.avatar}
            width="80"
            height="80"
          />
        </div>
      </div>
      <div className={css.modal_game_over_player_username}>
        <span>{player.name}</span>
      </div>
    </div>
  );
}
