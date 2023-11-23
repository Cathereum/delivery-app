import { FC, MouseEvent } from "react";
import styles from "./CartItemCard.module.css";
import { Product } from "../../interfaces/product.interface";
import { cartActions } from "../../store/cart.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

export interface CartItemCardProps {
  cartItem: Product;
}

export const CartItemCard: FC<CartItemCardProps> = ({ cartItem }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddItem = () => dispatch(cartActions.addItem(cartItem.id));
  const handleRemoveItem = () => dispatch(cartActions.removeItem(cartItem.id));
  const handleDeleteItem = () => dispatch(cartActions.deleteItem(cartItem.id));

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
        <button className={styles["button-minus"]} onClick={handleRemoveItem}>
          —
        </button>{" "}
        <span className={styles["count"]}>{cartItem.count}</span>
        <button className={styles["button-plus"]} onClick={handleAddItem}>
          +
        </button>
        <button className={styles["button-x"]} onClick={handleDeleteItem}>
          x
        </button>
      </div>
    </div>
  );
};
