import { useState, useContext } from "react";
import { SidebarContext } from "../utils/sidebarContext";
import { AuthContext } from "../auth/AuthContext";
import "../styles/Header.css";

export default function Header({ title }) {
  const { sidebar, setSidebar } = useContext(SidebarContext);
  const showSidebar = () => setSidebar(!sidebar);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { auth, logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={showSidebar}>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      <div className="nav-bar-center">
        <h1>{title}</h1>
      </div>

      <div className="navbar-right">
        <div
          className="user-menu"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <span className="username">{auth.user}</span>
          <div className="user-icon">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
        {userMenuOpen && (
          <div className="dropdown-menu">
            <button>Información</button>
            <button>Cambiar contraseña</button>
            <button id="logout" onClick={handleSubmit}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
