import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { setCsvData } from "../../hooks/SetCSVData";
import { ForosData } from "../../../../../Proyectos/Codigos Propios/Proyectos 2025/Aplicativo Referidos/ReferidosApp/referidosApp/src/utils/forosData";
import { InputEditPerson } from "../forms/InputEditPerson";
import { DatalistEditPerson } from "../forms/DatalistEditPerson";
import { DatalistTerritorio } from "../forms/DatalistTerritorio";
import "../../styles/Modal.css";

export const EditPerson = ({ personData, onClose }) => {
  const { auth } = useContext(AuthContext);
  const territorio = setCsvData("ubicaciones.csv");
  const divipole = setCsvData("votaciones.csv");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [dptoVotacion, setDptoVotacion] = useState([]);
  const [muniVotacion, setMuniVotacion] = useState([]);
  const [puesto, setPuesto] = useState([]);

  const [liderData, setLiderData] = useState({
    id: personData.id,
    documento: personData.documento,
    nombre: personData.nombre,
    apellido: personData.apellido,
    foro: personData.foro,
    sexo: personData.sexo,
    edad: personData.edad,
    departamento: personData.departamento,
    municipio: personData.municipio,
    barrio: personData.barrio,
    departamento_votacion: personData.departamento_votacion,
    municipio_votacion: personData.municipio_votacion,
    puesto_votacion: personData.puesto_votacion,
    mesa: personData.mesa,
    created_by: personData.created_by,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let safeValue = value.replace(/[<>"']/g, "").replace(/\s{1,}/g, "");

    if (["nombre" || "apellido" || "foro" || "sexo"].includes(name)) {
      safeValue = safeValue
        .toUperCase()
        .replace(/[^a-z ^0-9]/gi, "")
        .replace(/\s{1,}/g, "");
    }
    console.log("name: " + name + " value: " + value);
    console.log(safeValue);
    setLiderData({ ...liderData, [name]: safeValue });
  };

  useEffect(() => {
    const dptoCsv = [...new Set(territorio.map((row) => row.Departamento))];
    setDepartamentos(dptoCsv);

    const muniCsv = [...new Set(territorio.map((row) => row.Municipio))];
    setMunicipios(muniCsv);

    const barrioCsv = [...new Set(territorio.map((row) => row.Barrio))];
    setBarrios(barrioCsv);

    const dptoVotCsv = [
      ...new Set(divipole.map((row) => row.Departamento_Votacion)),
    ];
    setDptoVotacion(dptoVotCsv);
  }, []);

  useEffect(() => {
    if (territorio.length > 0) {
      const depto = [...new Set(territorio.map((row) => row.Departamento))];
      setDepartamentos(depto);
    }
  }, [territorio]);

  const handleDptoChange = (e) => {
    setLiderData({ ...liderData, departamento: e.target.value });
    const dpto = e.target.value;

    const municipiosFiltrados = territorio
      .filter((row) => row.Departamento === dpto)
      .map((row) => row.Municipio);
    setMunicipios([...new Set(municipiosFiltrados)]);
  };

  const handleMuniChange = (e) => {
    setLiderData({ ...liderData, municipio: e.target.value });

    const muni = e.target.value;
    const barriosFiltrados = territorio
      .filter((row) => row.Municipio === muni)
      .map((row) => row.Barrio);
    setBarrios([...new Set(barriosFiltrados)]);
  };

  return (
    <div className="failed-overlay">
      <div className="failed-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div>
          <span className="material-symbols-outlined">Person</span>
        </div>
        <form className="person-form">
          <InputEditPerson
            type="number"
            name="documento"
            label="Documento: "
            value={liderData.documento}
            event={handleChange}
          />
          <InputEditPerson
            type="text"
            name="nombre"
            label="Nombre: "
            value={liderData.nombre}
            event={handleChange}
          />
          <InputEditPerson
            type="text"
            name="apellido"
            label="Apellido: "
            value={liderData.apellido}
            event={handleChange}
          />
          <DatalistEditPerson
            name="foro"
            label="Foro: "
            list="foro"
            value={liderData.foro}
            event={handleChange}
            array={ForosData}
          />
          <section className="datos">
            <label>Sexo:</label>
            <select
              value={liderData.sexo}
              onChange={(e) =>
                setLiderData({ ...liderData, sexo: e.target.value })
              }
            >
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </section>
          <InputEditPerson
            name="edad"
            label="Edad: "
            value={liderData.edad}
            event={handleChange}
          />
          <DatalistEditPerson
            name="departamento"
            label="Departamento: "
            list="dpto"
            value={liderData.departamento}
            event={handleDptoChange}
            array={departamentos}
          />
          <DatalistEditPerson
            name="municipio"
            label="Municipio: "
            list="municipio"
            value={liderData.municipio}
            event={handleMuniChange}
            array={municipios}
          />
          <DatalistEditPerson
            name="barrio"
            label="Barrio: "
            list="barrio"
            value={liderData.barrio}
            event={(e) =>
              setLiderData({ ...liderData, barrio: e.target.value })
            }
            array={barrios}
          />
        </form>
      </div>
    </div>
  );
};
