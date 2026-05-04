import { Route } from "react-router-dom";

import Login from "../pages/auth_TEMP/Login";
import Register from "../pages/auth_TEMP/Register";

const AuthRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </>
);

export default AuthRoutes;
