import { useEffect, useState } from "react";
import { cantidadPersonal } from "../../../hooks/CantidadPersonal";
import { PersonalDpto } from "../../../hooks/PersonalDpto";
import { Controlboard } from "./ControlBoard";
import { SuperBoard } from "./SuperBoard";

export const SuperDashboard = () => {
  const { cantidadesLideres, cantidadesReferidos, stateCantidades } =
    cantidadPersonal();
  const [lideresDpto, setLideresDpto] = useState([]);
  const [referidosDpto, setReferidosDpto] = useState([]);
  const [filtro, setFiltro] = useState("Foro");

  useEffect(() => {
    if (stateCantidades) {
      const temp1 = PersonalDpto(cantidadesLideres);
      setLideresDpto(temp1);

      const temp2 = PersonalDpto(cantidadesReferidos);
      setReferidosDpto(temp2);
    }
  }, [stateCantidades]);

  return (
    <>
      {stateCantidades && (
        <Controlboard
          filtro={filtro}
          setFiltro={setFiltro}
          lideresForo={cantidadesLideres}
          referidosForo={cantidadesReferidos}
          lideresMuni={lideresDpto}
          referidosMuni={referidosDpto}
        />
      )}
      {stateCantidades && (
        <SuperBoard
          title={
            filtro === "Foro"
              ? "Líderes por Foro"
              : filtro === "Municipio"
              ? "Líderes por Municipio"
              : "default"
          }
          id="lideres"
          tipo={
            filtro === "Foro"
              ? "foro"
              : filtro === "Municipio"
              ? "municipio"
              : "default"
          }
          width={150}
          data={
            filtro === "Foro"
              ? cantidadesLideres
              : filtro === "Municipio" && lideresDpto
          }
        />
      )}
      {stateCantidades && (
        <SuperBoard
          title={
            filtro === "Foro"
              ? "Referidos por Foro"
              : filtro === "Municipio"
              ? "Referidos por Municipio"
              : "default"
          }
          id="referidos"
          tipo={
            filtro === "Foro"
              ? "foro"
              : filtro === "Municipio"
              ? "municipio"
              : "default"
          }
          width={150}
          data={
            filtro === "Foro"
              ? cantidadesReferidos
              : filtro === "Municipio" && referidosDpto
          }
        />
      )}
    </>
  );
};
