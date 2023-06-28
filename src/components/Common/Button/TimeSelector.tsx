import { ReactNode } from "react";
import cn from "classnames";
import css from "./button.module.css";

type TimeSelectorProps = {
  children: ReactNode;
  label: string;
  value: string | number;
  isSelected: boolean;
  onClick: () => void;
};

export default function TimeSelector({
  label,
  value,
  isSelected,
  onClick,
  children,
}: TimeSelectorProps) {
  return (
    <button
      aria-label={label}
      value={value}
      onClick={onClick}
      className={cn([css.timer_selector_btn, isSelected && css.selected])}
    >
      {children}
    </button>
  );
}
