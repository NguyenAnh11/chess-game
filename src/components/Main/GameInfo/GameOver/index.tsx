import GameInfoUser from "../User";
import css from "../gameinfo.module.css";
import { UserPlayInfo } from "../../../../types";

type GameOverUsersProps = {
  users: UserPlayInfo[];
};

export default function GameOverUsers({ users }: GameOverUsersProps) {
  return (
    <div className={css.modal_game_info_players}>
      <GameInfoUser user={users[0]} />
      <p className={css.modal_game_info_score}>
        {users[0].isLoser ? <span>0 - 1</span> : <span>1 - 0</span>}
      </p>
      <GameInfoUser user={users[1]} />
    </div>
  );
}
