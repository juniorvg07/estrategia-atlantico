import { useState } from "react";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PersonTable from "../templates/PersonTable";

export const Divipole = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      <Header />
      <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
      <main></main>
    </SidebarContext.Provider>
  );
};
