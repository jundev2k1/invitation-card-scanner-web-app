import { useMemo } from "react";
import { ExportColumn, ImportColumn } from "../../../type";

export const useMappedColumns = (columns: (ExportColumn | ImportColumn)[]) => {
  return useMemo(() => {
    const sorted = [...columns].sort((a, b) => a.order - b.order);
    return sorted.map((col, index) => ({
      ...col,
      letter: String.fromCharCode(65 + index),
    }));
  }, [columns]);
};
