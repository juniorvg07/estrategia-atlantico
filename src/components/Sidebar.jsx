import React, { useContext } from "react";
import "../styles/Sidebar.css";
import { Link } from "react-router";
import { AuthContext } from "../auth/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const { auth } = useContext(AuthContext);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <nav className="sidebar-menu">
        {auth && auth.role === "SUPERADMIN" && (
          <>
            <Link to={"/dashboardSuper"}>
              <span className="material-symbols-outlined">home</span>
              Inicio
            </Link>
            <Link to={"/lideres"}>
              <span className="material-symbols-outlined">group</span>
              Líderes
            </Link>
            <Link to={"/referidos"}>
              <span className="material-symbols-outlined">groups</span>
              Referidos
            </Link>
            <Link to={"/divipole"}>
              <span className="material-symbols-outlined">account_circle</span>
              Usuarios
            </Link>
            <Link to={"/divipole"}>
              <span className="material-symbols-outlined">view_list</span>
              Divipole
            </Link>
          </>
        )}

        {auth && auth.role === "ADMIN" && (
          <>
            <Link to={"/dashboardAdmin"}>
              <span className="material-symbols-outlined">home</span>
              Inicio
            </Link>
            <Link to={"/lideres"}>
              <span className="material-symbols-outlined">group</span>
              Líderes
            </Link>
            <Link to={"/referidos"}>
              <span className="material-symbols-outlined">groups</span>
              Referidos
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
