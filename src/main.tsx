import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart";
import { ProductPage } from "./pages/ProductPage/ProductPage.tsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import "./index.css";
import { Layout } from "./layout/Layout/Layout.tsx";
import { Menu } from "./pages/Menu/Menu.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
        errorElement: <>ОШИБКА</>,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
