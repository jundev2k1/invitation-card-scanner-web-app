import { ImportConfig } from "@/root/config/import-file";
import { useMemo } from "react";
import { ExportConfig } from "../../../type";

interface ImportColumn {
  letter: string;
}

export const useMappedColumns = (config: ExportConfig | ImportConfig | null, type: "import" | "export") => {
  return useMemo(() => {
    if (type == "import") {
      if (!!(config as ImportConfig).mappingStep?.importFields) {
        const { mappingStep } = config as ImportConfig;
        return [...mappingStep!.importFields].map((col, index) => ({
          ...col,
          letter: String.fromCharCode(65 + index),
        }));
      }
      return [];
    } else {
      const { columns } = config as ExportConfig;
      if (!columns?.length) return [];

      return [...columns]
        .map((col, index) => ({
          ...col,
          letter: String.fromCharCode(65 + index),
        }));
    }
  }, [config]);
};
