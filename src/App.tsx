import { Button } from "./components/Button/Button";

function App() {
  return (
    <>
      <Button onClick={() => console.log("press btn")}>Применить</Button>
      <Button size="big" onClick={() => console.log("press btn")}>
        Оформить
      </Button>
    </>
  );
}

export default App;
