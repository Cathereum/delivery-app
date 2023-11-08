import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={cn(styles.button, styles.accent, className)} {...props}>
      {children}
    </button>
  );
};
