import { TranslateFn } from "@/i18n/type";

export enum ModuleEnum {
  EVENT_CATEGORIES = 0,
  EVENTS = 1,
  EVENT_CARDS = 2,
  USERS = 3,
}

export enum DataType {
  GUID = "guid",
  STRING = "string",
  NUMBER = "number",
  BOOL = "bool",
  DATE = "date",
  EMAIL = "email",
  PHONE = "phone",
  OPTIONS = "option",
}

export interface MappingConfigValidation {
  required?: boolean;
  insertRequired?: boolean;
  updateRequired?: boolean;
  unique?: boolean;
  length?: number;
  nullable?: boolean;
  notEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  onlyNumber?: boolean;
  onlyChar?: boolean;
  upperCase?: boolean;
  lowerCase?: boolean;
  CamelCase?: boolean;
  snakeCase?: boolean;
  json?: boolean;
  url?: boolean;
  email?: boolean;
  phone?: boolean;
  equalTo?: string | number;
  notEqualTo?: string | number;
  greaterThan?: number;
  greaterThanOrEqual?: number;
  lessThan?: number;
  lessThanOrEqual?: number;
  regex?: { pattern: string, message: string };
  refer?: { key: string, validator: <TVal, TRefVal>(value: TVal, refVal: TRefVal) => boolean, messageFn: (t: TranslateFn, value?: any) => string };
  insertIgnore?: boolean;
  updateIgnore?: boolean;
}

export interface MappingConfigField {
  id: number;
  matchingKey: string;
  type: DataType;
  options?: { label: string; value: string }[];
  desc?: string;
  validate?: MappingConfigValidation;
}

export interface ImportInfo {
  name: string;
  description: string;
}

export interface ImportRange {
  rangeStart?: string | null;
  rangeEnd?: string | null;
  autoScaleY: boolean;
}

export interface ImportFileTemplate {
  name?: string | null;
  extension?: 'csv' | 'xlsx' | 'xls' | null;
  size: number | null;
  data: string[][];
}

export interface ImportMapping {
  mappings: { dest: number; src: number }[];
  importFields: { field: string; order: number }[];
}

export interface ImportConfig {
  module: ModuleEnum | null;
  id: string | undefined;
  configInfo: ImportInfo;
  uploadStep: ImportFileTemplate | null;
  rangeStep: ImportRange | null;
  mappingStep: ImportMapping | null;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
