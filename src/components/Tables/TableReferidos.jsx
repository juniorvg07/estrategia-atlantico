import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import { loader } from "./skeletonTable";
import { axiosInstance } from "../../services/axiosInstance";
import { AuthContext } from "../../auth/AuthContext";
import { getLideresById } from "../../utils/getLider";
import { setCsvData } from "../../utils/setCsvData";
import { Filters } from "./Filters";
import { ExportButton } from "./ExportButton";
import "../../styles/Tables.css";

export const TableReferidos = () => {
  const [loading, setLoading] = useState(true);
  const [rendertable, setRenderTable] = useState(false);
  const [filter, setFilter] = useState(false);

  const dataCsv = setCsvData("ubicaciones.csv");
  const dataCsv2 = setCsvData("votaciones.csv");

  const [selectedMuni, setSelectedMuni] = useState("");
  const [selectedForo, setSelectedForo] = useState("");
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState("");

  const [referidos, setReferidos] = useState([]);
  const [lideres, setLideres] = useState([]);
  const { auth } = useContext(AuthContext);

  const [dataRef, setDataRef] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (auth.role === "SUPERADMIN") {
      axiosInstance
        .get("/personal/getReferidos")
        .then((res) => {
          setReferidos(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Referidos:", err);
        });
    } else {
      axiosInstance
        .get(`/personal/getReferidosForo=${auth.foro}`)
        .then((res) => {
          setReferidos(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Referidos:", err);
        });
    }
  }, []);

  useEffect(() => {
    async function setearLideres() {
      const promesas = referidos.map((referido) =>
        getLideresById(referido.lider)
      );

      const resultados = await Promise.all(promesas);
      setLideres(resultados);
    }
    setearLideres();
  }, [referidos]);

  useEffect(() => {
    const data = referidos.map((referido, index) => {
      const idLider = lideres[index].documento;
      const nombreLider = lideres[index].nombre;

      const dato1 = referido.municipio;
      const dato2 = referido.municipio_votacion;
      var zonificacion = "";
      if (dato1 != dato2) {
        zonificacion = "REQUIERE";
      } else {
        zonificacion = "OK";
      }

      return {
        ...referido,
        id_lider: idLider,
        nombre_lider: nombreLider,
        zonificacion: zonificacion,
      };
    });
    setRecords(data);
    setDataRef(data);

    if (records != []) {
      setRenderTable(true);
    }
  }, [lideres]);

  const columns = [
    {
      name: "Documento",
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
      name: "Doc Lider",
      selector: (row) => row.id_lider,
      sortable: true,
    },
    {
      name: "Nombre Lider",
      selector: (row) => row.nombre_lider,
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
      name: "Zonificación",
      selector: (row) => row.zonificacion,
      sortable: true,
      center: true,
    },
    {
      name: "Creado",
      selector: (row) => row.created_by,
      sortable: true,
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

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    noRowsPerPage: true,
  };

  const handleCleansFilters = () => {
    setRecords(dataRef);
  };

  const handleDoubleClick = (e) => {
    console.log(e);
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
            <Filters
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
              </button>
            </div>
            <ExportButton
              id="descargar"
              data={records}
              columns={columns}
              rol="Referidos"
            />
          </div>
        </div>

        <div className="dataTable-container">
          {rendertable && (
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
          )}
        </div>
      </>
    );
  }
};
