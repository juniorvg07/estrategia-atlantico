import { MetasDpto } from "../utils/metasDpto";

export function CantidadMunicipio(cantidadMuni, rol) {
  const resultado = [];

  let totalCantidad = 0;
  let totalMeta = 0;

  cantidadMuni.forEach(({ municipio, cantidad }) => {
    const metaObj = MetasDpto.find((m) => m.municipio === municipio);
    let meta = 0;
    if (rol === "lideres") {
      meta = metaObj?.metaLideres ?? metaObj?.cantidad ?? 1;
    } else {
      meta = metaObj?.metaReferidos ?? metaObj?.cantidad ?? 1;
    }

    totalCantidad += cantidad;
    totalMeta += parseInt(meta);

    const porcentaje = (cantidad / meta) * 100;

    resultado.push({
      municipio,
      porcentaje: parseFloat(porcentaje.toFixed(2)),
    });
  });

  const porcentajeTotal = (totalCantidad / totalMeta) * 100;

  resultado.push({
    municipio: "TODOS",
    porcentaje: parseFloat(porcentajeTotal.toFixed(2)),
    totalCantidad,
  });

  return resultado;
}
