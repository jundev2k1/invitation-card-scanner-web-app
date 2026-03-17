import { useCallback, useState } from 'react';

export const useImportProgress = () => {
  const [progress, setProgress] = useState(0);

  const simulateProgress = useCallback(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return { progress, setProgress, simulateProgress };
};
