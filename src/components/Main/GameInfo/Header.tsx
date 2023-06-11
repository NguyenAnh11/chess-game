import { Icon } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import css from "./gameinfo.module.css";
import cn from "classnames";

type GameInfoHeaderProps = {
  title: string;
  onClose: () => void;
};

export default function GameInfoHeader({ title, onClose }: GameInfoHeaderProps) {
  return (
    <div
      className={cn(
        css.modal_game_info_header,
        css.modal_game_info_header_grey
      )}
    >
      <div className={css.modal_game_info_header_title}>
        <span>{title}</span>
      </div>
      <button className={css.modal_game_info_header_close} onClick={onClose}>
        <Icon color="white" fontSize="20px" as={IoMdClose} />
      </button>
    </div>
  );
}
