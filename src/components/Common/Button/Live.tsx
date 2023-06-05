import { forwardRef, ReactNode } from "react";
import cn from "classnames";
import css from "./button.module.css";

type ButtonProps = {
  label: string;
  customStyle?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean
  children: ReactNode;
  onClick: () => void;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, customStyle, disabled, children, loading = false, onClick }, ref) => {
    return (
      <button
        style={customStyle}
        ref={ref}
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className={cn(css.live_btn, disabled && css["disabled"])}
      >
        { loading ? <p>Loading....</p> : children }
      </button>
    );
  }
);

export default Button;
