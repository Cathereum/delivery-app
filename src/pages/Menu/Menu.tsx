import { Headling } from "../../components/Headling/Headling";
import { Search } from "../../components/Search/Search";
import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <div className={styles["menu-header"]}>
      <Headling>Меню</Headling>
      <Search placeholder="Введите блюдо или состав" />
    </div>
  );
};
