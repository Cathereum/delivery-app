import { FC, InputHTMLAttributes } from "react";
import styles from "./PromoCode.module.css";
import cn from "classnames";
import { Button } from "../Button/Button";

export interface PromoCodeProps extends InputHTMLAttributes<HTMLInputElement> {}

export const PromoCode: FC<PromoCodeProps> = ({ className, ...props }) => {
  return (
    <div className={styles["promo-wrapper"]}>
      <input className={cn(styles["promo-code"], className)} {...props} />
      <Button className={styles["button"]}>Применить</Button>
    </div>
  );
};
