import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axiosInstance";
import "../styles/TableNormal.css";

export const LideresTable = () => {
  const [lideres, setLideres] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/personal/getLideres")
      .then((res) => {
        setLideres(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener los Líderes:", err);
      });
  }, []);

  return (
    <div className="table-container">
      <table className="lideres table">
        <thead className="table-header">
          <tr>
            <th className="align-center">No.</th>
            <th className="align-center">ID</th>
            <th className="align-center">Nombres</th>
            <th className="align-center">Apellidos</th>
            <th className="align-center">Municipio</th>
            <th className="align-center">Barrio</th>
            <th className="align-center">Foro</th>
            <th className="align-center">Puesto de votación</th>
            <th className="align-center">Mesa de votación</th>
          </tr>
        </thead>
        <tbody>
          {lideres.map((item, index) => (
            <tr key={index}>
              <td className="align-center">{index + 1}</td>
              <td className="align-center">{item.documento}</td>
              <td className="align-left">{item.nombre}</td>
              <td className="align-left">{item.apellido}</td>
              <td className="align-left">{item.municipio}</td>
              <td className="align-left">{item.barrio}</td>
              <td className="align-left">{item.foro}</td>
              <td className="align-left">{item.puesto_votacion}</td>
              <td className="align-center">{item.mesa_votacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
