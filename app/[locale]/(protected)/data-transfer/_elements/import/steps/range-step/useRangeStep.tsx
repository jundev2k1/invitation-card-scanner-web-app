import { useCallback, useEffect, useState } from 'react';
import { ImportConfig } from '../../../../type';

type UseRangeStepProps = {
  config: ImportConfig | null;
  parsedData: any[];
};

export const useRangeStep = ({ config, parsedData }: UseRangeStepProps) => {
  const [rangeStart, setRangeStart] = useState<string | null>(config?.leftTopPos || null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(config?.rightBottomPos || null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [includesActionColumn, setIncludesActionColumn] = useState(config?.includesActionColumn || false);

  const toggleActionColumn = useCallback(() => {
    setIncludesActionColumn(prev => !prev);
  }, []);

  const handleMouseDown = useCallback((pos: string) => {
    setRangeStart(pos);
    setIsSelecting(true);
  }, []);

  const handleMouseOver = useCallback((pos: string) => {
    if (isSelecting && rangeStart) {
      setRangeEnd(pos);
    }
  }, [isSelecting, rangeStart]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting) {
      setIsSelecting(false);
      if (rangeStart && rangeEnd) {
        console.log('Range selected:', rangeStart, '→', rangeEnd);
      }
    }
  }, [isSelecting, rangeStart, rangeEnd]);

  // Auto detect range
  const handleAutoDetect = useCallback(() => {
    if (parsedData.length === 0) return;

    const start = 'A2';
    const lastRow = parsedData.length + 1;
    const lastCol = 'Z';
    setRangeStart(start);
    setRangeEnd(`${lastCol}${lastRow}`);
  }, [parsedData]);

  const handleReset = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  useEffect(() => {
    if (config?.leftTopPos) setRangeStart(config.leftTopPos);
    if (config?.rightBottomPos) setRangeEnd(config.rightBottomPos);
  }, [config]);

  return {
    rangeStart,
    rangeEnd,
    setRangeStart,
    setRangeEnd,
    includesActionColumn,
    setIncludesActionColumn,
    toggleActionColumn,
    isSelecting,
    handleMouseDown,
    handleMouseOver,
    handleMouseUp,
    handleAutoDetect,
    handleReset,
  };
};
