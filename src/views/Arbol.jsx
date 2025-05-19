import { useState } from "react";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Organigrama from "../templates/Organigrama";

export const Arbol = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      <Header />
      <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
      <main></main>
    </SidebarContext.Provider>
  );
};
