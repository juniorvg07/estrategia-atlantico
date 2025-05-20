import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const ExportButton = ({ id, data, columns, rol }) => {
  const exportToXLSX = () => {
    // Crear los encabezados personalizados
    const headers = columns.map((col) => col.name);

    // Crear las filas según los selectores de columna
    const rows = data.map((row) => {
      return columns.map((col) => {
        // col.selector puede ser una función
        if (typeof col.selector === "function") {
          return col.selector(row);
        }
        return row[col.selector];
      });
    });

    // Combinar encabezados y filas
    const worksheetData = [headers, ...rows];

    // Crear hoja y libro
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, `${rol}.xlsx`);
  };

  return (
    <button id={id} onClick={exportToXLSX}>
      <span className="material-symbols-outlined">download</span>
      Descargar
    </button>
  );
};
