import { useState, useContext } from "react";
import { PersonalContext } from "../utils/PersonalContext";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Filters } from "../components/filtersTable/Filters";
import { lideresDataTable } from "../utils/LideresTableData";
import { Table } from "../components/tables/Table";
import { EditPerson } from "../components/modals/EditPerson";

export const Lideres = () => {
  const [sidebar, setSidebar] = useState(false);
  const { lideres, cargando } = useContext(PersonalContext);
  const [dataFilter, setDataFilter] = useState([]);
  const { columns } = lideresDataTable();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [person, setPerson] = useState([]);

  const openModal = (p) => {
    setIsOpenModal(true);
    setPerson(p);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setPerson([]);
  };

  return (
    <>
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <Header title={"Lideres"} />
        <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />
        <main className="main-app">
          <Filters filter={lideres} setFilter={setDataFilter} />
          {cargando && (
            <Table
              data={dataFilter}
              columns={columns}
              handleModal={openModal}
            />
          )}

          {isOpenModal && (
            <EditPerson personData={person} onClose={closeModal} />
          )}
        </main>
      </SidebarContext.Provider>
    </>
  );
};
