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
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let safeValue = value.replace(/[<>"']/g, "").replace(/\s{1,}/g, "");

    if (["username"].includes(name)) {
      safeValue = safeValue
        .toLowerCase()
        .replace(/[^a-z ^0-9]/gi, "")
        .replace(/\s{1,}/g, "");
    }

    setCredentials({ ...credentials, [name]: safeValue });
  };

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
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </section>

            <section className="credentials">
              <label>CONTRASEÑA: </label>
              <div>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Contraseña"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <span
                  className="material-symbols-outlined"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "visibility" : "visibility_off"}
                </span>
              </div>
            </section>

            <button type="submit">Iniciar Sesión</button>
            <label>{errorLabel}</label>
          </form>
        </div>
      </main>
    );
  }
};
