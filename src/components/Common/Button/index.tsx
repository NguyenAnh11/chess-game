import { ReactNode } from "react";
import css from "./button.module.css";
import cn from "classnames";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: "basic" | "primary";
  size?: "sm" | "md";
  children: ReactNode;
  onClick: () => void;
};

export default function Button({
  label,
  disabled,
  variant,
  size = "md",
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      className={cn(css[size], variant && css[variant], disabled && css["disabled"] )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
