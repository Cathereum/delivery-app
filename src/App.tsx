import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";
import { Main } from "./pages/Main/Main";
import { Cart } from "./pages/Cart/Cart";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <Button onClick={() => console.log("press btn")}>Применить</Button>
      <Button size="big" onClick={() => console.log("press btn")}>
        Оформить
      </Button>
      <Input placeholder="Email" />
      <div>
        <a href="/">Главная страница</a>
        <a href="/cart">Корзина</a>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
