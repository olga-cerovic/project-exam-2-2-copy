import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, LOGIN_PATH } from "../../api";
import axios from "axios";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthenticationContext } from "../../App";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

function LoginForm() {
  const navigate = useNavigate();

  const { setIsAuthenticated, setUser } = useContext(AuthenticationContext);

  const [unsuccessfulLoginMessage, setUnsuccessfulLoginMessage] =
    useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setUnsuccessfulLoginMessage(null);
    try {
      const response = await axios.post(`${BASE_URL}/${LOGIN_PATH}`, {
        email: data.email,
        password: data.password,
      });
      if (response?.status === 200) {
        navigate("/");
        setIsAuthenticated(true);
        setUser({
          avatar: response.data.avatar,
          name: response.data.name,
          banner: response.data.banner,
        });
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (error) {
      setUnsuccessfulLoginMessage("Incorrect email or password.");
    }
  }

  return (
    <div className={styles.container}>
      <div>{unsuccessfulLoginMessage}</div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <Form.Control
          className={styles.input}
          placeholder="Username or Email"
          {...register("email")}
        />
        {errors.email && <div>{errors.email.message}</div>}
        <Form.Control
          className={styles.input}
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <div>{errors.password.message}</div>}

        <button type="submit" className={styles.btn}>
          Login
        </button>
      </Form>
      <hr />
      <div className={styles.formBottom}>
        <div className={styles.signUpLink}>
          <span>Forgot your login details? </span>
          <Link to="/login"> Get help.</Link>
        </div>
        <div className={styles.signUpLink}>
          <span>
            Don't have an account?<Link to="/register"> Sign up here.</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
