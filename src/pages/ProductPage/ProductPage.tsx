import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";

export const ProductPage = () => {
  const data = useLoaderData() as { data: Product };
  return (
    <div>
      <Suspense fallback={<>LOADING...</>}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <>
              Продукт: {data.id}
              <br />
              Название: {data.name}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
