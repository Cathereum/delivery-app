import { FC } from "react";
import styles from "./CartItemCard.module.css";
import { Product } from "../../interfaces/product.interface";

export interface CartItemCardProps {
  cartItem: Product;
}

export const CartItemCard: FC<CartItemCardProps> = ({ cartItem }) => {
  return (
    <div className={styles["item-card"]}>
      <div className={styles["item-info"]}>
        <div className={styles["item-image"]}>
          <img src={cartItem.image} alt="product-image" />
        </div>
        <div>
          <div className={styles["item-name"]}>{cartItem.name}</div>
          <div className={styles["item-price"]}>{cartItem.price}</div>
        </div>
      </div>
      <div className={styles["item-control"]}>
        <button className={styles["button-minus"]}>—</button>{" "}
        <span className={styles["count"]}>{cartItem.count}</span>
        <button className={styles["button-plus"]}>+</button>
        <button className={styles["button-x"]}>x</button>
      </div>
    </div>
  );
};
