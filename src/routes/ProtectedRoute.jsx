import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  if (auth.isAuthenticated === false) {
    // Usuario no autenticado
    return <Navigate to="/login" />;
  }

  const hasRequiredRole = allowedRoles.includes(auth.role);

  if (!hasRequiredRole) {
    // Usuario autenticado pero sin los roles necesarios
    return <Navigate to="/unauthorized" replace />;
  }

  // Usuario autenticado y con los roles necesarios
  return <Outlet />;
};
