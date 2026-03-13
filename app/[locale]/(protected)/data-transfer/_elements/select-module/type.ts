import { ImportConfig } from "@/root/config/import-file";
import { ExportConfig } from "../export/setting/exportSettings.type";

export type SelectModuleChangeFn = (
  setting: ImportConfig | ExportConfig | null
) => void;
