import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import styles from "./LoginPage.module.css";
import { Input } from "../../components/Input/Input";
import { FormEvent } from "react";

export const LoginPage = () => {
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div className={styles["login"]}>
      <Headling className={styles["title"]}>Вход</Headling>
      <form className={styles["form"]} onSubmit={formSubmit}>
        <div className={styles["field"]}>
          <label htmlFor="emal">Ваш email</label>
          <Input id="emal" type="email" placeholder="Email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input id="password" type="password" placeholder="Пароль" />
        </div>
        <div className={styles["button-wrapper"]}>
          <Button className={styles["button"]} size={"big"}>
            Вход
          </Button>
        </div>
      </form>
      <div className={styles["form-footer"]}>
        <span>Нет аккаунта?</span>
        <Link to={"./auth/register"}>Зарегистрироваться</Link>
      </div>
    </div>
  );
};
