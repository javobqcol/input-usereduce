import { useEffect, useRef, useState } from "react";
import "./LogiForm.css";
import axios from "../../api/axios";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { initialStateLogin } from "../../hooks/actions";
import { useAuth } from "../../hooks/useAuth";
const LOGIN_URL = "api/v1/auth/login";

export const LoginForm = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState(initialStateLogin);
  const { email, password, errMsg } = user;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setUser({ ...user, errMsg: "" });
  }, [email, password]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
      );

      const token = response?.data?.token;
      console.log(response)
      const roles = response?.data?.roles;

      setAuth({ email: email, password: password, roles: roles, token: token });

      setUser({ ...user, success: true, email: "", password: "" });
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setUser({ ...user, errMsg: "No server Response" });
      } else if (error.respone?.status === 400) {
        setUser({ ...user, errMsg: "Missing email or password" });
      } else if (error.response?.status === 401) {
        setUser({ ...user, errMsg: "Unauthorized" });
      } else {
        setUser({ ...user, errMsg: "Login Failed" });
      }
    }
  };

  return (
    <section className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            className="form__input"
            placeholder=" "
            autoComplete="off"
            ref={userRef}
            id="inputEmail"
            name="email"
            value={email}
            onChange={onInputChange}
            required
          />
          <label htmlFor="user" className="form__label">
            Email:
          </label>
          <i className="icon fa-solid fa-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            className="form__input"
            placeholder=" "
            autoComplete="off"
            id="inputpassword"
            name="password"
            value={password}
            onChange={onInputChange}
            required
          />
          <label htmlFor="user" className="form__label">
            Password:
          </label>
          <i className="icon fa-solid fa-lock"></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="·">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Dont have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <div className="error-section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {" "}
            {errMsg}
          </p>
        </div>
      </form>
    </section>
  );
};
