import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { SuperDashboard } from "../components/dashboard/superadmin/SuperDashboard";
import { AdminDashboard } from "../components/dashboard/admin/AdminDashboard";
import "../styles/Dashboard.css";

export const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false);
  const { auth } = useContext(AuthContext);

  return (
    <>
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <Header title={"Inicio"} />
        <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
        <main className="main-app" id="main-dashboard">
          {auth.role === "SUPERADMIN" && <SuperDashboard />}
          {auth.role === "ADMIN" && <AdminDashboard />}
        </main>
      </SidebarContext.Provider>
    </>
  );
};
