import { Toast } from '@/root/app/components';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { ImportFormValues } from '../../setting/importSettings.type';
import { columnToNumber, extract } from '../range-step/useRangeStepForm';

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
  const tValidateMsg = useTranslations('dataTransfer.import.validate.messages');
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
        title: 'No Data Found',
        description: 'No data found in the selected range.',
      });

    console.log(formValues);
    if (!formValues.rangeStep.rangeStart && !formValues.rangeStep.rangeEnd)
      result.push({
        severity: 'warning',
        step: 'range',
        title: tValidateMsg('rangeAllWarnTitle'),
        description: tValidateMsg('rangeAllWarnDesc'),
      });

    // // 1. Required fields missing mapping
    // formValues?.columns?.forEach((col) => {
    //   if (col.required && !mappings[col.matchingKey]) {
    //     result.push({
    //       severity: 'error',
    //       title: 'Missing Mapping for Required Field',
    //       description: `The required field "${col.matchingKey}" has no mapped source column.`,
    //     });
    //   }
    // });

    // // 2. Range validation
    // if (!rangeStart || !rangeEnd) {
    //   result.push({
    //     severity: 'error',
    //     title: 'No Data Range Selected',
    //     description: 'Please select a valid data range in the previous step.',
    //   });
    // } else {
    //   const startRow = Number(rangeStart.replace(/\D/g, '')) || 1;
    //   const endRow = Number(rangeEnd.replace(/\D/g, '')) || 1;
    //   if (endRow <= startRow) {
    //     result.push({
    //       severity: 'error',
    //       title: 'Invalid Range',
    //       description: 'End row must be greater than start row.',
    //     });
    //   }
    // }

    // // 3. Data in range check (nếu parsedData có)
    // if (parsedData.length > 0 && rangeStart && rangeEnd) {
    // }

    // // 4. Ignored columns count warning nếu quá nhiều
    // const ignoredCount = config?.columns?.filter((c) => c.ignore).length || 0;
    // if (ignoredCount > 5) {
    //   result.push({
    //     severity: 'warning',
    //     title: 'High Number of Ignored Columns',
    //     description: `${ignoredCount} columns are ignored. Ensure this is intentional.`,
    //   });
    // }

    // // 5. Action column if enabled
    // if (includesActionColumn) {
    //   result.push({
    //     severity: 'warning',
    //     title: 'Action Column Enabled',
    //     description: 'The action column is enabled. Ensure this is intentional.',
    //   });
    // }

    return result;
  }, [formValues]);

  const isValid = issues.every((i) => i.severity !== 'error');

  const onSubmit = useCallback(() => {
    if (issues.length > 0) {
      Toast.showError('Please fix the issues before proceeding.');
      return;
    }

    Toast.showSuccess(tGlobalMsg('updateSuccess'));
  }, [formValues, issues]);

  return {
    issues,
    summary,
    isValid,
    onSubmit,
  };
};
