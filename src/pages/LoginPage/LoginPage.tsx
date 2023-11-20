import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import styles from "./LoginPage.module.css";
import { Input } from "../../components/Input/Input";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import { JwtToken } from "../../interfaces/jwt.interface";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    // const email = target.email.value;
    // const password = target.password.value;
    const { email, password } = target;
    sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<JwtToken>(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("jwt", data.access_token);
      navigate("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className={styles["login"]}>
      <Headling className={styles["title"]}>Вход</Headling>
      {error && <span className={styles["error-message"]}>{error}</span>}
      <form className={styles["form"]} onSubmit={formSubmit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div className={styles["button-wrapper"]}>
          <Button className={styles["button"]} size={"big"}>
            Вход
          </Button>
        </div>
      </form>
      <div className={styles["form-footer"]}>
        <span>Нет аккаунта?</span>
        <Link to={"/auth/register"}>Зарегистрироваться</Link>
      </div>
    </div>
  );
};
