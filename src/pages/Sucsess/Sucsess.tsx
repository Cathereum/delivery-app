import { FC } from "react";
import styles from "./Sucsess.module.css";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const Sucsess: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["wrapper"]}>
      <div>
        <img src="./big-pizza-icon.svg" alt="pizza-icon"></img>
      </div>
      <div className={styles["text"]}>Ваш заказ успешно оформлен!</div>
      <Button onClick={() => navigate("/")} size="big">
        Сделать новый
      </Button>
    </div>
  );
};
