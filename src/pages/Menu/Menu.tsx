import { ChangeEvent, useEffect, useState } from "react";
import { Headling } from "../../components/Headling/Headling";
import { Search } from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError, spread } from "axios";
import { MenuList } from "./MenuList/MenuList";

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${PREFIX}/products`, {
        params: { name },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <div className={styles["menu-header"]}>
        <Headling>Меню</Headling>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        />
      </div>
      {error && <h1>{error}</h1>}
      {isLoading && <h1>Загрузка...</h1>}
      {!isLoading && products.length > 0 && <MenuList products={products} />}
      {!isLoading && products.length === 0 && (
        <h3>По вашему запросу ничего не найдено :-/</h3>
      )}
    </>
  );
};

export default Menu;
