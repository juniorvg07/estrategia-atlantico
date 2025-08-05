export function PersonalDpto(datos) {
  const bquilla =
    datos[0].cantidad +
    datos[1].cantidad +
    datos[2].cantidad +
    datos[3].cantidad +
    datos[4].cantidad;

  const soledad = datos[5].cantidad + datos[6].cantidad;

  const puerto = datos[7].cantidad;

  const malambo = datos[8].cantidad;

  const sabana = datos[9].cantidad;

  const Atlantico = [
    {
      municipio: "BARRANQUILLA",
      cantidad: bquilla,
    },
    {
      municipio: "SOLEDAD",
      cantidad: soledad,
    },
    {
      municipio: "PUERTO COLOMBIA",
      cantidad: puerto,
    },
    {
      municipio: "MALAMBO",
      cantidad: malambo,
    },
    {
      municipio: "SABANAGRANDE",
      cantidad: sabana,
    },
  ];

  return Atlantico;
}
