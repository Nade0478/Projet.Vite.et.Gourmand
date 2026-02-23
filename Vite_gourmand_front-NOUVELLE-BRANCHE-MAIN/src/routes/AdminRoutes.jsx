import { Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import DashboardAdmin from "../pages/admin/DashboardAdmin";
import Menus from "../pages/admin/Menus";
import Plats from "../pages/admin/Plats";
import Regimes from "../pages/admin/Regimes";
import Users from "../pages/admin/Users";
import Themes from "../pages/admin/Themes";
import Settings from "../pages/admin/Settings";
import Allergenes from "../pages/admin/Allergenes";

const AdminRoutes = (
  <>
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoutes role="admin">
          <DashboardAdmin />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/admin/menus"
      element={
        <ProtectedRoutes role="admin">
          <Menus />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/admin/plats"
      element={
        <ProtectedRoutes role="admin">
          <Plats />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/admin/regimes"
      element={
        <ProtectedRoutes role="admin">
          <Regimes />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/admin/allergenes"
      element={
        <ProtectedRoutes role="admin">
          <Allergenes />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/admin/users"
      element={
        <ProtectedRoutes role="admin">
          <Users />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/admin/themes"
      element={
        <ProtectedRoutes role="admin">
          <Themes />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/admin/settings"
      element={
        <ProtectedRoutes role="admin">
          <Settings />
        </ProtectedRoutes>
      }
    />
  </>
);

export default AdminRoutes;
