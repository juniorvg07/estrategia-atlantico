import { useState, useEffect } from "react";
import { useLogin } from "../hooks/UseLogin";
import { Spinner } from "../components/loaders/Spinner";
import { Loader } from "../components/loaders/Loader";
import { InputField } from "../components/forms/InputField";
import { LoginFailedModal } from "../components/modals/LoginFailed";
import "../styles/Login.css";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { handleLogin, loader, modalError, setModalError, errorLabel } =
    useLogin();
  const [loading, setLoading] = useState(true);
  const [showPass, setShowPass] = useState(false);

  // --> Sanitización de las entradas del usuario en campos User y Password <--
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

  // --> Submit del formulario <--
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(credentials); // Función con la lógica del Login del usuario o rechazo
  };

  // --> Timeout del Spinner inicial <--
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <main className="login-main">
        <div className="login-form">
          <form className="form-container" onSubmit={handleSubmit}>
            <h1>Estrategia Atlántico</h1>

            <InputField
              icon="account_box"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Usuario"
              label="USUARIO"
            />

            <InputField
              icon="lock"
              type={showPass ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Contraseña"
              label="CONTRASEÑA"
            >
              <span
                id="visibility"
                className="material-symbols-outlined"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "visibility_off" : "visibility"}
              </span>
            </InputField>

            <button type="submit">Iniciar Sesión</button>

            <label id="version">Ver. 2.0.0</label>
          </form>
        </div>

        {loader && <Loader />}

        {modalError && (
          <LoginFailedModal
            errorLabel={errorLabel}
            onClose={() => setModalError(false)}
          />
        )}
      </main>
    );
  }
};
