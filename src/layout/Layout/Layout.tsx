import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { Button } from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

export const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const LogOut = () => {
    dispatch(userActions.logOut());
    navigate("/auth/login");
  };
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
        <Button onClick={LogOut} className={styles["exit"]}>
          <img src="/logout-icon.svg" alt="logout-icon" />
          Выйти
        </Button>
      </div>

      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
};
