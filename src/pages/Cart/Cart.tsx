import { useSelector } from "react-redux";
import { Headling } from "../../components/Headling/Headling";
import styles from "./Cart.module.css";
import { CartList } from "./CartList/CartList";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import { PromoCode } from "../../components/PromoCode/PromoCode";
import { Button } from "../../components/Button/Button";

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
      <Headling className={styles["header"]}>Корзина</Headling>
      <div className={styles["cart"]}>
        <CartList cartItems={cartItems} />
        <PromoCode placeholder="Промокод" />
        <div className={styles["prices"]}>
          <div className={styles["field"]}>
            <div className={styles["title"]}>Стоимость</div>
            <div className={styles["coast"]}>
              120 <span>₽</span>
            </div>
          </div>
          <hr />
          <div className={styles["field"]}>
            <div className={styles["title"]}>Доставка</div>
            <div className={styles["coast"]}>
              420 <span>₽</span>
            </div>
          </div>
          <hr />
          <div className={styles["field"]}>
            <div className={styles["title"]}>
              Итого <span>(2)</span>
            </div>
            <div className={styles["coast"]}>
              120 <span>₽</span>
            </div>
          </div>
        </div>
        <Button size={"big"}>Офромить</Button>
      </div>
    </>
  );
};
