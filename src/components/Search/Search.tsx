import { FC, InputHTMLAttributes } from "react";
import styles from "./Search.module.css";
import cn from "classnames";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Search: FC<SearchProps> = ({ className, ...props }) => {
  return (
    <div className={styles["search-wrapper"]}>
      <input className={cn(styles["search"], className)} {...props} />
      <img
        className={styles["search-icon"]}
        src="/search-icon.svg"
        alt="search-icon"
      />
    </div>
  );
};
