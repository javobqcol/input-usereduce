import { Container } from "@mui/material";
import "./App.css";
import { Navbar } from "./navbar/Navbar";

import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonIcon from '@mui/icons-material/Person';
import { Login} from "./components/Login";
import { Register } from "./components/Register";
import { Layout } from "./components/Layout";
import { Users } from "./components/Users";
import { Unauthorized } from "./components/Unautorized";
import { RequireAuth } from "./components/RequireAuth";
import { ROLES } from "./hooks/actions";

const navArrayLinks = [
  {
    title: "Users",
    path: "/users",
    icon: <PersonIcon />,
  },
  {
    title: "home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Login",
    path: "/login",
    icon: <LoginIcon />,
  },
  {
    title: "Register",
    path: "/register",
    icon: <HowToRegIcon />,
  },
];
const App = () => {
  return (
    <>
      <Navbar navArrayLinks={navArrayLinks}/>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Layout/>}>
             {/* Public routes */}
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>

              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;
