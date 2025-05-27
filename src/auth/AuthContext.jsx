import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../services/axiosInstance";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
    foro: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get("/auth/session");
        setAuth({
          isAuthenticated: true,
          user: response.data.name,
          role: response.data.role,
          foro: response.data.foro,
        });
      } catch (err) {
        setAuth({
          isAuthenticated: false,
          user: null,
          role: null,
          foro: null,
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile");
        setAuth({
          isAuthenticated: true,
          user: response.data.name,
          role: response.data.role,
          foro: response.data.foro,
        });
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          user: null,
          role: null,
          foro: null,
        });
      }
    };

    fetchUser();
  }, []);

  const login = (name, role, foro) => {
    setAuth({
      isAuthenticated: true,
      user: name,
      role: role,
      foro: foro,
    });
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (e) {
      console.warn("Error cerrando sesión:", e);
    }
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
      foro: null,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
