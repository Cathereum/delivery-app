import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import styles from "./LoginPage.module.css";
import { Input } from "../../components/Input/Input";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logIn, userActions } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt]);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    // const email = target.email.value;
    // const password = target.password.value;
    const { email, password } = target;
    sendLogin(email.value, password.value);
  };

  const sendLogin = (email: string, password: string) => {
    dispatch(logIn({ email, password }));
  };

  return (
    <div className={styles["login"]}>
      <Headling className={styles["title"]}>Вход</Headling>
      {loginErrorMessage && (
        <span className={styles["error-message"]}>{loginErrorMessage}</span>
      )}
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
