import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import "../../styles/Tables.css";

export const Table = ({ data, columns, handleModal }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="tabla-container">
      <table className="tabla-estilo">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="fila-encabezado">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="celda-encabezado">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`fila-datos ${row.index % 2 === 0 ? "par" : "impar"}`}
              onDoubleClick={() => handleModal(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="celda-dato">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="fila-vacia">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
