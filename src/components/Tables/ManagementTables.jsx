import { useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AuthContext } from "../../auth/AuthContext";
import { axiosInstance } from "../../services/axiosInstance";
import "../../styles/ManagementTables.css";

export const ManagementTables = () => {
  const [lideres, setLideres] = useState([]);
  const [referidos, setReferidos] = useState([]);
  const { auth } = useContext(AuthContext);

  const ButtonEdit = () => (
    <button type="button">
      <span className="material-symbols-outlined">
        <span class="material-symbols-outlined">edit_square</span>
      </span>
    </button>
  );

  const ButtonDelete = () => (
    <button type="button">
      <span className="material-symbols-outlined">
        <span class="material-symbols-outlined">delete</span>
      </span>
    </button>
  );

  useEffect(() => {
    if (auth.role === "SUPERADMIN") {
      axiosInstance
        .get("/personal/getLideres")
        .then((res) => {
          setLideres(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Lideres:", err);
        });
    } else {
      axiosInstance
        .get(`/personal/getLideresForo=${auth.foro}`)
        .then((res) => {
          setLideres(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener los Lideres:", err);
        });
    }
  }, []);

  const columnsLiders = [
    {
      name: "Documento",
      selector: (row) => row.documento,
      sortable: true,
      center: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre_completo,
      sortable: true,
    },
    {
      name: "Foro",
      selector: (row) => row.foro,
      sortable: true,
    },
    {
      name: "Referidos",
      selector: (row) => row.cant_referidos,
      sortable: true,
    },
    {
      name: "Editar",
      button: true,
      cell: () => <ButtonEdit />,
      center: "true",
    },
    {
      name: "Eliminar",
      button: true,
      cell: () => <ButtonDelete />,
      center: "true",
    },
  ];

  return (
    <div className="tables-container">
      <section className="lideres section">
        <article>
          <DataTable
            title="Líderes"
            columns={columnsLiders}
            data={lideres}
            fixedHeader
            highlightOnHover
            pointerOnHover
          />
        </article>
      </section>

      <section className="referidos section">
        <article>
          <DataTable
            title="Referidos"
            columns={columnsLiders}
            data={lideres}
            fixedHeader
            highlightOnHover
            pointerOnHover
          />
        </article>
      </section>
    </div>
  );
};
