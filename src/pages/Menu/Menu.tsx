import { Headling } from "../../components/Headling/Headling";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Search } from "../../components/Search/Search";
import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <>
      <div className={styles["menu-header"]}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <ProductCard
        id={1}
        image={"./product-image.svg"}
        price={300}
        rating={4.5}
        title={"Наслаждение"}
        description={"Салями, руккола, помидоры, оливки"}
      />
    </>
  );
};
