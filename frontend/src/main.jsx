import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/AuthProvider.jsx";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          {/* <SnackbarProvider maxSnack={3} autoHideDuration={3000}> */}
          <CssBaseline />
          <Routes>
            <Route path="/*"element={<App/>}/>
          </Routes>
          {/* </SnackbarProvider> */}
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
      </React.StrictMode>
);
