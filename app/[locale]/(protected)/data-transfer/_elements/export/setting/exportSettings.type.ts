import { ExportFieldType } from "@/root/config/export-file";
import { ModuleEnum } from "@/root/config/import-file";

export interface ExportConfig {
  module: ModuleEnum;
  id: string;
  name: string;
  description?: string;
  includesActionColumn?: boolean;
  columns: ExportColumn[];
}

export interface ExportColumn {
  matchingKey: string;
  alias?: string;
  format?: ExportFieldType;
  order: number;
}

export interface ExportFormValues {
  module: ModuleEnum;
  name: string;
  description?: string;
  includesActionColumn?: boolean;
  columns: ExportFields[];
}

export interface ExportFields {
  id: string;
  matchingKey: string;
  alias?: string;
  order: number;
  format?: ExportFieldType;
  allowedFormat: ExportFieldType[];
}
