import { useState, useEffect } from "react";
import { ForosData } from "../../../utils/ForosData";
import { CantidadForo } from "../../../hooks/CantidadForo";
import { CantidadMunicipio } from "../../../hooks/CantidadMunicipio";
import "../../../styles/Controlboard.css";

export const Controlboard = ({
  filtro,
  setFiltro,
  lideresForo,
  referidosForo,
  lideresMuni,
  referidosMuni,
}) => {
  const [selectedItem, setSelectedItem] = useState("TODOS");
  const [metasFilter, setMetasFilter] = useState(false);
  const [liderSelected, setLiderSelected] = useState(0);
  const [referidoSelected, setReferidoSelected] = useState(0);
  const [porcentajeLider, setPorcentajeLider] = useState(0);
  const [porcentajeReferido, setPorcentajeReferido] = useState(0);
  const metasLideresForo = CantidadForo(lideresForo, "lideres");
  const metasReferidosForo = CantidadForo(referidosForo, "referidos");
  const metasLideresMuni = CantidadMunicipio(lideresMuni, "lideres");
  const metasReferidosMuni = CantidadMunicipio(referidosMuni, "referidos");

  const handleChange = (e) => {
    setFiltro(e.target.value);
    setSelectedItem("TODOS");
  };

  const handleSelectChange = (e) => {
    setSelectedItem(e.target.value);
  };

  useEffect(() => {
    setPorcentajeLider(metasLideresForo[10].porcentaje);

    setPorcentajeReferido(metasReferidosForo[10].porcentaje);
  }, []);

  useEffect(() => {
    if (selectedItem !== "TODOS" && filtro === "Foro") {
      const select1 = lideresForo.filter((foro) => foro.foro == selectedItem);
      setLiderSelected(select1[0].cantidad);

      const select2 = referidosForo.filter((foro) => foro.foro == selectedItem);
      setReferidoSelected(select2[0].cantidad);
    }
    if (selectedItem !== "TODOS" && filtro === "Municipio") {
      const select1 = lideresMuni.filter(
        (foro) => foro.municipio == selectedItem
      );
      setLiderSelected(select1[0].cantidad);

      const select2 = referidosMuni.filter(
        (foro) => foro.municipio == selectedItem
      );
      setReferidoSelected(select2[0].cantidad);
    }
    if (selectedItem === "TODOS") {
      setLiderSelected(metasLideresForo[10].totalCantidad);
      setReferidoSelected(metasReferidosForo[10].totalCantidad);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem !== "TODOS" && filtro === "Foro" && metasFilter) {
      const select1 = metasLideresForo.filter(
        (foro) => foro.foro == selectedItem
      );
      setPorcentajeLider(select1[0].porcentaje);

      const select2 = metasReferidosForo.filter(
        (foro) => foro.foro == selectedItem
      );
      setPorcentajeReferido(select2[0].porcentaje);
    }
    if (selectedItem !== "TODOS" && filtro === "Municipio" && metasFilter) {
      const select1 = metasLideresMuni.filter(
        (municipio) => municipio.municipio == selectedItem
      );
      setPorcentajeLider(select1[0].porcentaje);

      const select2 = metasReferidosMuni.filter(
        (municipio) => municipio.municipio == selectedItem
      );
      setPorcentajeReferido(select2[0].porcentaje);
    }
    if (
      selectedItem === "TODOS" &&
      metasLideresMuni.length > 1 &&
      metasFilter
    ) {
      setPorcentajeLider(metasLideresForo[10].porcentaje);

      setPorcentajeReferido(metasReferidosForo[10].porcentaje);
    }
  }, [selectedItem]);

  return (
    <>
      {metasLideresMuni && metasLideresMuni.length !== 1 && (
        <section className="control-container">
          <article id="controls">
            <fieldset>
              <legend>Filtros:</legend>
              <label>
                <input
                  type="radio"
                  name="filtro"
                  value="Foro"
                  checked={filtro === "Foro"}
                  onChange={handleChange}
                />
                Foro
              </label>

              <label>
                <input
                  type="radio"
                  name="filtro"
                  value="Municipio"
                  checked={filtro === "Municipio"}
                  onChange={handleChange}
                />
                Municipio
              </label>
            </fieldset>

            <fieldset>
              <label>{filtro}</label>
              <select onChange={handleSelectChange}>
                {filtro === "Foro" && (
                  <>
                    <option value="TODOS">TODOS</option>
                    {ForosData.map((foro, index) => (
                      <option key={index} value={foro}>
                        {foro}
                      </option>
                    ))}
                  </>
                )}
                {filtro === "Municipio" && (
                  <>
                    <option value="TODOS">TODOS</option>
                    <option value="BARRANQUILLA">BARRANQUILLA</option>
                    <option value="SOLEDAD">SOLEDAD</option>
                    <option value="MALAMBO">MALAMBO</option>
                    <option value="PUERTO COLOMBIA">PUERTO COLOMBIA</option>
                    <option value="SABANAGRANDE">SABANAGRANDE</option>
                  </>
                )}
              </select>
            </fieldset>

            <fieldset>
              <label>
                <input
                  type="checkbox"
                  checked={metasFilter}
                  onChange={() => setMetasFilter(!metasFilter)}
                />
                VS Metas
              </label>
            </fieldset>
          </article>

          <article id="lideres-panel">
            <div
              className={metasFilter ? "circle" : ""}
              style={metasFilter ? { "--percentage": porcentajeLider } : {}}
            >
              <div className="circle-content">
                <h2>{liderSelected}</h2>
                <h3>Líderes</h3>
                {metasFilter && <h2>{porcentajeLider + "%"}</h2>}
              </div>
            </div>
          </article>

          <article id="referidos-panel">
            <div
              className={metasFilter ? "circle" : ""}
              style={metasFilter ? { "--percentage": porcentajeReferido } : {}}
            >
              <div className="circle-content">
                <h2>{referidoSelected}</h2>
                <h3>Referidos</h3>
                {metasFilter && <h2>{porcentajeReferido + "%"}</h2>}
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
};
