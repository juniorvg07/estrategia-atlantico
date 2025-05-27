import { axiosInstance } from "../../services/axiosInstance";
import { AuthContext } from "../../auth/AuthContext";
import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import { loader } from "./skeletonTable";
import { setCsvData } from "../../utils/setCsvData";
import { FiltersLider } from "./FiltersLider";
import { ExportButton } from "./ExportButton";
import { LiderPanel } from "./LiderPanel";
import "../../styles/Tables.css";

export const Table = () => {
  const [lideres, setLideres] = useState([]);
  const [dataRef, setDataRef] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { auth } = useContext(AuthContext);

  const [filter, setFilter] = useState(false);

  const dataCsv = setCsvData("ubicaciones.csv");
  const dataCsv2 = setCsvData("votaciones.csv");

  useEffect(() => {
    if (auth.role === "SUPERADMIN") {
      axiosInstance
        .get("/personal/getLideres")
        .then((res) => {
          setLideres(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Líderes:", err);
        });
    } else {
      axiosInstance
        .get(`/personal/getLideresForo=${auth.foro}`)
        .then((res) => {
          setLideres(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Líderes:", err);
        });
    }
  }, []);

  useEffect(() => {
    const data = lideres.map((lider, index) => {
      const dato1 = lider.municipio;
      const dato2 = lider.municipio_votacion;
      var zonificacion = "";
      if (dato1 != dato2) {
        zonificacion = "REQUIERE";
      } else {
        zonificacion = "OK";
      }

      return {
        ...lider,
        zonificacion: zonificacion,
      };
    });
    setRecords(data);
    setDataRef(data);
  }, [lideres]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.documento,
      sortable: true,
      center: "true",
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
      center: "true",
    },
    {
      name: "Zonificación",
      selector: (row) => row.zonificacion,
      sortable: true,
      center: true,
    },
    {
      name: "Creado por",
      selector: (row) => row.created_by,
      sortable: true,
      center: "true",
    },
  ];

  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filterRecords = dataRef.filter((record) => {
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
    setRecords(dataRef);
  };

  const handleDoubleClick = (e) => {
    setSelectedUser(e);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    noRowsPerPage: true,
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return loader();
  } else {
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
            <FiltersLider
              onClose={() => setFilter(false)}
              auth={auth}
              data={dataRef}
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
                <span className="material-symbols-outlined">
                  filter_alt_off
                </span>
                Borrar Filtros
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
  }
};
