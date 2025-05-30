import { useState } from "react";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Table } from "../components/Tables/Table";

export const Lideres = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      <Header title="Líderes" />
      <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
      <main className="main-table">
        <Table></Table>
      </main>
    </SidebarContext.Provider>
  );
};
