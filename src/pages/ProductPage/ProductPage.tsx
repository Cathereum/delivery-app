import { useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";

export const ProductPage = () => {
  const data = useLoaderData() as Product;
  return (
    <div>
      Продукт: {data.id}
      <br />
      Название: {data.name}
    </div>
  );
};
