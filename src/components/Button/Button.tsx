import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "big" | "small";
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "small",
  ...props
}) => {
  return (
    <button
      className={cn(styles["button"], styles["accent"], className, {
        [styles["small"]]: size === "small",
        [styles["big"]]: size === "big",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
