import { ReactNode, forwardRef } from "react";
import css from "./button.module.css";
import cn from "classnames";
import Loading from "../../../assets/loading.svg"

type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: "basic" | "primary";
  size?: "sm" | "md";
  loading?: boolean;
  children: ReactNode;
  onClick: () => void;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, disabled, size = "md", loading = false, variant, onClick, children }, ref) => {
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
        {loading ? <Loading/> : children}
      </button>
    );
  }
);

export default Button;
