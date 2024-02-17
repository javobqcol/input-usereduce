import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

import { NavLink, useNavigate } from "react-router-dom";
import { initialStateUserRow } from "../hooks/actions";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useFormik } from "formik";
import * as yup from "yup";
import { ErrorText } from "./ErrorText";

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,24}$/;
// const PWD_REGEX =
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\*\"!@#$%&/\(\)=?¿_\-]).{5,24}$/;
const REGISTER_URL = "/api/v1/auth/register";

export const Register = () => {

  const navigate = useNavigate();

  const [axiosErr, setAxiosErr] = useState("");


  const handleOnSubmit = async () => {
    try {
      const response = await axios.post(REGISTER_URL, {
        username: values.username,
        email: values.email,
        password: values.password,
        repassword: values.matchPassword,
        roles: [{ rolename: "user", active: true }],
      });

      navigate("/");
      // setSuccess(true);

    } catch (error) {
      if (!error?.response) {
        setAxiosErr("no server response");
      } else if (error.response?.status === 409) {
        setAxiosErr("Email taken");
      } else {
        setAxiosErr("Registration failed");
      }
    }
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: initialStateUserRow,
    validationSchema: yup.object({
      username: yup.string().required("Required!"),
      email: yup
        .string()
        .required("Required!")
        .matches(EMAIL_REGEX, "Invalid email"),
      password: yup
        .string()
        .required("Required!")
        .min(5)
        .matches(PWD_REGEX, "Invalid Password"),
      matchPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required!"),
    }),
    onSubmit: handleOnSubmit,
  });
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Typography component="p" variant="h4">
          Register
        </Typography>
        <TextField
          sx={{ marginTop: 2 }}
          type="text"
          id="username"
          label="Username"
          name="username"
          autoComplete="off"
          autoFocus
          onChange={handleChange}
          value={values.username}
          fullWidth
          required
          InputProps={{
            endAdornment: <ErrorText error={errors.username} />,
          }}
        />

        <TextField
          sx={{ marginTop: 2 }}
          type="text"
          id="emailname"
          label="Email"
          autoComplete="off"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            endAdornment: <ErrorText error={errors.email} />,
          }}
        />
        <TextField
          sx={{ marginTop: 2 }}
          type="password"
          id="password"
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            endAdornment: <ErrorText error={errors.password} />,
          }}
        />
        <TextField
          sx={{ marginTop: 2 }}
          type="password"
          id="confirm_password"
          label="Confirm Password"
          name="matchPassword"
          value={values.matchPassword}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            endAdornment: <ErrorText error={errors.matchPassword} />,
          }}
        />

        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Sign Up
        </Button>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {axiosErr ? (
            <>
              <ErrorIcon color="error" />
              <Typography component="h3" align="center" color="error">
                {axiosErr}
              </Typography>
            </>
          ) : (
            " "
          )}
        </Box>
      </Container>
    </Box>
  );
};
