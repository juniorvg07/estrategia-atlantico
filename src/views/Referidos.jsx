import { useState, useContext } from "react";
import { PersonalContext } from "../utils/PersonalContext";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Filters } from "../components/filtersTable/Filters";
import { referidosDataTable } from "../utils/ReferidosDataTable";
import { Table } from "../components/tables/Table";

export const Referidos = () => {
  const [sidebar, setSidebar] = useState(false);
  const { referidos, cargando } = useContext(PersonalContext);
  const [globalFilter, setGlobalFilter] = useState("");
  const { columns } = referidosDataTable();

  return (
    <>
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <Header title={"Referidos"} />
        <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
        <main className="main-app">
          <Filters filter={globalFilter} setFilter={setGlobalFilter} />
          {cargando && (
            <Table
              data={referidos}
              columns={columns}
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          )}
        </main>
      </SidebarContext.Provider>
    </>
  );
};
