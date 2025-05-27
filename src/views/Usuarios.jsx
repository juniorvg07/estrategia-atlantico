import { useState } from "react";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { UsersTable } from "../components/Tables/UsersTable";

export const Usuarios = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      <Header title="Usuarios" />
      <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
      <main className="users-main">
        <UsersTable />
      </main>
    </SidebarContext.Provider>
  );
};
