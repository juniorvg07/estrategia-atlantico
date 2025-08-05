import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../services/axiosInstance";
import { AuthContext } from "../auth/AuthContext";

export const PersonalContext = createContext();

export const PersonalProvider = ({ children }) => {
  const [lideres, setLideres] = useState([]);
  const [referidos, setReferidos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const getPersonal = async () => {
      try {
        switch (auth.role) {
          case "SUPERADMIN":
            const response = await axiosInstance.get("/personal/getLideres");
            setLideres(response.data);

            const response2 = await axiosInstance.get(
              "/personal/getReferidosWithLider"
            );
            setReferidos(response2.data);

            setCargando(true);
            return;

          case "ADMIN":
            const response3 = await axiosInstance.get(
              `personal/getLideresForo=${auth.foro}`
            );
            setLideres(response3.data);

            const response4 = await axiosInstance.get(
              `personal/getReferidosForoWithLider=${auth.foro}`
            );
            setReferidos(response4.data);

            setCargando(true);
            return;

          case "USER":
            const response5 = await axiosInstance.get(
              `personal/getLideresUser=${auth.user}`
            );
            setLideres(response5.data);

            const response6 = await axiosInstance.get(
              `personal/getReferidosByUser=${auth.user}`
            );
            setReferidos(response6.data);

            setCargando(true);
            return;

          default:
            return;
        }
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };

    getPersonal();
  }, [auth.isAuthenticated]);

  return (
    <PersonalContext.Provider value={{ lideres, referidos, cargando }}>
      {children}
    </PersonalContext.Provider>
  );
};
