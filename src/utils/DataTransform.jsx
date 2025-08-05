export function dataTransform(personas, nombreRaiz, rolRaiz) {
  const mapa = new Map();

  // Crear nodos base
  personas.forEach((persona) => {
    mapa.set(persona.documento, {
      name: persona.nombre + " " + persona.apellido,
      attributes: { rol: persona.rol },
      children: [],
    });
  });

  const raiz = [];

  personas.forEach((persona) => {
    if (persona.rol === "Referido" && persona.datosLider) {
      const liderDoc = persona.datosLider.documento;
      const lider = mapa.get(liderDoc);
      if (lider) {
        lider.children.push(mapa.get(persona.documento));
      }
    } else if (persona.rol === "Líder") {
      raiz.push(mapa.get(persona.documento));
    }
  });

  // Devuelve un único objeto raíz que engloba a todos los líderes
  return [
    {
      name: nombreRaiz,
      attributes: { rol: rolRaiz },
      children: raiz,
    },
  ];
}
