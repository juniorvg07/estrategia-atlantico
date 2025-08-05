import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const { auth } = useContext(AuthContext);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <nav className="sidebar-menu">
        <Link to={"/dashboard"}>
          <span className="material-symbols-outlined">home</span>
          Inicio
        </Link>
        <Link to={"/arbol"}>
          <span className="material-symbols-outlined">account_tree</span>
          Árbol
        </Link>
        <Link to={"/lideres"}>
          <span className="material-symbols-outlined">group</span>
          Líderes
        </Link>
        <Link to={"/referidos"}>
          <span className="material-symbols-outlined">groups</span>
          Referidos
        </Link>
        {auth && auth.role === "SUPERADMIN" && (
          <Link to={"/usuarios"}>
            <span className="material-symbols-outlined">account_circle</span>
            Usuarios
          </Link>
        )}
      </nav>
    </div>
  );
}
