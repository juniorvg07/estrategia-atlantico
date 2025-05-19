import { Suspense, useContext } from "react";
import { Spinner } from "./components/Spinner";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Login } from "./views/Login";
import { Unauthorized } from "./views/Unautorized";
import { DashboardSuper } from "./views/DashboardSuper";
import { DashboardAdmin } from "./views/DashboardAdmin";
import { Lideres } from "./views/Lideres";
import { Referidos } from "./views/Referidos";
import { Divipole } from "./views/Divipole";

function App() {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              auth.role === "SUPERADMIN" ? (
                <Navigate to="/dashboardSuper" />
              ) : auth.role === "ADMIN" ? (
                <Navigate to="/dashboardAdmin" />
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
              auth.role === "SUPERADMIN" ? (
                <Navigate to="/dashboardSuper" />
              ) : auth.role === "ADMIN" ? (
                <Navigate to="/dashboardAdmin" />
              ) : (
                <Login />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
          <Route path="/dashboardSuper" element={<DashboardSuper />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN"]} />}
        >
          <Route path="/lideres" element={<Lideres />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN"]} />}
        >
          <Route path="/referidos" element={<Referidos />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
          <Route path="/divipole" element={<Divipole />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
