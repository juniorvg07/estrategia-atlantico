import React, { useState, useEffect } from "react";
import "../styles/PersonTable.css";

const PersonTable = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    global: "",
    nombre: "",
    edad: "",
    correo: "",
    pais: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://mockapi.io/api/personas"); // Cambia por tu API real
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        const fallbackData = [
          { nombre: "Ana", edad: 30, correo: "ana@mail.com", pais: "Chile" },
          { nombre: "Luis", edad: 42, correo: "luis@mail.com", pais: "México" },
          {
            nombre: "Sara",
            edad: 25,
            correo: "sara@mail.com",
            pais: "Argentina",
          },
        ];
        setData(fallbackData);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((persona) => {
    const globalMatch = Object.values(persona).some((value) =>
      value.toString().toLowerCase().includes(filters.global.toLowerCase())
    );

    const columnFilters =
      persona.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      persona.edad.toString().includes(filters.edad) &&
      persona.correo.toLowerCase().includes(filters.correo.toLowerCase()) &&
      persona.pais.toLowerCase().includes(filters.pais.toLowerCase());

    return globalMatch && columnFilters;
  });

  const exportCSV = () => {
    const headers = ["Nombre", "Edad", "Correo", "País"];
    const rows = filteredData.map((p) => [p.nombre, p.edad, p.correo, p.pais]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "personas.csv";
    a.click();
  };

  return (
    <div className="table-container">
      <h2>Lista de Personas</h2>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Buscar global..."
          value={filters.global}
          onChange={(e) => setFilters({ ...filters, global: e.target.value })}
        />
        <button onClick={exportCSV}>Exportar CSV</button>
      </div>

      <table className="person-table">
        <thead>
          <tr className="table-header">
            <th className="align-left">Nombre</th>
            <th className="align-center">Edad</th>
            <th className="align-left">Correo</th>
            <th className="align-center">País</th>
          </tr>
          <tr className="filter-row">
            <th>
              <input
                value={filters.nombre}
                onChange={(e) =>
                  setFilters({ ...filters, nombre: e.target.value })
                }
              />
            </th>
            <th>
              <input
                value={filters.edad}
                onChange={(e) =>
                  setFilters({ ...filters, edad: e.target.value })
                }
              />
            </th>
            <th>
              <input
                value={filters.correo}
                onChange={(e) =>
                  setFilters({ ...filters, correo: e.target.value })
                }
              />
            </th>
            <th>
              <input
                value={filters.pais}
                onChange={(e) =>
                  setFilters({ ...filters, pais: e.target.value })
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No hay datos
              </td>
            </tr>
          ) : (
            filteredData.map((p, i) => (
              <tr key={i}>
                <td className="align-left">{p.nombre}</td>
                <td className="align-center">{p.edad}</td>
                <td className="align-left">{p.correo}</td>
                <td className="align-center">{p.pais}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PersonTable;
