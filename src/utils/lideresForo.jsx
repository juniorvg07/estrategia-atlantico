import { axiosInstance } from "../services/axiosInstance";

export async function lideresxForo(foro) {
  try {
    const response = await axiosInstance.get(
      `/personal/getLideresForo=${foro}`
    );
    const lideres = response.data.length;

    return lideres;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
}
