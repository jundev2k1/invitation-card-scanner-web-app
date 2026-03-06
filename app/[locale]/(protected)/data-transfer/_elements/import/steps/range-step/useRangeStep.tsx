import { useCallback, useEffect, useState } from 'react';
import { ImportConfig } from '../../../../type';
import { useRangeStepForm } from './useRangeStepForm';

type UseRangeStepProps = {
  config: ImportConfig | null;
  parsedData: any[][];
  onRangeChange?: (start: string | null, end: string | null) => void;
};

export const useRangeStep = ({ config, parsedData, onRangeChange }: UseRangeStepProps) => {
  const [rangeStart, setRangeStart] = useState<string | null>(config?.range?.rangeStart || null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(config?.range?.rangeEnd || null);
  const [autoScaleY, setAutoScaleY] = useState<boolean>(config?.range?.autoScaleY || false);
  const { form, onFormSubmit } = useRangeStepForm({
    start: rangeStart,
    end: rangeEnd,
    onStartChange: setRangeStart,
    onEndChange: setRangeEnd,
    autoScaleYState: autoScaleY,
    onAutoScaleYChange: setAutoScaleY,
  });

  useEffect(() => {
    onRangeChange?.(rangeStart, rangeEnd);
  }, [rangeStart, rangeEnd, onRangeChange]);

  const onRangePreviewChange = useCallback((start: string | null, end: string | null) => {
    setRangeStart(start);
    setRangeEnd(end);
  }, [rangeStart, rangeEnd]);

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

    setRangeStart(`${String.fromCharCode(colStart + 65)}${rowStart}`);
    setRangeEnd(`${String.fromCharCode(lastCol + 65)}${lastRow}`);
  }, [parsedData]);

  useEffect(() => {
    if (config?.range?.rangeStart) setRangeStart(config.range.rangeStart);
    if (config?.range?.rangeEnd) setRangeEnd(config.range.rangeEnd);
  }, [config]);

  return {
    form,
    onFormSubmit,
    rangeStart,
    rangeEnd,
    autoScaleY,
    setAutoScaleY,
    onRangePreviewChange,
    handleAutoDetect,
    onRangeReset: () => onRangePreviewChange(null, null),
  };
};
