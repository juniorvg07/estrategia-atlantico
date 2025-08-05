export const dataTransform = (personas) => {
  const mapa = new Map();

  // Crear nodos con atributos personalizados
  personas.forEach((persona) => {
    mapa.set(persona.documento, {
      name: persona.nombre,
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

  return raiz;
};
