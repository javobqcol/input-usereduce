import React, { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios';
import "./RegisterForm.css"
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/users";

export const RegisterForm = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
        const response = await axios.post(REGISTER_URL, {email, password})
        console.log(response)
        setSuccess(true)
    } catch (error) {
      if (!error?.response){
          console.log("no server response")
      }else if(error.respone?.status===409){
        console.log("Email taken")
      } else {
        console.log("Registration Failed")
      }
      errRef.current.focus
    }
  };

  return (
    <>
      <section className="screen">
      {success ? (
        <section className='wrapper'>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className='wrapper'>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          {/* <form> */}
          <form onSubmit={handleSubmit}>
            <section className='input-box'>
              <input
                className='form__input'
                type="text"
                id="emailname"
                placeholder=" "
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <label className="form__label" htmlFor="emailname">
              Email:&nbsp;
              <i className={validEmail ? "fa-solid fa-check" : "offscreen"}/>
              <i className={!validEmail || !email ? "fa-solid fa-times" : "offscreen"}/>
              </label>
              <i className="icon fa-solid fa-user"></i>
            </section>
            {/* <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p> */}
            <section className="input-box">
              <input className='form__input'
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder=" "
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
              <label className="form__label" htmlFor="password">
                Password::&nbsp;
                <i className={validPassword ? "fa-solid fa-check" : "offscreen"}/>
                <i className={!validPassword  || !password  ? "fa-solid fa-times" : "offscreen"}/>
              </label>
              <i className="icon fa-solid fa-lock"></i>
            </section>
            {/* <p
              id="passwordnote"
              className={passwordFocus && !validPassword ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
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
            </p> */}
            <section className="input-box">
              <input
                className='form__input'
                type="password"
                id="confirm_password"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                placeholder=" "
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />

              <label className="form__label" htmlFor="confirm_password">
                Confirm Password:&nbsp;
                <i className={validMatch && matchPassword ? "fa-solid fa-check" : "offscreen"}/>
                <i className={!validMatch ? "fa-solid fa-times" : "offscreen"}/>
                {/* <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPassword ? "hide" : "invalid"}
                /> */}
              </label>
              <i className="icon fa-solid fa-lock"></i>
            </section>
            {/* <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p> */}

            <button
              disabled={!validEmail || !validPassword || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
      </section>
    </>
  );
};
//           <p
// id="uidnote"
// className={
//   emailFocus && email && !validName ? "instructions" : "offscreen"
// }
// >
// {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
// 4 to 24 characters.
// <br />
// Must begin with a letter.
// <br />
// Letters, numbers, underscores, hyphens allowed.
// </p>