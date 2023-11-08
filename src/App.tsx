import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";

function App() {
  return (
    <>
      <Button onClick={() => console.log("press btn")}>Применить</Button>
      <Button size="big" onClick={() => console.log("press btn")}>
        Оформить
      </Button>
      <Input placeholder="Email" />
    </>
  );
}

export default App;
