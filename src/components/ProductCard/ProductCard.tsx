import { FC } from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

export interface ProductCardProps {
  id: number;
  image: string;
  price: number;
  rating: number;
  title: string;
  description: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  id,
  image,
  price,
  rating,
  title,
  description,
}) => {
  return (
    <Link className={styles["link"]} to={"/"}>
      <div className={styles["card"]}>
        <div
          className={styles["card-header"]}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className={styles["price"]}>
            {price}&nbsp;
            <span className={styles["rub-symbol"]}>₽</span>
          </div>
          <button className={styles["add-to-cart-button"]}>
            <img src="add-to-cart-icon.svg" alt="add-to-cart-icon" />
          </button>
          <div className={styles["rating"]}>
            {rating}&nbsp;
            <img src="./rating-icon.svg" alt="rating-icon" />
          </div>
        </div>
        <div className={styles["card-footer"]}>
          <div className={styles["title"]}>{title}</div>
          <div className={styles["description"]}>{description}</div>
        </div>
      </div>
    </Link>
  );
};
