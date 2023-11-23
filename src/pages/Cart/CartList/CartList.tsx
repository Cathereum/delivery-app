import styles from "./CartList.module.css";
import { CartItemCard } from "../../../components/CartItemCard/CartItemCard";
import { FC } from "react";
import { Product } from "../../../interfaces/product.interface";

export interface CartListProps {
  cartItems: Product[];
}
export const CartList: FC<CartListProps> = ({ cartItems }) => {
  return (
    <div className={styles["cart-list"]}>
      {cartItems.map((cartItem) => (
        <CartItemCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
};
