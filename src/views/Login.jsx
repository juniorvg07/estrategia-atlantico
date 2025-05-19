import { useState, useContext, useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";
import "../styles/Login.css";

export const Login = () => {
  const [loading, setLoading] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorLabel, setErrorLabel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", credentials, {
        withCredentials: true,
      });
      const name = response.data.name;
      const role = response.data.role;
      const foro = response.data.foro;
      login(name, role, foro);
      if (role === "SUPERADMIN") {
        navigate("/dashboardSuper");
      } else if (role === "ADMIN") {
        navigate("/dashboardAdmin");
      }
    } catch (error) {
      setErrorLabel(error.response.data);
      console.error("Error al iniciar sesión:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return Spinner();
  } else {
    return (
      <main className="login-main">
        <div className="login-form">
          <form className="form-container" onSubmit={handleSubmit}>
            <h1>Estrategia Atlántico</h1>

            <section className="credentials">
              <label>USUARIO: </label>
              <input
                type="text"
                placeholder="Usuario"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </section>

            <section className="credentials">
              <label>CONTRASEÑA: </label>
              <input
                type="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </section>

            <button type="submit">Iniciar Sesión</button>
            <label>{errorLabel}</label>
          </form>
        </div>
      </main>
    );
  }
};
