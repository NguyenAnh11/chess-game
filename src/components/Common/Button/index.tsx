import { ReactNode, forwardRef } from "react";
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, disabled, size = "md", variant, onClick, children }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        disabled={disabled}
        className={cn(
          css[size],
          variant && css[variant],
          disabled && css["disabled"]
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Button;
