import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart";
import { ProductPage } from "./pages/ProductPage/ProductPage.tsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Layout } from "./layout/Layout/Layout.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";
import "./index.css";
import { AuthLayout } from "./layout/AuthLayout/AuthLayout.tsx";
import { LoginPage } from "./pages/LoginPage/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.tsx";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>ИДЕТ ЗАГРУЗКА...</>}>
            <Menu />
          </Suspense>
        ),
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
          return defer({
            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((data) => data),
          });
          // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          // return data;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
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
