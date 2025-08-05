import { Suspense, useState, useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Spinner } from "./components/loaders/Spinner";
import { SessionExpiredModal } from "./components/modals/SessionExpired";
import { Login } from "./views/Login";
import { Dashboard } from "./views/Dashboard";
import { Arbol } from "./views/Arbol";
import { Lideres } from "./views/Lideres";
import { Referidos } from "./views/Referidos";
import { Usuarios } from "./views/Usuarios";

function App() {
  const { auth, loading, logout } = useContext(AuthContext);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    const handleSessionExpired = () => {
      setShowSessionExpired(true);
    };

    window.addEventListener("sessionExpired", handleSessionExpired);

    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired);
    };
  }, []);

  const handleCloseModal = () => {
    setShowSessionExpired(false);
    logout();
  };

  if (loading) return <Spinner />;

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              auth.role === "SUPERADMIN" || "ADMIN" || "USER" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            auth.isAuthenticated ? (
              auth.role === "SUPERADMIN" || "ADMIN" || "USER" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN", "USER"]} />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN", "USER"]} />
          }
        >
          <Route path="/arbol" element={<Arbol />} />
        </Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN", "USER"]} />
          }
        >
          <Route path="/lideres" element={<Lideres />} />
        </Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN", "USER"]} />
          }
        >
          <Route path="/referidos" element={<Referidos />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
      {showSessionExpired && <SessionExpiredModal onClose={handleCloseModal} />}
    </Suspense>
  );
}

export default App;
