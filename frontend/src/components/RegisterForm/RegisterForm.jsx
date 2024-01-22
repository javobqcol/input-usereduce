import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import "./RegisterForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import { initialStateUserRow } from "../../hooks/actions";

const USERNAME_REGEX = /^.+$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\*!@#$%&/\(\)=?¿_\-]).{8,24}$/;
const REGISTER_URL = "/api/users";

export const RegisterForm = () => {
  const registerRef = {
    userNameRef: useRef(),
    emailRef: useRef(),
    errRef: useRef(),
  };
  const [user, setUser] = useState(initialStateUserRow);

  const { userName, email, password, matchPassword } = user;
  const { emailRef, errRef, userNameRef } = registerRef;
  const navigate = useNavigate();

  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [verPassword, setVerPassword] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUserName(USERNAME_REGEX.test(userName));

  }, [userName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, email, password, matchPassword]);


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };
  const handleMouseDown = () => {
    setVerPassword(true);
  };
  const handleMouseUp = () => {
    setVerPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {

      const response = await axios.post(REGISTER_URL, {
        username: userName,
        email: email,
        password: password,
        roles:[{rolename:"user", active: true}]
      });
      setUser(initialStateUserRow)
      setSuccess(true);
      navigate("/");
    } catch (error) {

      if (!error?.response) {

        setErrMsg("no server response");
      } else if (error.response?.status === 409) {
        emailRef.current.focus();
        setErrMsg("Email taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus;
    }
  };

  return (
    <>
 
        {success ? (
          <section className="wrapper">
            <h1>Success!</h1>
            <p>
              <a href="#">Sign In</a>
            </p>
          </section>
        ) : (
          <section className="wrapper">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <section className="input-box">
                <input
                  className="form__input"
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder=" "
                  ref={userNameRef}
                  autoComplete="off"
                  onChange={onInputChange}
                  value={userName}
                  required
                  aria-invalid={validUserName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserNameFocus(true)}
                  onBlur={() => setUserNameFocus(false)}
                />
                <label className="form__label" htmlFor="emailname">
                  Username:&nbsp;
                  <i
                    className={
                      validUserName ? "fa-solid fa-check" : "offscreen"
                    }
                  />
                  <i
                    className={
                      !validUserName || !userName
                        ? "fa-solid fa-times"
                        : "offscreen"
                    }
                  />
                </label>
                <i className="icon fa-solid fa-user"></i>
                <p
                  id="uidnote"
                  className={
                    userNameFocus && !validUserName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <i className="fa-solid fa-circle-info" />
                  &nbsp;At last 1 character
                </p>
              </section>
              <section className="input-box">
                <input
                  className="form__input"
                  type="text"
                  id="emailname"
                  placeholder=" "
                  ref={emailRef}
                  autoComplete="off"
                  onChange={onInputChange}
                  name="email"
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <label className="form__label" htmlFor="emailname">
                  Email:&nbsp;
                  <i
                    className={validEmail ? "fa-solid fa-check" : "offscreen"}
                  />
                  <i
                    className={
                      !validEmail || !email ? "fa-solid fa-times" : "offscreen"
                    }
                  />
                </label>
                <i className="icon fa-solid fa-at"></i>
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <i className="fa-solid fa-circle-info" />
                  &nbsp;4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </section>
              <section className="input-box">
                <input
                  className="form__input"
                  type={verPassword ? "text" : "password"}
                  id="password"
                  onChange={onInputChange}
                  name="password"
                  value={password}
                  placeholder=" "
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <label className="form__label" htmlFor="password">
                  Password:&nbsp;
                  <i
                    className={
                      validPassword ? "fa-solid fa-check" : "offscreen"
                    }
                  />
                  <i
                    className={
                      !validPassword || !password
                        ? "fa-solid fa-times"
                        : "offscreen"
                    }
                  />
                </label>
                <i
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseOut={handleMouseUp}
                  className={
                    verPassword
                      ? "icon fa-solid fa-lock-open"
                      : "icon fa-solid fa-lock"
                  }
                />
                <p
                  id="passwordnote"
                  className={
                    passwordFocus && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <i className="fa-solid fa-circle-info" />
                  &nbsp;8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </section>

              <section className="input-box">
                <input
                  className="form__input"
                  type="password"
                  id="confirm_password"
                  onChange={onInputChange}
                  value={matchPassword}
                  name="matchPassword"
                  placeholder=" "
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <label className="form__label" htmlFor="confirm_password">
                  Confirm Password:&nbsp;
                  <i
                    className={
                      validMatch && matchPassword
                        ? "fa-solid fa-check"
                        : "offscreen"
                    }
                  />
                  <i
                    className={!validMatch ? "fa-solid fa-times" : "offscreen"}
                  />
                </label>
                <i className="icon fa-solid fa-lock"></i>
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <i className="fa-solid fa-circle-info" />
                  &nbsp;Must match the first password input field.
                </p>
              </section>

              <button
                disabled={
                  !validEmail || !validPassword || !validMatch ? true : false
                }
              >
                Sign Up
              </button>
              </form>
            <section className="input-box">
              <p>
                Already registered?
                <br />
                <span className="line">
                  <NavLink to='/'  href="#">Sign In</NavLink>
                </span>
              </p>
              <p
                id="errornote"
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                <i className="fa-solid fa-bomb" />
                {errMsg}
              </p>
            </section>
          </section>
        )}
    </>
  );
};
