import { ImportConfig } from "@/root/config/import-file";
import { ExportConfig } from "../../type";

export type SelectModuleChangeFn = (
  setting: ImportConfig | ExportConfig | null
) => void;
