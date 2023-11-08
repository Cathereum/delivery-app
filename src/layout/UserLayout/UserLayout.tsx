import { Link, Outlet } from "react-router-dom";
import styles from "./UserLayout.module.css";
import { Button } from "../../components/Button/Button";

export const UserLayout = () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img src="/avatar.svg" alt="avatar-icon" />
          <div className={styles["user__name"]}>John Golt</div>
          <div className={styles["user__mail"]}>foodlover@mail.com</div>
        </div>
        <div className={styles["navigation"]}>
          <Link className={styles["link"]} to="/">
            <img src="/menu-icon.svg" alt="menu-icon" />
            Меню
          </Link>
          <Link className={styles["link"]} to="/cart">
            <img src="/cart-icon.svg" alt="cart-icon" />
            Корзина
          </Link>
        </div>
        <Button className={styles["exit"]}>
          <img src="/logout-icon.svg" alt="logout-icon" />
          Выйти
        </Button>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
