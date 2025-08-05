import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { axiosInstance } from "../services/axiosInstance";

export const useLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorLabel, setErrorLabel] = useState("");

  const handleLogin = async (credentials) => {
    setLoader(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", credentials, {
        withCredentials: true,
      });
      login(data.name, data.role, data.foro);

      setLoader(false);

      navigate("/dashboard" || "/");
    } catch (error) {
      setErrorLabel(error.response?.data || "Error desconocido");
      console.error("Error al iniciar sesión:", error);
      setLoader(false);
      setModalError(true);
    }
  };

  return { handleLogin, loader, modalError, setModalError, errorLabel };
};
