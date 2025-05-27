import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axiosInstance";
import { ForosData } from "../../utils/forosData";
import "../../styles/LiderPanel.css";

export const ReferidoPanel = ({
  rol,
  lider,
  listaLideres,
  data1,
  data2,
  onClose,
}) => {
  const [idLider, setIdLider] = useState(lider.id);
  const [foroLider, setForoLider] = useState(lider.foro);
  const [documentoLider, setDocumentoLider] = useState(lider.documento);
  const [nombreLider, setNombreLider] = useState(lider.nombre);
  const [apellidoLider, setApellidoLider] = useState(lider.apellido);
  const [sexoLider, setSexoLider] = useState(lider.sexo);
  const [edadLider, setEdadLider] = useState(lider.edad);
  const [dptoLider, setDptoLider] = useState(lider.departamento);
  const [muniLider, setMuniLider] = useState(lider.municipio);
  const [barrioLider, setBarrioLider] = useState(lider.barrio);
  const [dptoVotacionLider, setDptoVotacionLider] = useState(
    lider.departamento_votacion
  );
  const [muniVotacionLider, setMuniVotacionLider] = useState(
    lider.municipio_votacion
  );
  const [puestoLider, setPuestoLider] = useState(lider.puesto_votacion);
  const [mesaLider, setMesaLider] = useState(lider.mesa_votacion);
  const creado = lider.created_by;

  const [departamento, setDepartamento] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [dptoVotacion, setDptoVotacion] = useState([]);
  const [muniVotacion, setMuniVotacion] = useState([]);
  const [puesto, setPuesto] = useState([]);

  console.log(listaLideres);

  const handleDptoChange = (e) => {
    setDptoLider(e.target.value);

    const dpto = e.target.value;
    const muniFiltrados = data1
      .filter((row) => row.Departamento === dpto)
      .map((row) => row.Municipio);
    setMunicipios([...new Set(muniFiltrados)]);
  };

  const handleMuniChange = (e) => {
    setMuniLider(e.target.value);

    const muni = e.target.value;
    const barriosFiltrados = data1
      .filter((row) => row.Municipio === muni)
      .map((row) => row.Barrio);
    setBarrios([...new Set(barriosFiltrados)]);
  };

  const handleDptoVotChange = (e) => {
    setDptoVotacionLider(e.target.value);
    setMuniVotacionLider("");
    setPuestoLider("");
    setMesaLider("");
    const dpto = e.target.value;
    if (dpto != "ATLANTICO") {
      setMuniVotacionLider("OTROS");
      setPuestoLider("OTROS");
      setMesaLider("0");
    } else {
      setMuniVotacionLider(lider.municipio_votacion);
      setPuestoLider(lider.puesto_votacion);
      setMesaLider(lider.mesa_votacion);
      const muniFiltrados = data2
        .filter((row) => row.Departamento_Votacion === dpto)
        .map((row) => row.Municipio_Votacion);
      setMuniVotacion([...new Set(muniFiltrados)]);
    }
  };

  const handleMuniVotChange = (e) => {
    setMuniVotacionLider(e.target.value);

    const muni = e.target.value;

    if (muni != "OTROS") {
      const puestosFiltrados = data2
        .filter((row) => row.Municipio_Votacion === muni)
        .map((row) => row.Puesto_Votacion);
      setPuesto([...new Set(puestosFiltrados)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (
      documentoLider === "" ||
      nombreLider === "" ||
      apellidoLider === "" ||
      foroLider === "" ||
      sexoLider === "" ||
      edadLider === "" ||
      dptoLider === "" ||
      muniLider === "" ||
      barrioLider === "" ||
      dptoVotacionLider === "" ||
      muniVotacionLider === "" ||
      puestoLider === "" ||
      mesaLider === ""
    ) {
      window.confirm("⚠️ Por favor, completar todos los campos.");
      return;
    }

    // Si todo está bien, crea el objeto a envíar con los datos
    const person = {
      apellido: apellidoLider,
      barrio: barrioLider,
      departamento: dptoLider,
      departamento_votacion: dptoVotacionLider,
      documento: documentoLider,
      edad: edadLider,
      foro: foroLider,
      id: idLider,
      lider: "",
      mesa_votacion: mesaLider,
      municipio: muniLider,
      municipio_votacion: muniVotacionLider,
      nombre: nombreLider,
      puesto_votacion: puestoLider,
      rol: "Líder",
      sexo: sexoLider,
      created_by: creado,
    };

    //Envía los datos en un método put
    axiosInstance
      .put("/personal/updatePerson", person)
      .then((res) => {
        window.confirm("✅ Guardado correctamente.");
        onClose();
      })
      .catch((err) => {
        console.error("Error al guardar:", err);
        window.confirm("❌ Ocurrió un error al guardar.");
        return;
      });
  };

  useEffect(() => {
    const dptoCsv = [...new Set(data1.map((row) => row.Departamento))];
    setDepartamento(dptoCsv);

    const muniCsv = [...new Set(data1.map((row) => row.Municipio))];
    setMunicipios(muniCsv);

    const barrioCsv = [...new Set(data1.map((row) => row.Barrio))];
    setBarrios(barrioCsv);

    const dptoVotCsv = [
      ...new Set(data2.map((row) => row.Departamento_Votacion)),
    ];
    setDptoVotacion(dptoVotCsv);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Información del Líder</h2>
        <form onSubmit={handleSubmit}>
          {rol && rol === "SUPERADMIN" && (
            <section className="datos">
              <label>Foro:</label>
              <input
                list="lista1"
                value={foroLider}
                onChange={(e) => setForoLider(e.target.value)}
              />
              <datalist id="lista1">
                {ForosData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
            </section>
          )}
          <section className="datos">
            <label>Documento:</label>
            <input
              value={documentoLider}
              onChange={(e) => setDocumentoLider(e.target.value)}
            ></input>
          </section>
          <section className="datos">
            <label>Nombre:</label>
            <input
              value={nombreLider}
              onChange={(e) => setNombreLider(e.target.value)}
            ></input>
          </section>
          <section className="datos">
            <label>Apellidos:</label>
            <input
              value={apellidoLider}
              onChange={(e) => setApellidoLider(e.target.value)}
            ></input>
          </section>
          <section className="datos-grupo">
            <div className="sexo">
              <label>Sexo:</label>
              <select
                value={sexoLider}
                onChange={(e) => setSexoLider(e.target.value)}
              >
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </div>
            <div className="edad">
              <label>Edad:</label>
              <input
                type="number"
                value={edadLider}
                onChange={(e) => setEdadLider(e.target.value)}
              />
            </div>
          </section>
          <section className="datos">
            <label>Departamento:</label>
            <input
              type="datalist"
              list="dpto"
              value={dptoLider}
              onChange={handleDptoChange}
            />
            <datalist id="dpto">
              <option value="">Seleccione</option>
              {departamento.map((dpto, i) => (
                <option key={i} value={dpto}>
                  {dpto}
                </option>
              ))}
            </datalist>
          </section>
          <section className="datos">
            <label>Municipio:</label>
            <input
              type="datalist"
              list="municipios"
              value={muniLider}
              onChange={handleMuniChange}
            />
            <datalist id="municipios">
              {municipios.map((muni, i) => (
                <option key={i} value={muni}>
                  {muni}
                </option>
              ))}
            </datalist>
          </section>
          <section className="datos">
            <label>Barrio:</label>
            <input
              type="datalist"
              list="barrios"
              value={barrioLider}
              onChange={(e) => setBarrioLider(e.target.value)}
            />
            <datalist id="barrios">
              {barrios.map((barrio, i) => (
                <option key={i} value={barrio}>
                  {barrio}
                </option>
              ))}
            </datalist>
          </section>
          <section className="datos">
            <label>Departamento Votación:</label>
            <input
              type="datalist"
              list="dptoVotacion"
              value={dptoVotacionLider}
              onChange={handleDptoVotChange}
            />
            <datalist id="dptoVotacion">
              {dptoVotacion.map((dpto, i) => (
                <option key={i} value={dpto}>
                  {dpto}
                </option>
              ))}
            </datalist>
          </section>
          <section className="datos">
            <label>Municipio Votación:</label>
            <input
              type="datalist"
              list="muniVotacion"
              value={muniVotacionLider}
              onChange={handleMuniVotChange}
            />
            <datalist id="muniVotacion">
              {muniVotacion !== "OTROS" && Array.isArray(muniVotacion) ? (
                muniVotacion.map((muni, i) => (
                  <option key={i} value={muni}>
                    {muni}
                  </option>
                ))
              ) : (
                <option value="OTROS">OTROS</option>
              )}
            </datalist>
          </section>
          <section className="datos">
            <label>Puesto Votación:</label>
            <input
              type="datalist"
              list="puestoVotacion"
              value={puestoLider}
              onChange={(e) => setPuestoLider(e.target.value)}
            />
            <datalist id="puestoVotacion">
              {puesto !== "OTROS" && Array.isArray(puesto) ? (
                puesto.map((puesto, i) => (
                  <option key={i} value={puesto}>
                    {puesto}
                  </option>
                ))
              ) : (
                <option value="OTROS">OTROS</option>
              )}
            </datalist>
          </section>
          <section className="datos">
            <label>Mesa:</label>
            <input
              type="number"
              value={mesaLider}
              onChange={(e) => setMesaLider(e.target.value)}
            />
          </section>

          <section className="form-button">
            <button id="update" type="submit">
              Actualizar Información
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};
