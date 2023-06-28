import { ReactNode } from "react";
import css from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={css.selector_btn} onClick={onClick}>
      {children}
    </button>
  );
}
