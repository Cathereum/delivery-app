import { useEffect, useState } from "react";
import { Headling } from "../../components/Headling/Headling";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Search } from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios from "axios";

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getMenu = async () => {
    try {
      const { data } = await axios.get(`${PREFIX}/products`);
      setProducts(data);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles["menu-header"]}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          image={p.image}
          price={p.price}
          rating={p.rating}
          name={p.name}
          ingredients={p.ingredients.join(", ")}
        />
      ))}
    </>
  );
};
