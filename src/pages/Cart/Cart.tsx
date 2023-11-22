import { useSelector } from "react-redux";
import { Headling } from "../../components/Headling/Headling";
import styles from "./Cart.module.css";
import { CartList } from "./CartList/CartList";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";

export const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    getAllCartProducts();
  }, [items]);

  const getProductById = async (id: number, count: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    data.count = count;
    return data;
  };

  const getAllCartProducts = async () => {
    const res = await Promise.all(
      items.map((item) => getProductById(item.id, item.count))
    );
    setCartItems(res);
  };

  return (
    <>
      <div className={styles["cart-header"]}>
        <Headling>Корзина</Headling>
      </div>
      <CartList cartItems={cartItems} />
    </>
  );
};
