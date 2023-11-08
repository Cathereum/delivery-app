import { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return <input className={cn(styles["input"], className)} {...props} />;
};
