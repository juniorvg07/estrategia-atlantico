import { useState } from "react";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { TableReferidos } from "../components/Tables/TableReferidos";

export const Referidos = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      <Header title="Referidos" />
      <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
      <main className="main-table">
        <TableReferidos />
      </main>
    </SidebarContext.Provider>
  );
};
