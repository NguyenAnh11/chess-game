import { useEffect, useRef } from "react";
import css from "./gameover.module.css";
import cn from "classnames";
import { useGame } from "../../../contexts/GameContext";
import GameOverHeader from "./Header";
import GameOverUsers from "./Users";

export default function GameOver() {
  const ref = useRef<HTMLDivElement>(null);

  const { game, isShowGameOver, onCloseModalGameOver } = useGame();

  const onClose = () => {
    onCloseModalGameOver();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref.current]);

  return isShowGameOver ? (
    <div className={css.modal_game_over}>
      <div className={css.modal_game_over_bg} />
      <div
        ref={ref}
        className={cn(
          css.modal_game_over_content,
          css.modal_game_over_content_rounded_grey
        )}
      >
        <GameOverHeader onClose={onClose} />
        <GameOverUsers users={game.members} />
      </div>
    </div>
  ) : null;
}
