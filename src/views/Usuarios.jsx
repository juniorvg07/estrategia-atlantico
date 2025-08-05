import { useState } from "react";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const Usuarios = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <Header title={"Usuarios"} />
        <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
        <main className="main-app">
          <h1>Página de Usuarios</h1>
        </main>
      </SidebarContext.Provider>
    </>
  );
};
