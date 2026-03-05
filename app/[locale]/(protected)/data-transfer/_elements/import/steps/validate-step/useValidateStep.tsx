import { useMemo } from 'react';

export const useValidateStep = () => {
  // Placeholder issues
  const issues = useMemo(() => [], []);

  return { issues };
};
