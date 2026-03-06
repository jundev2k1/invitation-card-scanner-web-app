import { ModuleEnum } from "../../../type";

export interface FieldIform {
  field: string;
  order: number;
}

export interface FileTemplateValues {
  fileName: string;
  fileType: 'csv' | 'xlsx' | 'xls';
  fileTemplates: string[][];
}

export interface RangeStepFormValues {
  errorMessage: string;
  errorDetails: string[];

  rangeStart?: string | null;
  rangeEnd?: string | null;
  autoScaleY?: boolean;
}

export interface MappingStepFormValues {
  errorMessage: string;
  errorDetails: string[];

  importCount: number;
  ignoreCount: number;
  mappedCount: number;
  mappings: Record<string, { source: string; ignore?: boolean }>;
  importFields: FieldIform[];
}

export interface ImportFormValues {
  module?: ModuleEnum;
  id?: string | undefined;
  name?: string;
  description?: string;

  fileTemplates: FileTemplateValues;
  rangeStep: RangeStepFormValues;
  mappingStep: MappingStepFormValues;
}
