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
        <div className={styles["item-image"]}>{cartItem.image}</div>
        <div>
          <div className={styles["item-name"]}>{cartItem.name}</div>
          <div className={styles["item-price"]}>{cartItem.price}</div>
        </div>
      </div>
      <div className={styles["item-control"]}>
        <button>-</button> <span>{cartItem.count}</span> <button>+</button>
        <button>x</button>
      </div>
    </div>
  );
};
