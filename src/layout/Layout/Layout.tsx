import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Button } from "../../components/Button/Button";
import cn from "classnames";

export const Layout = () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img src="/avatar.svg" alt="avatar-icon" />
          <div className={styles["user__name"]}>John Golt</div>
          <div className={styles["user__mail"]}>foodlover@mail.com</div>
        </div>
        <div className={styles["navigation"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="/menu-icon.svg" alt="menu-icon" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="/cart-icon.svg" alt="cart-icon" />
            Корзина
          </NavLink>
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
