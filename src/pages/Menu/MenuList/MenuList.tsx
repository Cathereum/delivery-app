import { FC } from "react";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { Product } from "../../../interfaces/product.interface";

export interface MenuListProps {
  products: Product[];
}

export const MenuList: FC<MenuListProps> = ({ products }) => {
  return products.map((p) => (
    <ProductCard
      key={p.id}
      id={p.id}
      image={p.image}
      price={p.price}
      rating={p.rating}
      name={p.name}
      ingredients={p.ingredients.join(", ")}
    />
  ));
};
