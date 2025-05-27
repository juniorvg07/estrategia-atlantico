import { useState } from "react";
import { axiosInstance } from "../../services/axiosInstance";
import "../../styles/DeleteUser.css";

export const DeleteUser = ({ onClose, user }) => {
  const username = user.username;

  const handleSubmit = (e) => {
    e.preventDefault();

    //Envía los datos en un método delete
    axiosInstance
      .delete(`/auth/deleteUser?name=${username}`)
      .then((res) => {
        window.confirm("Se ha eliminado correctamente");
        onClose();
      })
      .catch((err) => {
        console.error("Error al eliminar:", err);
        window.confirm("❌ Ocurrió un error al eliminar.");
        return;
      });
  };

  return (
    <div className="user-overlay">
      <div className="user-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>
          <span className="material-symbols-outlined">delete</span>
          Eliminar Usuario
        </h2>

        <form className="delete-form" onSubmit={handleSubmit}>
          <section>
            <label>¿Confirma eliminar el usuario: {user.name} ?</label>
          </section>

          <section id="button">
            <button type="submit">Eliminar</button>
          </section>
        </form>
      </div>
    </div>
  );
};
