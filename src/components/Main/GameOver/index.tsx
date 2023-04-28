import { useEffect } from "react";
import css from "./gameover.module.css";
import cn from "classnames";
import GameOverHeader from "./Header";
import GameOverUser from "./User";
import { useChess } from "../../../contexts/ChessContext";

export default function GameOver() {
  const { onCloseModalGameOver } = useChess();

  const onClose = () => {
    onCloseModalGameOver();
  }

  useEffect(() => {

  }, [])

  return (
    <div className={css.modal_game_over}>
      <div className={css.modal_game_over_bg} />
      <div
        className={cn(
          css.modal_game_over_content,
          css.modal_game_over_content_rounded_grey
        )}
      >
        <GameOverHeader onClose={onClose}/>
        <GameOverUser />
      </div>
    </div>
  );
}
