import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api-estrategia-atlantico.onrender.com",
  withCredentials: true,
});
