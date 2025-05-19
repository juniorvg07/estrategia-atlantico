import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axiosInstance";
import { getLideresById } from "../utils/getLider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../styles/TableNormal.css";
import "../styles/SkeletonTable.css";
import "react-loading-skeleton/dist/skeleton.css";

export const ReferidosTable = () => {
  const [referidos, setReferidos] = useState([]);
  const [lideres, setLideres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/personal/getReferidos")
      .then((res) => {
        setReferidos(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener los Referidos:", err);
      });
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
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const loader = () => {
    return (
      <SkeletonTheme
        color="var(--gris-fuerte)"
        highlightColor="var(--azul-suave)"
      >
        <div className="skeleton-container">
          <table className="skeleton-table">
            <thead className="skeleton-header">
              <tr>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
                <th className="skeleton-rowHead">
                  <Skeleton />
                </th>
              </tr>
            </thead>
            <tbody className="skeleton-body">
              <tr>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
                <td>
                  <Skeleton count={10} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SkeletonTheme>
    );
  };

  if (loading) {
    return loader();
  } else {
    return (
      <div className="table-container">
        <table className="referidos table">
          <thead className="table-header">
            <tr>
              <th className="align-center">No.</th>
              <th className="align-center">Documento</th>
              <th className="align-center">Nombres</th>
              <th className="align-center">Apellidos</th>
              <th className="align-center">Municipio</th>
              <th className="align-center">Barrio</th>
              <th className="align-center">ID Líder</th>
              <th className="align-center">Nombre Líder</th>
              <th className="align-center">Puesto de votación</th>
              <th className="align-center">Mesa de votación</th>
            </tr>
          </thead>
          <tbody>
            {referidos.map((item, index) => (
              <tr key={index}>
                <td className="align-center">{index + 1}</td>
                <td className="align-center">{item.documento}</td>
                <td className="align-left">{item.nombre}</td>
                <td className="align-left">{item.apellido}</td>
                <td className="align-left">{item.municipio}</td>
                <td className="align-left">{item.barrio}</td>
                <td className="align-center">{lideres[index].documento}</td>
                <td className="align-left">{lideres[index].nombre}</td>
                <td className="align-left">{item.puesto_votacion}</td>
                <td className="align-center">{item.mesa_votacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
