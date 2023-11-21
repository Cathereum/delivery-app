import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { Button } from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const LogOut = () => {
    dispatch(userActions.logOut());
    navigate("/auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img src="/avatar.svg" alt="avatar-icon" />
          <div className={styles["user__name"]}>{profile?.name} Golt</div>
          <div className={styles["user__mail"]}>{profile?.email}</div>
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
