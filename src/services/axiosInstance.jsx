import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: "https://api-estrategia-atlantico.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();

    const status = error.response?.status;

    if (status === 401 || status === 403) {
      toast.error("Su sesión ha expirado");
      navigate("/login");
    }

    return Promise.reject(error);
  }
);
