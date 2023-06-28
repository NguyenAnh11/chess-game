import css from "./gameinfo.module.css";
import { UserInfo } from "../../../types";

type GameInfoUserProps = {
  user: UserInfo;
};

export default function GameInfoUser({ user }: GameInfoUserProps) {
  return (
    <div className={css.modal_game_info_player}>
      <div className={css.modal_game_info_player_avatar_container}>
        <div className={css.modal_game_info_player_avatar}>
          <img
            className={css.modal_game_info_player_avatar}
            style={{ objectFit: "cover" }}
            src={user.avatar}
            width="80"
            height="80"
          />
        </div>
      </div>
      <div className={css.modal_game_info_player_username}>
        <span>{user.name}</span>
      </div>
    </div>
  );
}
