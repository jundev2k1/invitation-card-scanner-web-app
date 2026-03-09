import { useCallback } from 'react';
import { RangeStepFormValues } from '../../setting/importSettings.type';
import { useRangeStepForm } from './useRangeStepForm';

type UseRangeStepProps = {
  rangeStepForm: RangeStepFormValues;
  parsedData: any[][];
  onRangeFormChange: (data: RangeStepFormValues) => void;
};

export const useRangeStep = ({ rangeStepForm, parsedData, onRangeFormChange }: UseRangeStepProps) => {
  const { form, onFormSubmit } = useRangeStepForm({ rangeStepForm, onRangeFormChange });

  const onRangePreviewChange = useCallback((start: string | null, end: string | null) => {
    form.setValue('rangeStart', start);
    form.setValue('rangeEnd', end);
    form.trigger(['autoScaleY', 'rangeStart', 'rangeEnd']);
  }, []);

  // Auto detect range
  const handleAutoDetect = useCallback(() => {
    if (parsedData.length === 0) return;

    const rowLength = parsedData?.[0].length || 0;
    let colStart = parsedData.length;
    let rowStart = rowLength - 1;
    let lastRow = parsedData.length;
    let lastCol = rowStart;
    parsedData.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (!cell?.toString().trim()) return;

        colStart = Math.min(colStart, cIndex) || 0;
        rowStart = Math.min(rowStart, rIndex) || 1;
      });
    });

    if (lastRow === parsedData.length) {
      form.setValue('rangeStart', `${String.fromCharCode(colStart + 65)}${rowStart}`);
      form.setValue('rangeEnd', `${String.fromCharCode(lastCol + 65)}${lastRow}`);
    } else {
      form.setValue('rangeStart', `${String.fromCharCode(colStart + 65)}${rowStart}`);
      form.setValue('rangeEnd', `${String.fromCharCode(lastCol + 65)}${rowStart}`);
      form.setValue('autoScaleY', true);
    }
    form.trigger(['autoScaleY', 'rangeStart', 'rangeEnd']);
  }, [parsedData]);

  const onAutoScaleYChange = useCallback((autoScaleY: boolean) => {
    form.setValue('autoScaleY', autoScaleY);
    form.trigger(['autoScaleY', 'rangeStart', 'rangeEnd']);
  }, []);

  return {
    form,
    onFormSubmit,
    rangeStart: form.getValues('rangeStart'),
    rangeEnd: form.getValues('rangeEnd'),
    autoScaleY: form.getValues('autoScaleY'),
    onAutoScaleYChange,
    onRangePreviewChange,
    handleAutoDetect,
    onRangeReset: () => onRangePreviewChange(null, null),
  };
};
