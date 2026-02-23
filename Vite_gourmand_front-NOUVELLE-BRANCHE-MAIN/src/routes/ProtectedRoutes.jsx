import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children, role }) {
  const token = localStorage.getItem("auth_token");
  const user = JSON.parse(localStorage.getItem("auth_user") || "null");

  if (!token) return <Navigate to="/login" replace />;

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
