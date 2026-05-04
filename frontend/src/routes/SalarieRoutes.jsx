import { Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import DashboardSalarie from "../pages/salarie/DashboardSalarie";
import Avis from "../pages/salarie/Avis";
import Commandes from "../pages/salarie/Commandes";
import Horaires from "../pages/salarie/Horaires";

const SalarieRoutes = (
  <>
    <Route
      path="/salarie/dashboard"
      element={
        <ProtectedRoutes role="salarie">
          <DashboardSalarie />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/salarie/avis"
      element={
        <ProtectedRoutes role="salarie">
          <Avis />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/salarie/commandes"
      element={
        <ProtectedRoutes role="salarie">
          <Commandes />
        </ProtectedRoutes>
      }
    />

    <Route
      path="/salarie/horaires"
      element={
        <ProtectedRoutes role="salarie">
          <Horaires />
        </ProtectedRoutes>
      }
    />
  </>
);

export default SalarieRoutes;
