import { BrowserRouter } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import ClientRoutes from "./ClientRoutes";
import SalarieRoutes from "./SalarieRoutes";
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <PublicRoutes />
      <AuthRoutes />
      <ClientRoutes />
      <SalarieRoutes />
      <AdminRoutes />
    </BrowserRouter>
  );
}
