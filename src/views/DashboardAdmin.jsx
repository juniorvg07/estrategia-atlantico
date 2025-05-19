import { useState, useEffect, useContext } from "react";
import { Spinner } from "../components/Spinner";
import { SidebarContext } from "../utils/sidebarContext";
import { axiosInstance } from "../services/axiosInstance";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../auth/AuthContext";
import { Foro } from "../components/Foro";
import "../styles/DashboardAdmin.css";
import { PieChartAdmin } from "../components/PieChart";

export const DashboardAdmin = () => {
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(AuthContext);

  const [lideres, setLideres] = useState([]);
  const [referidos, setReferidos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/personal/getLideresForo=${auth.foro}`)
      .then((res) => {
        setLideres(res.data.length);
      })
      .catch((err) => {
        console.error("Error al obtener los Líderes:", err);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/personal/getReferidosForo=${auth.foro}`)
      .then((res) => {
        setReferidos(res.data.length);
      })
      .catch((err) => {
        console.error("Error al obtener los Líderes:", err);
      });
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

        <main className="admin-container">
          <section className="labels-container">
            <Foro nombre={auth.foro} lideres={lideres} referidos={referidos} />
          </section>
          <section className="pieChart">
            <PieChartAdmin
              nombre={auth.foro}
              rol="Líderes"
              cantidad={lideres}
            />
            <PieChartAdmin
              nombre={auth.foro}
              rol="Referidos"
              cantidad={referidos}
            />
          </section>
        </main>
      </SidebarContext.Provider>
    );
  }
};
