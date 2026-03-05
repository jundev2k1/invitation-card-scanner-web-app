import { useCallback, useMemo, useState } from 'react';
import { columnConfigs, ImportConfig, ModuleEnum } from '../../../../type';

type UseMappingStepProps = {
  config: ImportConfig | null;
  parsedHeaders: string[];
};

export const useMappingStep = ({ config, parsedHeaders }: UseMappingStepProps) => {
  const module = config?.module ?? ModuleEnum.EVENTS;

  const targetFields = useMemo(() => {
    const configs = columnConfigs[module] || [];
    return configs.map((c) => ({
      key: c.key as string,
      required: c.required || false,
    }));
  }, [module]);

  const sourceColumns = useMemo(() => parsedHeaders, [parsedHeaders]);

  const [mappings, setMappings] = useState<Record<string, { order: number; alias: string }>>({});

  const handleMap = useCallback((sourceOrder: number, targetKey: string) => {
    const alias = sourceColumns[sourceOrder - 1] || '';
    setMappings((prev) => ({
      ...prev,
      [targetKey]: { order: sourceOrder, alias },
    }));
  }, [sourceColumns]);

  const handleUnmap = useCallback((targetKey: string) => {
    setMappings((prev) => {
      const newMap = { ...prev };
      delete newMap[targetKey];
      return newMap;
    });
  }, []);

  const handleAutoMatch = useCallback(() => {
    const newMappings: Record<string, { order: number; alias: string }> = {};
    targetFields.forEach((target) => {
      const lowerTarget = target.key.toLowerCase();
      const matchIndex = sourceColumns.findIndex(
        (src) => src.toLowerCase().includes(lowerTarget) || lowerTarget.includes(src.toLowerCase())
      );
      if (matchIndex !== -1) {
        newMappings[target.key] = { order: matchIndex + 1, alias: sourceColumns[matchIndex] };
      }
    });
    setMappings(newMappings);
  }, [sourceColumns, targetFields]);

  const unmappedSources = useMemo(() => 
    sourceColumns.filter(src => !Object.values(mappings).some(m => m.alias === src)),
  [sourceColumns, mappings]);

  const unmappedTargets = useMemo(() => 
    targetFields.filter(t => !mappings[t.key]),
  [targetFields, mappings]);

  return {
    sourceColumns,
    targetFields,
    mappings,
    unmappedSources,
    unmappedTargets,
    handleMap,
    handleUnmap,
    handleAutoMatch,
  };
};
