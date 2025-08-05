import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const lideresDataTable = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("documento", {
        header: "DOCUMENTO",
      }),
      columnHelper.accessor("nombre", {
        header: "NOMBRE",
      }),
      columnHelper.accessor("apellido", {
        header: "APELLIDO",
      }),
      columnHelper.accessor("municipio", {
        header: "MUNICIPIO",
      }),
      columnHelper.accessor("barrio", {
        header: "BARRIO",
      }),
      columnHelper.accessor("foro", {
        header: "FORO",
      }),
      columnHelper.accessor("puesto_votacion", {
        header: "PUESTO DE VOTACIÓN",
      }),
      columnHelper.accessor("mesa_votacion", {
        header: "MESA DE VOTACIÓN",
      }),
      columnHelper.accessor("created_by", {
        header: "CREADO POR",
      }),
    ],
    []
  );

  return { columns };
};
