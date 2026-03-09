import { Toast } from '@/root/app/components';
import { ModuleEnum } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { MappingStepFormValues } from '../../setting/importSettings.type';

interface MappingItem {
  dest: number;
  destField: string;
  src: number;
  srcField: string;
}

type UseMappingStepProps = {
  module: ModuleEnum | null;
  formValues: MappingStepFormValues | null;
  onMappingStepChange: (data: MappingStepFormValues) => void,
};

export const useMappingStep = ({ module, formValues, onMappingStepChange }: UseMappingStepProps) => {
  const tMessages = useTranslations('common.messages');
  const targetFields = useMemo(() => {
    if (!module || !formValues) return [];

    return formValues.configs.map((c) => ({
      module: module,
      id: c.id,
      key: c.matchingKey,
      desc: c.desc,
      required: c.validate?.required || false,
    }));
  }, [module, formValues]);

  const sourceColumns = useMemo(() => {
    return formValues?.importFields ?? [];
  }, [formValues]);

  const [mappings, setMappings] = useState<MappingItem[]>(formValues?.mappings.map(m => {
    const target = targetFields.find((i) => i.id === m.dest);
    const source = sourceColumns.find((i) => i.order === m.src);
    return {
      src: m.src,
      srcField: source?.field ?? '',
      dest: m.dest,
      destField: target?.key ?? '',
    };
  }) ?? []);

  const handleMap = useCallback((sourceOrder: number, targetId: number) => {
    const target = targetFields.find((i) => i.id === targetId);
    const source = sourceColumns.find((i) => i.order === sourceOrder);
    setMappings((prev) => ([
      ...prev,
      {
        src: sourceOrder,
        srcField: source?.field ?? '',
        dest: targetId,
        destField: target?.key ?? ''
      },
    ]));
  }, [sourceColumns]);

  const handleUnmap = useCallback((targetId: number) => {
    setMappings((prev) => [...prev.filter(i => i.dest !== targetId)]);
  }, []);

  const handleAutoMatch = useCallback(() => {
    const newMappings: MappingItem[] = [];
    targetFields.forEach((target) => {
      const lowerTarget = target.key.toLowerCase();
      const matchItem = sourceColumns.find(
        (src) => !newMappings.some(m => m.src === src.order)
          && (src.field.toLowerCase().includes(lowerTarget)
            || lowerTarget.includes(src.field.toLowerCase()))
      );
      if (matchItem) {
        const targetItem = targetFields.find((i) => i.id === target.id);
        newMappings.push({
          src: matchItem.order,
          srcField: matchItem?.field ?? '',
          dest: target.id,
          destField: targetItem?.key ?? ''
        });
      }
    });
    setMappings(newMappings);
    onMappingStepChange({
      ...formValues,
      configs: formValues?.configs || [],
      mappings: newMappings,
      importFields: formValues?.importFields || [],
    });
  }, [sourceColumns, targetFields]);

  const handleClearMatch = useCallback(() => {
    setMappings([]);
  }, [sourceColumns, targetFields, mappings]);

  const handleSubmit = useCallback(() => {
    onMappingStepChange({
      ...formValues,
      configs: formValues?.configs || [],
      mappings,
      importFields: formValues?.importFields || [],
    });
    Toast.showSuccess(tMessages('updateSuccess'));
  }, [sourceColumns, targetFields, mappings]);

  const unmappedSources = useMemo(() =>
    sourceColumns.filter(src => !mappings.some(m => m.src === src.order)),
    [sourceColumns, mappings]);

  const unmappedTargets = useMemo(() =>
    targetFields.filter(t => !mappings[t.id]),
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
    handleClearMatch,
    handleSubmit,
  };
};
