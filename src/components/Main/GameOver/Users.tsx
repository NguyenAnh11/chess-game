import GameOverUser from "./User";
import css from "./gameover.module.css";
import { UserInfo } from "../../../types";

type GameOverUsersProps = {
  users: UserInfo[];
};

export default function GameOverUsers({ users }: GameOverUsersProps) {
  return (
    <div className={css.modal_game_over_players}>
      <GameOverUser user={users[0]} />
      <p className={css.modal_game_over_score}>
        {users[0].isLoser ? <span>0 - 1</span> : <span>1 - 0</span>}
      </p>
      <GameOverUser user={users[1]} />
    </div>
  );
}
