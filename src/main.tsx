import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import App from "./App.tsx";
import "./index.css";
import { Main } from "./layout/Main/Main.tsx";
import { Menu } from "./pages/Menu/Menu.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
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
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);
