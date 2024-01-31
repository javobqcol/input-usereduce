import { Routes, Route } from "react-router-dom";
import { ShowProducts } from "./components/ProductsForms/ShowProducts-reduce";
import "./App.css";

import { LoginForm } from "./components/LoginForm/LoginForm";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";
import { Layout } from "./components/Layout";
import { Missing } from "./components/Missing";
import { RequireAuth } from "./components/RequireAuth";
import { LinkPage } from "./components/LinkPage";
import { Editor } from "./components/Editor";
import { Admin } from "./components/Admin";
import { Lounge } from "./components/Lounge";
import { Unauthorized } from "./components/Unautorized";
import { Home } from "./components/Home";
import { ROLES } from "./hooks/actions";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* provate routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<ShowProducts />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Moderator]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Moderator]} />}>
            <Route path="admin" element={<Lounge />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
};
