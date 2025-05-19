import { useState } from 'react';

const datosSimulados = [
  { tipoDocumento: "Cédula de ciudadanía", numero: 106796, nombre: "Katrina Colorado", rol: "Referido" },
  { tipoDocumento: "Cédula de ciudadanía", numero: 1140844, nombre: "Junior Vasquez", rol: "Líder" },
  { tipoDocumento: "Cédula de extranjería", numero: 32640, nombre: "Chama Zolana", rol: "Cuidador" }
];

export default function ListadoReferidosConFiltro() {
  const [filtroDocumento, setFiltroDocumento] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroNumero, setFiltroNumero] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');

  const datosFiltrados = datosSimulados.filter(item => {
    const cumpleDocumento = filtroDocumento === '' || item.tipoDocumento === filtroDocumento;
    const cumpleRol = filtroRol === '' || item.rol === filtroRol;
    const cumpleNumero = filtroNumero === '' || item.numero.toString().includes(filtroNumero);
    const cumpleNombre = filtroNombre === '' || item.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    return cumpleDocumento && cumpleRol && cumpleNumero && cumpleNombre;
  });

  const limpiarFiltros = () => {
    setFiltroDocumento('');
    setFiltroRol('');
    setFiltroNumero('');
    setFiltroNombre('');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Listado de referidos</h1>

      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={filtroDocumento}
            onChange={(e) => setFiltroDocumento(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Todos los documentos</option>
            <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
            <option value="Cédula de extranjería">Cédula de extranjería</option>
          </select>

          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Todos los roles</option>
            <option value="Referido">Referido</option>
            <option value="Líder">Líder</option>
            <option value="Cuidador">Cuidador</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="Buscar por número"
            value={filtroNumero}
            onChange={(e) => setFiltroNumero(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        <button onClick={limpiarFiltros} className="bg-gray-200 px-4 py-2 rounded self-start sm:self-auto">
          Limpiar filtros
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Tipo de documento</th>
              <th className="border px-4 py-2">Número</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{item.tipoDocumento}</td>
                <td className="border px-4 py-2">{item.numero}</td>
                <td className="border px-4 py-2">{item.nombre}</td>
                <td className="border px-4 py-2">{item.rol}</td>
              </tr>
            ))}
            {datosFiltrados.length === 0 && (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
                  No hay datos que coincidan con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
