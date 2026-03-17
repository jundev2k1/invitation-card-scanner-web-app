import { TranslateFn } from '@/i18n/type';
import type { ImportConfig, MappingConfigField, MappingConfigValidation } from '@/root/config/import-file';
import { getImportConfig } from '../../../setting/useImportSettings';

export type ValidationError = {
  field: string;
  messages: string[];
};

interface ColumnValidationPlan {
  field: string;
  colIndex: number;
  validate?: MappingConfigValidation;
}

const buildValidationPlan = (
  config: ImportConfig,
  fieldConfigs: readonly MappingConfigField[]
) => {
  const fieldMap = new Map<number, MappingConfigField>();
  fieldConfigs.forEach(f => fieldMap.set(f.id, f));

  const plan: Record<number, ColumnValidationPlan> = {};
  const fieldIndexMap: Record<string, number> = {};

  config.mappingStep?.mappings.forEach(m => {

    const fieldConfig = fieldMap.get(m.dest);
    if (!fieldConfig) return;

    plan[m.src] = {
      field: fieldConfig.matchingKey,
      colIndex: m.src,
      validate: fieldConfig.validate
    };

    fieldIndexMap[fieldConfig.matchingKey] = m.src;

  });

  return { plan, fieldIndexMap };
};

/**
 * Validate imported data against the ImportConfig.
 * Uses hard-coded field configs from getImportConfig (no API call).
 * Returns array of errors grouped by field, each with one or more messages.
 */
export const validateImportData = (
  t: TranslateFn,
  data: any[][],
  config: ImportConfig | null
): ValidationError[] => {

  const errors: ValidationError[] = [];
  if (!config?.mappingStep) return errors;

  const fieldConfigs = getImportConfig(config.module);
  const { plan, fieldIndexMap } = buildValidationPlan(config, fieldConfigs);

  const errorMap: Record<string, string[]> = {};
  const uniqueMap: Record<string, Set<any>> = {};

  const pushError = (field: string, message: string) => {
    if (!errorMap[field]) errorMap[field] = [];
    errorMap[field].push(message);
  };

  data.forEach((row, rowIndex) => {

    row.forEach((value, colIndex) => {

      const columnPlan = plan[colIndex];
      if (!columnPlan) return;

      const { field, validate: v } = columnPlan;
      if (!v) return;

      runValidations({
        t,
        field,
        value,
        rowIndex,
        row,
        validate: v,
        pushError,
        uniqueMap,
        fieldIndexMap
      });

    });

  });

  Object.entries(errorMap).forEach(([field, messages]) => {
    errors.push({ field, messages });
  });

  return errors;
};

interface RunValidationParams {
  t: TranslateFn
  field: string
  value: any
  rowIndex: number
  row: any[]
  validate: MappingConfigValidation
  pushError: (field: string, msg: string) => void
  uniqueMap: Record<string, Set<any>>
  fieldIndexMap: Record<string, number>
}

const runValidations = ({
  t,
  field,
  value,
  rowIndex,
  row,
  validate: v,
  pushError,
  uniqueMap,
  fieldIndexMap
}: RunValidationParams) => {

  const rowNum = rowIndex + 1;
  const isEmpty = value === undefined || value === null || value === '';

  if (v.required && isEmpty)
    pushError(field, t('validate.required', { row: rowNum }));

  if (v.insertRequired && isEmpty)
    pushError(field, t('validate.insertRequired', { row: rowNum }));

  if (v.updateRequired && isEmpty)
    pushError(field, t('validate.updateRequired', { row: rowNum }));

  if (v.notEmpty && isEmpty)
    pushError(field, t('validate.notEmpty', { row: rowNum }));

  if (v.nullable === false && value === null)
    pushError(field, t('validate.notNullable', { row: rowNum }));

  if (v.unique && value !== undefined) {

    if (!uniqueMap[field]) uniqueMap[field] = new Set();

    if (uniqueMap[field].has(value))
      pushError(field, t('validate.unique', { row: rowNum }));
    else
      uniqueMap[field].add(value);
  }

  if (v.length !== undefined && value != null && String(value).length !== v.length)
    pushError(field, t('validate.length', { length: v.length, row: rowNum }));

  if (v.minLength !== undefined && value != null && String(value).length < v.minLength)
    pushError(field, t('validate.minLength', { min: v.minLength, row: rowNum }));

  if (v.maxLength !== undefined && value != null && String(value).length > v.maxLength)
    pushError(field, t('validate.maxLength', { max: v.maxLength, row: rowNum }));

  if (v.onlyNumber && value && !/^\d+$/.test(String(value)))
    pushError(field, t('validate.onlyNumber', { row: rowNum }));

  if (v.onlyChar && value && !/^[a-zA-Z]+$/.test(String(value)))
    pushError(field, t('validate.onlyChar', { row: rowNum }));

  if (v.upperCase && value && value !== String(value).toUpperCase())
    pushError(field, t('validate.upperCase', { row: rowNum }));

  if (v.lowerCase && value && value !== String(value).toLowerCase())
    pushError(field, t('validate.lowerCase', { row: rowNum }));

  if (v.CamelCase && value && !/^[A-Z][a-zA-Z]*([A-Z][a-zA-Z]*)*$/.test(value))
    pushError(field, t('validate.camelCase', { row: rowNum }));

  if (v.snakeCase && value && !/^[a-z]+(_[a-z]+)*$/.test(value))
    pushError(field, t('validate.snakeCase', { row: rowNum }));

  if (v.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    pushError(field, t('validate.email', { row: rowNum }));

  if (v.phone && value && !/^(?:\+?84|0)(3|5|7|8|9)\d{8}$/.test(value))
    pushError(field, t('validate.phone', { row: rowNum }));

  if (v.url && value && !/^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(value))
    pushError(field, t('validate.url', { row: rowNum }));

  if (v.json && value) {
    try { JSON.parse(value); }
    catch { pushError(field, t('validate.json', { row: rowNum })); }
  }

  if (v.equalTo !== undefined && value != null && value !== v.equalTo)
    pushError(field, t('validate.equalTo', { value: v.equalTo, row: rowNum }));

  if (v.notEqualTo !== undefined && value != null && value === v.notEqualTo)
    pushError(field, t('validate.notEqualTo', { value: v.notEqualTo, row: rowNum }));

  if (v.greaterThan !== undefined && value != null && Number(value) <= v.greaterThan)
    pushError(field, t('validate.greaterThan', { value: v.greaterThan, row: rowNum }));

  if (v.greaterThanOrEqual !== undefined && value != null && Number(value) < v.greaterThanOrEqual)
    pushError(field, t('validate.greaterThanOrEqual', { value: v.greaterThanOrEqual, row: rowNum }));

  if (v.lessThan !== undefined && value != null && Number(value) >= v.lessThan)
    pushError(field, t('validate.lessThan', { value: v.lessThan, row: rowNum }));

  if (v.lessThanOrEqual !== undefined && value != null && Number(value) > v.lessThanOrEqual)
    pushError(field, t('validate.lessThanOrEqual', { value: v.lessThanOrEqual, row: rowNum }));

  if (v.regex && value) {
    const regex = new RegExp(v.regex.pattern);
    if (!regex.test(value))
      pushError(field, v.regex.message || t('validate.regex', { row: rowNum }));
  }

  if (v.refer && value) {
    const refColIndex = fieldIndexMap[v.refer.key];
    if (refColIndex !== undefined) {
      const refVal = row[refColIndex];
      if (!v.refer.validator(value, refVal)) {
        pushError(field, v.refer.messageFn(t, value, rowNum));
      }
    }
  }
};
