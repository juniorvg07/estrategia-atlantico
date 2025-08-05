import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../../services/axiosInstance";
import { AuthContext } from "../../../auth/AuthContext";
import { PersonalContext } from "../../../utils/PersonalContext";
import { MetasAtl } from "../../../utils/metas";
import { MonitorBoard } from "./MonitorBoard";
import { TopLidersBoard } from "./TopLidersBoard";
import { Spinner } from "../../loaders/Spinner";

export const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [barriosTop, setBarriosTop] = useState([]);
  const [puestosTop, setPuestosTop] = useState([]);
  const { lideres, referidos, cargando } = useContext(PersonalContext);
  const [metaLider, setMetaLider] = useState(0);
  const [metaReferido, setMetaReferido] = useState(0);

  useEffect(() => {
    const foro = MetasAtl.find((item) => item.foro === auth.foro);

    setMetaLider(foro.metaLideres);
    setMetaReferido(foro.metaReferidos);
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/personal/topBarrios=${auth.foro}`)
      .then((res) => {
        const respuesta = res.data;
        const datos = respuesta.map((item) => ({
          nombre: item._id,
          cantidad: item.cantidad,
        }));
        setBarriosTop(datos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/personal/topPuestos=${auth.foro}`)
      .then((res) => {
        const respuesta = res.data;
        const datos = respuesta.map((item) => ({
          nombre: item._id,
          cantidad: item.cantidad,
        }));
        setPuestosTop(datos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!cargando) return <Spinner />;

  return (
    <>
      <MonitorBoard
        lideres={lideres.length}
        referidos={referidos.length}
        metaLider={metaLider}
        metaReferido={metaReferido}
        cargando={cargando}
      />

      <TopLidersBoard
        title="Top 10 Barrios"
        id="barrios-board"
        tipo="nombre"
        width={150}
        data={barriosTop}
      />
      <TopLidersBoard
        title="Top 10 Puestos de Votación"
        id="puestos-board"
        tipo="nombre"
        width={330}
        data={puestosTop}
      />
    </>
  );
};
