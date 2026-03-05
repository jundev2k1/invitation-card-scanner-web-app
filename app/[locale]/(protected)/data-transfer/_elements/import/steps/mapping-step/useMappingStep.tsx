import { useState } from 'react';

export const useMappingStep = () => {
  const [mappings, setMappings] = useState<Record<string, string>>({});

  const autoMatch = () => {
    console.log('Auto-matching...');
  };

  return {
    mappings,
    autoMatch,
  };
};
