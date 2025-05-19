import { axiosInstance } from "../services/axiosInstance";

export async function referidosxForo(foro) {
  try {
    const response = await axiosInstance.get(
      `/personal/getReferidosForo=${foro}`
    );
    const referidos = response.data.length;

    return referidos;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
}
