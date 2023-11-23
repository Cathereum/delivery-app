import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE = 169;

export const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [itemsPrice, setItemsPrice] = useState<number>(0);
  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCartProducts();
  }, [items]);

  useEffect(() => {
    getprice();
  }, [cartItems]);

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

  const getprice = () => {
    // Создаем массив сумм
    const prices = cartItems.map((i) => (i.count ? i.count * i.price : 0));
    // Суммируем массив сумм
    const total = prices.reduce((acc, price) => acc + price, 0);

    setItemsPrice(total);
  };

  const checkOut = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: cartItems,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    navigate("/sucsess");
    dispatch(cartActions.clearCart());
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
              {itemsPrice}
              <span>₽</span>
            </div>
          </div>
          <hr />
          <div className={styles["field"]}>
            <div className={styles["title"]}>Доставка</div>
            <div className={styles["coast"]}>
              {DELIVERY_FEE} <span>₽</span>
            </div>
          </div>
          <hr />
          <div className={styles["field"]}>
            <div className={styles["title"]}>
              Итого <span>({cartItems.length})</span>
            </div>
            <div className={styles["coast"]}>
              {DELIVERY_FEE + itemsPrice} <span>₽</span>
            </div>
          </div>
        </div>
        <Button size={"big"} onClick={checkOut}>
          Офромить
        </Button>
      </div>
    </>
  );
};
