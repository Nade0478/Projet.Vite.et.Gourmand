import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import Users from "../pages/admin/Users";

export default function AdminRoutes() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Routes>
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </ProtectedRoute>
  );
}
