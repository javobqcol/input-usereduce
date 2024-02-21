import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { initialStateLogin } from "../hooks/actions";
import { useAuth } from "../hooks/useAuth";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
const LOGIN_URL = "api/v1/auth/login";
import axios from "../api/axios";
import { ErrorText } from "./ErrorText";

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [axiosErr, setAxiosErr] = useState("");


  const handleOnSubmit = async () => {

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: values.email, password: values.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token = response?.data?.token;
      const roles = response?.data?.roles;
      console.log(roles)
      setAuth({
        email: values.email,
        password: values.password,
        roles: roles,
        token: token,
      });


      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setAxiosErr("No server Response");
      } else if (error.response?.status === 400) {
        setAxiosErr("Missing email or password");
      } else if (error.response?.status === 401) {
        setAxiosErr("Unauthorized");
      } else {
        setAxiosErr("Login Failed");
      }
    }
  };
  const { handleSubmit, handleChange, values, errors } =
    useFormik({
      initialValues: initialStateLogin,
      validationSchema: yup.object({
        email: yup.string().email("Invalid email").required("Required!"),
        password: yup.string().required("Required!"),
      }),
      onSubmit: handleOnSubmit,
    });

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <h1>Login</h1>
        <TextField
          sx={{ marginTop: 2 }}
          type="text"
          label="Email"
          autoComplete="off"
          name="email"
          fullWidth
          id="inputEmail"
          value={values.email}
          onChange={handleChange}
          autoFocus
          required
          InputProps={{
            endAdornment: <ErrorText error={errors.email} />,
          }}
        />
        <TextField
          sx={{ marginTop: 2 }}
          type="password"
          fullWidth
          autoComplete="off"
          label="Password"
          id="inputpassword"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
          InputProps={{
            endAdornment: <ErrorText error={errors.password} />,
          }}
        />
        <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
          Login
        </Button>
        <Box component="div" sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          {axiosErr ? (
            <> 
              <ErrorIcon color="error"/>
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
