import { useCallback, useState } from 'react';

export const useRangeStep = () => {
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  const handleAutoDetect = useCallback(() => {
    // TODO: logic auto detect based on data
    setRangeStart('A2');
    setRangeEnd('Z100');
  }, []);

  return {
    rangeStart,
    rangeEnd,
    handleAutoDetect,
  };
};
