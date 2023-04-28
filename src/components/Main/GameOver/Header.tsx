import { Icon } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import css from "./gameover.module.css";
import cn from "classnames";

type GameOverHeaderProps = {
  onClose: () => void;
};

export default function GameOverHeader({ onClose }: GameOverHeaderProps) {
  return (
    <div
      className={cn(
        css.modal_game_over_header,
        css.modal_game_over_header_grey
      )}
    >
      <div className={css.modal_game_over_header_title}>
        <span>Game Over</span>
      </div>
      <button className={css.modal_game_over_header_close} onClick={onClose}>
        <Icon color="white" fontSize="20px" as={IoMdClose} />
      </button>
    </div>
  );
}
