import { axiosInstance } from "../../services/axiosInstance";
import { AuthContext } from "../../auth/AuthContext";
import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import { setCsvData } from "../../utils/setCsvData";
import { Filters } from "./Filters";
import { ExportButton } from "./ExportButton";
import { LiderPanel } from "./LiderPanel";
import "../../styles/Tables.css";

export const Table = () => {
  const [lideres, setLideres] = useState([]);
  const [records, setRecords] = useState(lideres);
  const [selectedUser, setSelectedUser] = useState(null);
  const { auth } = useContext(AuthContext);

  const [filter, setFilter] = useState(false);

  const dataCsv = setCsvData("ubicaciones.csv");
  const dataCsv2 = setCsvData("votaciones.csv");

  const [selectedMuni, setSelectedMuni] = useState("");
  const [selectedForo, setSelectedForo] = useState("");
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState("");

  useEffect(() => {
    if (auth.role === "SUPERADMIN") {
      axiosInstance
        .get("/personal/getLideres")
        .then((res) => {
          setLideres(res.data);
          setRecords(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Líderes:", err);
        });
    } else {
      axiosInstance
        .get(`/personal/getLideresForo=${auth.foro}`)
        .then((res) => {
          setLideres(res.data);
          setRecords(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Líderes:", err);
        });
    }
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.documento,
      sortable: true,
      center: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellido,
      sortable: true,
    },
    {
      name: "Municipio",
      selector: (row) => row.municipio,
      sortable: true,
    },
    {
      name: "Barrio",
      selector: (row) => row.barrio,
      sortable: true,
    },
    {
      name: "Foro",
      selector: (row) => row.foro,
      sortable: true,
    },
    {
      name: "Puesto de votación",
      selector: (row) => row.puesto_votacion,
      sortable: true,
    },
    {
      name: "Mesa de votación",
      selector: (row) => row.mesa_votacion,
      sortable: true,
      center: true,
    },
    {
      name: "Creado por",
      selector: (row) => row.created_by,
      sortable: true,
      center: true,
    },
  ];

  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filterRecords = lideres.filter((record) => {
      const nombre = record.nombre?.toLowerCase() || "";
      const apellido = record.apellido?.toLowerCase() || "";
      const documento =
        record.documento?.toLowerCase?.() ||
        record.documento?.toString().toLowerCase() ||
        "";

      return (
        nombre.includes(searchValue) ||
        apellido.includes(searchValue) ||
        documento.includes(searchValue)
      );
    });

    setRecords(filterRecords);
  };

  const handleCleansFilters = () => {
    setRecords(lideres);
  };

  const handleDoubleClick = (e) => {
    setSelectedUser(e);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    noRowsPerPage: true,
  };

  return (
    <>
      <div className="fila">
        <div className="filter-input">
          <label>Buscar: </label>
          <input
            placeholder="Documento, Nombre o Apellido"
            onChange={handleFilterChange}
          />
        </div>

        {filter && (
          <Filters
            onClose={() => setFilter(false)}
            auth={auth}
            data={records}
            setRecords={setRecords}
            data1={dataCsv}
            data2={dataCsv2}
          />
        )}

        <div className="right-buttons">
          <div className="filters-buttons">
            <button id="filtrar" onClick={() => setFilter(true)}>
              <span className="material-symbols-outlined">filter_alt</span>
              Filtrar
            </button>
            <button id="borrar-filtro" onClick={handleCleansFilters}>
              <span className="material-symbols-outlined">filter_alt_off</span>
            </button>
          </div>
          <ExportButton
            id="descargar"
            data={records}
            columns={columns}
            rol="Líderes"
          />
        </div>
      </div>

      <div className="dataTable-container">
        <DataTable
          columns={columns}
          data={records}
          pagination
          paginationPerPage={8}
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          highlightOnHover
          pointerOnHover
          onRowDoubleClicked={handleDoubleClick}
        />
      </div>

      {selectedUser && (
        <>
          <LiderPanel
            lider={selectedUser}
            data1={dataCsv}
            data2={dataCsv2}
            onClose={() => setSelectedUser(null)}
          />
        </>
      )}
    </>
  );
};
