import { useState, useEffect } from "react";
import { ForosData } from "../utils/forosData";
import "../styles/Filters.css";

export const Filters = ({
  auth,
  dataRef,
  setRecords,
  data1,
  data2,
  onClose,
}) => {
  const [municipios, setMunicipios] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [puesto, setPuesto] = useState([]);
  const [selectedMuni, setSelectedMuni] = useState("");
  const [selectedForo, setSelectedForo] = useState("");
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState("");

  useEffect(() => {
    const muniCsv = [...new Set(data1.map((row) => row.Municipio))];
    setMunicipios(muniCsv);
  }, []);

  const handleMuniChange = (e) => {
    const muni = e.target.value;
    setSelectedMuni(muni);
    setSelectedBarrio("");
    setSelectedPuesto("");
    const barriosFiltrados = data1
      .filter((row) => row.Municipio === muni)
      .map((row) => row.Barrio);
    setBarrios([...new Set(barriosFiltrados)]);

    const puestosFiltrados = data2
      .filter((row) => row.Municipio_Votacion === muni)
      .map((row) => row.Puesto_Votacion);
    setPuesto([...new Set(puestosFiltrados)]);
  };

  const handleBarrioChange = (e) => {
    const b = e.target.value;
    setSelectedBarrio(b);
  };

  const handlePuestoChange = (e) => {
    const p = e.target.value;
    setSelectedPuesto(p);
  };

  const handleForoChange = (e) => {
    const f = e.target.value;
    setSelectedForo(f);
  };

  useEffect(() => {
    const filtered = dataRef.filter((record) => {
      const matchMunicipio =
        selectedMuni === "" || record.municipio === selectedMuni;
      const matchBarrio =
        selectedBarrio === "" || record.barrio === selectedBarrio;
      const matchForo = selectedForo === "" || record.foro === selectedForo;
      const matchPuesto =
        selectedPuesto === "" || record.puesto_votacion === selectedPuesto;
      return matchForo && matchMunicipio && matchBarrio && matchPuesto;
    });
    setRecords(filtered);
  }, [selectedMuni, selectedBarrio, selectedForo, selectedPuesto, dataRef]);

  return (
    <div className="overlay-filter">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>
          <span className="material-symbols-outlined">filter_alt</span>
          Filtros
        </h2>
        <div className="filters">
          <section id="group-1">
            <div>
              <label>Filtrar por Municipio:</label>
              <input
                type="datalist"
                list="municipio"
                value={selectedMuni}
                onChange={handleMuniChange}
              ></input>
              <datalist id="municipio">
                <option value="">Seleccione</option>
                {municipios.map((municipio, i) => (
                  <option key={i} value={municipio}>
                    {municipio}
                  </option>
                ))}
              </datalist>
            </div>

            {auth && auth.role === "SUPERADMIN" && (
              <div>
                <label>Filtrar por Foro:</label>
                <select
                  id="foro"
                  value={selectedForo}
                  onChange={handleForoChange}
                >
                  <option value="">Seleccione</option>
                  {ForosData.map((foro, i) => (
                    <option key={i} value={foro}>
                      {foro}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </section>

          <section id="group-2">
            <div>
              <label>Filtrar por Barrio:</label>
              <input
                type="datalist"
                list="barrio"
                value={selectedBarrio}
                disabled={!selectedMuni}
                onChange={handleBarrioChange}
              />
              <datalist id="barrio">
                <option value="">Seleccione</option>
                {barrios.map((barrio, i) => (
                  <option key={i} value={barrio}>
                    {barrio}
                  </option>
                ))}
              </datalist>
            </div>

            <div>
              <label>Filtrar por Puesto de Votación:</label>
              <input
                type="datalist"
                list="puesto"
                value={selectedPuesto}
                disabled={!selectedMuni}
                onChange={handlePuestoChange}
              />
              <datalist id="puesto">
                <option value="">Seleccione</option>
                {puesto.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
