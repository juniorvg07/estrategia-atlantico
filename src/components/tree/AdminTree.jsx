import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { axiosInstance } from "../../services/axiosInstance";
import { dataTransform } from "../../utils/DataTransform";
import { Cuidadores } from "../../utils/Cuidadores";
import { CuidadorCard } from "./CuidadorCard";
import { ForoCard } from "./ForoCard";
import { LiderCard } from "./LiderCard";
import { ReferidoCard } from "./ReferidoCard";

export const AdminTree = () => {
  const { auth } = useContext(AuthContext);
  const [cuidadores, setCuidadores] = useState([]);
  const [user, setUser] = useState("");
  const [liderGroup, setLiderGroup] = useState([]);
  const [dataTree, setDataTree] = useState([]);
  const [lideres, setLideres] = useState(false);
  const [liderSelected, setLiderSelected] = useState("");
  const [referidos, setReferidos] = useState(false);

  useEffect(() => {
    const list = Cuidadores.filter((cuidador) => cuidador.foro === auth.foro);
    setCuidadores(list);
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/personal/getDataTreeByUser=${user.usuario}`)
      .then((res) => {
        const nodo = dataTransform(res.data, user.nombre, user.nombre);
        setDataTree(nodo);
        setReferidos(false);
        if (res.data.length !== 0) {
          setLideres(true);
        }
      })
      .catch((err) => {
        console.log("Error obteniendo los datos: " + err);
      });
  }, [user]);

  useEffect(() => {
    if (liderGroup.length !== 0) {
      setReferidos(true);
    }
  }, [liderGroup]);

  return (
    <>
      <section className="foro-section">
        <ForoCard foro={auth.foro} />
      </section>

      <section className="cuidadores-section">
        <h4>COORDINADORES FORO {auth.foro}</h4>
        <article className="cards-container">
          {cuidadores && cuidadores.length > 0 ? (
            cuidadores.map((cuidador, index) => (
              <CuidadorCard key={index} data={cuidador} setUser={setUser} />
            ))
          ) : (
            <h3>No hay líderes para mostrar</h3>
          )}
        </article>
      </section>

      {lideres && (
        <section className="lideres-section">
          <h4>LÍDERES {dataTree[0].name}</h4>
          <article className="cards-container">
            {dataTree.map((raiz) =>
              raiz.children && raiz.children.length > 0 ? (
                raiz.children.map((hijo, index) => (
                  <LiderCard
                    key={index}
                    data={hijo}
                    setNodo={setLiderGroup}
                    setLider={setLiderSelected}
                  />
                ))
              ) : (
                <h3>No hay líderes para mostrar</h3>
              )
            )}
          </article>
        </section>
      )}

      {referidos && (
        <section className="referidos-section">
          <h4>REFERIDOS {liderSelected}</h4>
          <article className="cards-container">
            {liderGroup.length > 0 ? (
              liderGroup.map((referido, index) => (
                <ReferidoCard key={index} data={referido} />
              ))
            ) : (
              <h3>No hay referidos para mostrar</h3>
            )}
          </article>
        </section>
      )}
    </>
  );
};
