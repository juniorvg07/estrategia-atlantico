import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { SuperTree } from "../components/tree/SuperTree";
import { AdminTree } from "../components/tree/AdminTree";
import "../styles/Arbol.css";

export const Arbol = () => {
  const [sidebar, setSidebar] = useState(false);
  const { auth } = useContext(AuthContext);

  return (
    <>
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <Header title={"Estructura de Referidos"} />
        <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
        <main className="main-app" id="main-tree">
          {auth.role === "SUPERADMIN" && <SuperTree />}
          {auth.role === "ADMIN" && <AdminTree />}
        </main>
      </SidebarContext.Provider>
    </>
  );
};
