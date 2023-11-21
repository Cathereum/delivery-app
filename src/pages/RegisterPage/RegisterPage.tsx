import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import styles from "./Register.module.css";
import { Input } from "../../components/Input/Input";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector(
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
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    // const email = target.email.value;
    // const password = target.password.value;
    const { email, password, name } = target;
    sendRegister(email.value, password.value, name.value);
  };

  const sendRegister = (email: string, password: string, name: string) => {
    dispatch(register({ email, password, name }));
  };

  return (
    <div className={styles["register"]}>
      <Headling className={styles["title"]}>Вход</Headling>
      {registerErrorMessage && (
        <span className={styles["error-message"]}>{registerErrorMessage}</span>
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
        <div className={styles["field"]}>
          <label htmlFor="name">Ваше имя</label>
          <Input id="name" name="name" type="text" placeholder="Имя" />
        </div>
        <div className={styles["button-wrapper"]}>
          <Button className={styles["button"]} size={"big"}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={styles["form-footer"]}>
        <span>Есть аккаунт?</span>
        <Link to={"/auth/login"}>Войти</Link>
      </div>
    </div>
  );
};
