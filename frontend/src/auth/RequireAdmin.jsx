import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdmin() {
  const token = localStorage.getItem("adminToken");
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
