import { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { SidebarContext } from "../utils/sidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Municipio } from "../components/Dashboards/Municipio";
import { lideresxForo } from "../utils/lideresForo";
import { referidosxForo } from "../utils/referidosForo";
import { ForosData } from "../utils/forosData";
import { Barranquilla } from "../components/Dashboards/Barranquilla";
import { Soledad } from "../components/Dashboards/Soledad";
import { VerticalBarChart } from "../components/Charts/VerticalBarChart";
import "../styles/DashboardSuper.css";

export const DashboardSuper = () => {
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const [lideres, setLideres] = useState([]);
  const [referidos, setReferidos] = useState([]);

  useEffect(() => {
    async function obtenerDatos() {
      const promesasLideres = ForosData.map((foro) => lideresxForo(foro));
      const resultadosLideres = await Promise.all(promesasLideres);
      setLideres(resultadosLideres);

      const promesasReferidos = ForosData.map((foro) => referidosxForo(foro));
      const resultadosReferidos = await Promise.all(promesasReferidos);
      setReferidos(resultadosReferidos);
    }
    obtenerDatos();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return Spinner();
  } else {
    return (
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <Header title="Inicio" />
        <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />

        <main className="superadmin-container">
          <div className="columna1 foros-container">
            <Barranquilla lideres={lideres} referidos={referidos} />
            <Soledad lideres={lideres} referidos={referidos} />
          </div>
          <div className="columna2 foros-container">
            <Municipio
              nombre={ForosData[7]}
              lideres={lideres[7]}
              referidos={referidos[7]}
            />
            <Municipio
              nombre={ForosData[8]}
              lideres={lideres[8]}
              referidos={referidos[8]}
            />
            <Municipio
              nombre={ForosData[9]}
              lideres={lideres[9]}
              referidos={referidos[9]}
            />
          </div>
          <section className="verticalChart">
            <VerticalBarChart lideres={lideres} referidos={referidos} />
          </section>
        </main>
      </SidebarContext.Provider>
    );
  }
};
