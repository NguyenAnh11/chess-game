import css from "./gameover.module.css";
import { UserInfo } from "../../../types";

type GameOverUserProps = {
  user: UserInfo;
};

export default function GameOverUser({ user }: GameOverUserProps) {
  return (
    <div className={css.modal_game_over_player}>
      <div className={css.modal_game_over_player_avatar_container}>
        <div className={css.modal_game_over_player_avatar}>
          <img
            className={css.modal_game_over_player_avatar}
            style={{ objectFit: "cover" }}
            src={user.avatar}
            width="80"
            height="80"
          />
        </div>
      </div>
      <div className={css.modal_game_over_player_username}>
        <span>{user.name}</span>
      </div>
    </div>
  );
}
