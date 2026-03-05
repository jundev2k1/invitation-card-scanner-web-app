import { useMemo } from "react";
import { ExportColumn, ImportColumn } from "../../../type";

export const useMappedColumns = (columns: (ExportColumn | ImportColumn)[]) => {
  return useMemo(() => {
    if (!columns?.length) return [];

    return [...columns]
      .sort((a, b) => a.order - b.order)
      .map((col, index) => ({
        ...col,
        letter: String.fromCharCode(65 + index),
      }));
  }, [columns]);
};
