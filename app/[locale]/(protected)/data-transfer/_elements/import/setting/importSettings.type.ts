import { MappingConfigField, ModuleEnum } from "@/root/config/import-file";

export interface ConfigInfoFormValues {
  name: string;
  description: string;
}

export interface FileTemplateValues {
  columnRow: number;
  name: string | null;
  extension: 'csv' | 'xlsx' | 'xls' | null;
  size: number | null;
  fileData: string[][];
}

export interface RangeStepFormValues {
  rangeStart?: string | null;
  rangeEnd?: string | null;
  autoScaleY?: boolean;
}

export interface MappingStepFormValues {
  configs: readonly MappingConfigField[];
  mappings: { dest: number; src: number }[];
  importFields: { field: string; order: number }[];
}

export interface ImportFormValues {
  module: ModuleEnum | null;
  id?: string | undefined;
  configInfo: ConfigInfoFormValues;
  fileTemplate: FileTemplateValues;
  rangeStep: RangeStepFormValues;
  mappingStep: MappingStepFormValues;
}
