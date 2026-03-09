import { Toast } from '@/root/app/components';
import { ModuleEnum } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { ImportFormValues } from '../../setting/importSettings.type';
import { columnToNumber, createRangeSchema, extract } from '../range-step/useRangeStepForm';

type ValidationIssue = {
  severity: 'error' | 'warning';
  step: 'mapping' | 'range';
  title: string;
  description: string;
};

type UseValidateStepProps = {
  formValues: ImportFormValues;
};

export const useValidateStep = ({ formValues }: UseValidateStepProps) => {
  const tGlobalMsg = useTranslations('common.messages');
  const tRange = useTranslations('dataTransfer.import.range');
  const tImportFields = useTranslations(`dataTransfer.fields.${ModuleEnum[formValues.module!]}`);
  const tValidateMsg = useTranslations('dataTransfer.import.validate.messages');
  const tGlobalValidate = useTranslations('validate');
  const colStart = formValues.rangeStep.rangeStart ? extract(formValues.rangeStep.rangeStart)?.c || 'A' : 'A';
  const colEnd = formValues.rangeStep.rangeEnd ? extract(formValues.rangeStep.rangeEnd)?.c || 'Z' : 'Z';
  const colStartOrder = columnToNumber(colStart);
  const colEndOrder = columnToNumber(colEnd);

  const summary = useMemo(() => ({
    rowCount: formValues.mappingStep.mappings.filter(m => m.src >= colStartOrder && m.src <= colEndOrder).length || 0,
    ignoredColumns: formValues.mappingStep.importFields.filter(f => !formValues.mappingStep.mappings.some(m => m.src === f.order)).length || 0,
    mappedFields: formValues.mappingStep.mappings.length,
    totalTargets: formValues.mappingStep.configs.length || 0,
  }), [formValues]);

  const issues: ValidationIssue[] = useMemo(() => {
    const result: ValidationIssue[] = [];

    if (summary.rowCount === 0)
      result.push({
        severity: 'error',
        step: 'mapping',
        title: tValidateMsg('noMappingTitle'),
        description: tValidateMsg('noMappingDesc'),
      });

    if (!formValues.rangeStep.rangeStart && !formValues.rangeStep.rangeEnd)
      result.push({
        severity: 'warning',
        step: 'range',
        title: tValidateMsg('rangeAllWarnTitle'),
        description: tValidateMsg('rangeAllWarnDesc'),
      });

    // Check data range step
    const rangeResult = createRangeSchema(tValidateMsg).safeParse(formValues.rangeStep);
    if (!rangeResult.success && rangeResult.error.issues) {
      result.push({
        severity: 'error',
        step: 'range',
        title: tValidateMsg('rangeValidationFailed'),
        description: rangeResult.error.issues.map(i => `{ ${tRange(i.path.toString())} } - ${i.message}`).join('\n'),
      });
    }

    // Check mapping step
    const requiredFields = formValues.mappingStep.configs
      .filter(c => c.validate
        && c.validate.required === true
        && !formValues.mappingStep.mappings.some(m => c.id === m.dest))
      .map(c => c.matchingKey);
    if (requiredFields.length > 0) {
      result.push({
        severity: 'error',
        step: 'range',
        title: tValidateMsg('mappingValidationFailed'),
        description: requiredFields.map(key => `{ ${tImportFields(key)} } - ${tGlobalValidate('common.required')}`).join('\n'),
      });
    }

    return result.sort((a, b) => a.severity === b.severity
      ? 0
      : a.severity === 'error' ? -1 : 1);
  }, [formValues]);

  const isValid = issues.every((i) => i.severity !== 'error');

  const onSubmit = useCallback(() => {
    // Show error to fix
    if (issues.filter(i => i.severity === 'error').length > 0) {
      Toast.showError('Please fix the issues before proceeding.');
      return;
    }

    // Show warning to re-confirm
    if (issues.filter(i => i.severity === 'warning').length > 0
      && !confirm(tValidateMsg('proceedWithWarning'))
    ) return;

    Toast.showSuccess(tGlobalMsg('updateSuccess'));
  }, [formValues, issues]);

  return {
    issues,
    summary,
    isValid,
    onSubmit,
  };
};
