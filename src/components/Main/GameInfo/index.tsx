import { ReactNode, useEffect, useRef } from "react";
import css from "./gameinfo.module.css";
import cn from "classnames";
import GameInfoHeader from "./Header";

type GameInfoProps = {
  title: "Draw" | "Game Over";
  onCloseModal: () => void;
  content: ReactNode
}

export default function GameInfo({ title, onCloseModal, content }: GameInfoProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onClose = () => {
    onCloseModal();
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

  return (
    <div className={css.modal_game_info}>
      <div className={css.modal_game_info_bg} />
      <div
        ref={ref}
        className={cn(
          css.modal_game_info_content,
          css.modal_game_info_content_rounded_grey
        )}
      >
        <GameInfoHeader title={title} onClose={onClose} />
        {content}
      </div>
    </div>
  );
}
