import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api-estrategia-atlantico.onrender.com",
  /*baseURL: "http://localhost:8080",*/
  withCredentials: true,
});

// Variable para evitar múltiples modales
let isSessionExpiredModalShown = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      !isSessionExpiredModalShown
    ) {
      isSessionExpiredModalShown = true;

      // Lanza un evento personalizado para que lo escuche tu app
      window.dispatchEvent(new Event("sessionExpired"));
    }

    return Promise.reject(error);
  }
);
