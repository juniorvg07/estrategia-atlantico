import { useState, useEffect } from "react";
import { ForosData } from "../../utils/forosData";
import { axiosInstance } from "../../services/axiosInstance";
import "../../styles/UserPanel.css";

export const UserPanel = ({ onClose, user }) => {
  const [showPass, setShowPass] = useState(false);

  const togglePassword = () => setShowPass(!showPass);

  const [form, setForm] = useState({
    id: "",
    name: "",
    foro: "",
    rol: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm(user);
    } else {
      setForm({
        name: "",
        foro: "",
        rol: "",
        username: "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let safeValue = value.replace(/[<>"']/g, "");

    if (["username"].includes(name)) {
      safeValue = safeValue
        .toLowerCase()
        .replace(/[^a-z ^0-9]/gi, "")
        .replace(/\s{1,}/g, "");
    }

    if (["name"].includes(name)) {
      safeValue = safeValue.replace(/\s{2,}/g, " ");
    }

    if (["password"].includes(name)) {
      safeValue = safeValue.replace(/\s{1,}/g, "");
    }

    setForm({ ...form, [name]: safeValue });
  };

  const handleSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Envía los datos en un método put
    if (user) {
      //Si es para editar un usuario
      axiosInstance
        .put("/auth/editUser", form)
        .then((res) => {
          window.confirm("✅ Usuario actualizado correctamente");
          onClose();
        })
        .catch((err) => {
          console.error("Error al guardar:", err);
          window.confirm("❌ Ocurrió un error al guardar.");
          return;
        });
    } else {
      //Si es para crear un usuario nuevo
      axiosInstance
        .post("/auth/register", form)
        .then((res) => {
          window.confirm("✅ Usuario creado correctamente");
          onClose();
        })
        .catch((err) => {
          console.error("Error al guardar:", err);
          window.confirm("❌ Ocurrió un error al guardar.");
          return;
        });
    }
  };

  return (
    <div className="user-overlay">
      <div className="user-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{user ? "Editar Usuario" : "Nuevo Usuario"}</h2>

        <form className="user-form" onSubmit={handleSubmit}>
          <section>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            ></input>
          </section>

          <section>
            <label>Rol:</label>
            <select
              value={form.rol}
              onChange={(event) => handleSelect("rol", event.target.value)}
              name="rol"
            >
              <option disabled value="">
                Defina el Rol
              </option>
              <option>SUPERADMIN</option>
              <option>ADMIN</option>
            </select>
          </section>

          <section>
            <label>Foro:</label>
            <select
              value={form.foro}
              onChange={(event) => handleSelect("foro", event.target.value)}
              name="foro"
            >
              <option disabled value="">
                Seleccione el Foro
              </option>
              {form.rol !== "SUPERADMIN" && Array.isArray(ForosData) ? (
                ForosData.map((foro, index) => (
                  <option key={index} value={foro}>
                    {foro}
                  </option>
                ))
              ) : (
                <option value="TODOS">TODOS</option>
              )}
            </select>
          </section>

          <section>
            <label>Usuario:</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            ></input>
          </section>

          <section>
            <label>Contraseña:</label>
            <div>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              ></input>
              <span
                className="material-symbols-outlined"
                onClick={togglePassword}
              >
                {showPass ? "visibility_off" : "visibility"}
              </span>
            </div>
          </section>

          <section id="button-panel">
            <button type="submit">{user ? "GUARDAR" : "CREAR"}</button>
          </section>
        </form>
      </div>
    </div>
  );
};
