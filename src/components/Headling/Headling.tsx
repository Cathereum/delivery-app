import { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./Headling.module.css";
import cn from "classnames";

export interface HeadlingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const Headling: FC<HeadlingProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={cn(styles["h1"], className)} {...props}>
      {children}
    </h1>
  );
};
