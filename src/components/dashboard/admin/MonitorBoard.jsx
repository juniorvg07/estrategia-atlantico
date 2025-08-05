import { useState, useEffect } from "react";
import "../../../styles/MonitorBoard.css";

export const MonitorBoard = ({
  lideres,
  referidos,
  metaLider,
  metaReferido,
  cargando,
}) => {
  const [porcentajeLider, setPorcentajeLider] = useState(0);
  const [porcentajeReferido, setPorcentajeReferido] = useState(0);

  const porcentaje = (valor, meta) => {
    const percentage = (valor / meta) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  useEffect(() => {
    const percentage1 = porcentaje(lideres, metaLider);
    setPorcentajeLider(percentage1);

    const percentage2 = porcentaje(referidos, metaReferido);
    setPorcentajeReferido(percentage2);
  }, []);

  return (
    <section className="monitor-container" id="monitor-board">
      <article id="lider-child">
        <div
          className="circle-board"
          style={{ "--percentage": porcentajeLider }}
        >
          <div className="circle-child">
            <h2>{lideres.length}</h2>
            <h3>Líderes</h3>
            {cargando ? <h3>{porcentajeLider + "%"}</h3> : <h3>0%</h3>}
          </div>
        </div>
      </article>

      <article id="referido-child">
        <div
          className="circle-board"
          style={{ "--percentage": porcentajeReferido }}
        >
          <div className="circle-child">
            <h2>{referidos.length}</h2>
            <h3>Referidos</h3>
            {cargando ? <h3>{porcentajeReferido + "%"}</h3> : <h3>0%</h3>}
          </div>
        </div>
      </article>
    </section>
  );
};
