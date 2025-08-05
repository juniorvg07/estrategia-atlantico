import { MetasAtl } from "../utils/metas";

export function CantidadForo(cantidadForo, rol) {
  const resultado = [];

  let totalCantidad = 0;
  let totalMeta = 0;

  cantidadForo.forEach(({ foro, cantidad }) => {
    const metaObj = MetasAtl.find((m) => m.foro === foro);
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
      foro,
      porcentaje: parseFloat(porcentaje.toFixed(2)),
    });
  });

  const porcentajeTotal = (totalCantidad / totalMeta) * 100;

  resultado.push({
    foro: "TODOS",
    porcentaje: parseFloat(porcentajeTotal.toFixed(2)),
    totalCantidad,
  });

  return resultado;
}
