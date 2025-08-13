import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { setCsvData } from "../../hooks/SetCSVData";
import { ForosData } from "../../utils/ForosData";
import { Cuidadores } from "../../utils/Cuidadores";
import { SelectFilter } from "../filtersTable/SelectFilter";
import { CuidadoresFilter } from "../filtersTable/CuidadoresFilter";
import "../../styles/Filters.css";

export const Filters = ({ filter, setFilter }) => {
  const { auth } = useContext(AuthContext);
  const territorio = setCsvData("ubicaciones.csv");
  const divipole = setCsvData("votaciones.csv");
  const [municipios, setMunicipios] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [puesto, setPuesto] = useState([]);
  const [cuidadoresList, setCuidadoresList] = useState([]);
  const [selectedMuni, setSelectedMuni] = useState("");
  const [selectedCuidador, setSelectedCuidador] = useState("");
  const [selectedForo, setSelectedForo] = useState("");
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState("");

  useEffect(() => {
    if (auth.role === "SUPERADMIN") {
      setCuidadoresList(Cuidadores);
    } else if (auth.role === "ADMIN") {
      const list = Cuidadores.filter((item) => item.foro === auth.foro);
      setCuidadoresList(list);
    }
  }, []);

  useEffect(() => {
    if (territorio.length > 0) {
      const muni = [...new Set(territorio.map((row) => row.Municipio))];
      setMunicipios(muni);
    }
  }, [territorio]);

  const handleMunicipioChange = (e) => {
    const muni = e.target.value;
    setSelectedMuni(muni);
    setSelectedBarrio("");
    setSelectedPuesto("");
    const barriosFiltrados = territorio
      .filter((row) => row.Municipio === muni)
      .map((row) => row.Barrio);
    setBarrios([...new Set(barriosFiltrados)]);

    const puestosFiltrados = divipole
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

  const handleCuidadorChange = (e) => {
    const c = e.target.value;
    setSelectedCuidador(c);
  };

  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filterRecords = filter.filter((record) => {
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
    setFilter(filterRecords);
  };

  const dataFilter = useMemo(() => {
    return filter.filter((item) => {
      return (
        (selectedForo === "" || item.foro === selectedForo) &&
        (selectedCuidador === "" || item.created_by === selectedCuidador) &&
        (selectedMuni === "" || item.municipio === selectedMuni) &&
        (selectedBarrio === "" || item.barrio === selectedBarrio) &&
        (selectedPuesto === "" || item.puesto_votacion === selectedPuesto)
      );
    });
  }, [
    selectedForo,
    selectedCuidador,
    selectedMuni,
    selectedBarrio,
    selectedPuesto,
    filter,
  ]);

  useEffect(() => {
    setFilter(dataFilter);
  }, [
    selectedForo,
    selectedCuidador,
    selectedMuni,
    selectedBarrio,
    selectedPuesto,
    filter,
  ]);

  return (
    <section className="filters">
      <article className="filter-input">
        <label>Documento, Nombre o Apellido:</label>
        <input
          type="text"
          onChange={handleFilterChange}
          className="buscador-global"
          required
        />
      </article>

      <article className="filters-container">
        {auth.role === "SUPERADMIN" && (
          <SelectFilter
            id="filter-foro"
            title="Foros:"
            value={selectedForo}
            list="foro"
            handle={handleForoChange}
            array={ForosData}
          />
        )}

        {auth.role === "SUPERADMIN" || auth.role === "ADMIN" ? (
          <CuidadoresFilter
            id="filter-cuidador"
            title="Cuidador:"
            value={selectedCuidador}
            list="cuidadores"
            handle={handleCuidadorChange}
            array={cuidadoresList}
          />
        ) : (
          <></>
        )}

        <SelectFilter
          id="filter-municipio"
          title="Municipios:"
          value={selectedMuni}
          list="municipio"
          handle={handleMunicipioChange}
          array={municipios}
        />
        <SelectFilter
          id="filter-barrio"
          title="Barrios:"
          value={selectedBarrio}
          list="barrio"
          handle={handleBarrioChange}
          array={barrios}
          disabled={!selectedMuni}
        />
        <SelectFilter
          id="filter-puesto"
          title="Puesto de Votación:"
          value={selectedPuesto}
          list="puesto"
          handle={handlePuestoChange}
          array={puesto}
          disabled={!selectedMuni}
        />
      </article>

      <article className="filter-button">
        <button id="descargar">Descargar</button>
      </article>
    </section>
  );
};
