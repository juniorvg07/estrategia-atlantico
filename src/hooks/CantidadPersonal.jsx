import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axiosInstance";
import { ForosData } from "../utils/ForosData";

export const cantidadPersonal = () => {
  const [cantidadesLideres, setCantidadesLideres] = useState([]);
  const [cantidadesReferidos, setCantidadesReferidos] = useState([]);
  const [stateCantidades, setStateCantidades] = useState(false);

  useEffect(() => {
    const getDatos = async () => {
      try {
        const data = await axiosInstance.post(
          "/personal/getCantidadLideres",
          ForosData
        );
        setCantidadesLideres(data.data);

        const data2 = await axiosInstance.post(
          "/personal/getCantidadReferidos",
          ForosData
        );
        setCantidadesReferidos(data2.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setStateCantidades(true);
      }
    };

    getDatos();
  }, []);

  return { cantidadesLideres, cantidadesReferidos, stateCantidades };
};
