import { axiosInstance } from "../services/axiosInstance";

export async function getLideresById(id) {
  try {
    const response = await axiosInstance.get(
      `/personal/buscarLiderById?id=${id}`
    );

    const primerNombre = response.data.nombre.trim().split(" ")[0] || "";
    const primerApellido = response.data.apellido.trim().split(" ")[0] || "";
    const resultado = (primerNombre + " " + primerApellido).trim();

    const lider = {
      documento: response.data.documento,
      nombre: resultado,
    };

    return lider;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
}
