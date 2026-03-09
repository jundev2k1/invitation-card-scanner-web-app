import { Button, RefreshButton, ScrollArea } from '@/components';
import { SaveIcon, WandIcon } from "@/icons";
import { ModuleEnum } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MappingStepFormValues } from '../../setting/importSettings.type';
import { SourceMappingItem } from './SourceMappingItem';
import { TargetMappingItem } from './TargetMappingItem';
import { useMappingStep } from './useMappingStep';

type MappingStepProps = {
  selectedModule: ModuleEnum | null;
  formValues: MappingStepFormValues | null;
  onMappingStepChange: (data: MappingStepFormValues) => void,
};

export const MappingStep = ({ selectedModule, formValues, onMappingStepChange }: MappingStepProps) => {
  const tAction = useTranslations('common.actions');
  const tMapping = useTranslations('dataTransfer.import.mapping');
  const {
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
  } = useMappingStep({ module: selectedModule, formValues, onMappingStepChange });
console.log(mappings);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{tMapping('title')}</h3>
            <p className="text-sm text-muted-foreground">{tMapping('desc')}</p>
          </div>
          <div className="flex items-center gap-1">
            <RefreshButton onRefresh={handleClearMatch} disabled={mappings.length === 0} cooldown={3} />
            <Button leftIcon={<WandIcon />} onClick={handleAutoMatch} variant="outline" size="sm">
              {tMapping('autoMatch')}
            </Button>
            <Button leftIcon={<SaveIcon />} size="sm" onClick={handleSubmit}>
              {tAction('save')}
            </Button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-7 gap-6">
          {/* Left: Target Fields (7 phần) */}
          <div className="col-span-5 border rounded-lg overflow-hidden bg-background">
            <div className="bg-muted/50 px-4 py-3 font-medium border-b">
              {tMapping('targetFields')} ({targetFields.length})
            </div>
            <ScrollArea className="h-[calc(100%-44px)] pointer-events-auto">
              <div className="p-4 space-y-3 pointer-events-auto">
                {targetFields.map(field => (
                  <TargetMappingItem
                    key={`t_${field.id}`}
                    item={field}
                    isMapped={mappings.some(m => m.dest === field.id)}
                    mappedAlias={field.key}
                    onUnmap={() => handleUnmap(field.id)}
                    onMap={handleMap}
                  />
                ))}
                {unmappedTargets.length > 0 && (
                  <div className="text-sm text-muted-foreground italic mt-4 pl-4">
                    {unmappedTargets.length} fields chưa ánh xạ
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right: Source Columns */}
          <div className="col-span-2 border rounded-lg overflow-hidden bg-background">
            <div className="bg-muted/50 px-4 py-3 font-medium border-b">
              {tMapping('sourceColumns')} ({sourceColumns.length})
            </div>
            <ScrollArea className="h-[calc(100%-44px)]">
              <div className="p-4 space-y-2">
                {sourceColumns.map(col => (
                  <SourceMappingItem
                    key={`s_${col.order}`}
                    item={{ key: col.field, order: col.order }}
                    isMapped={mappings.some(m => m.src === col.order)}
                    mappedTo={mappings.find(i => i.src === col.order)?.destField}
                    onUnmap={() => {
                      const targetKey = mappings.find(i => i.src === col.order);
                      if (targetKey) handleUnmap(targetKey.dest);
                    }}
                  />
                ))}
                {unmappedSources.length > 0 && (
                  <div className="text-sm text-muted-foreground italic mt-4">
                    {unmappedSources.length} columns chưa ánh xạ
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Mapped: {Object.keys(mappings).length} / {targetFields.length} fields
        </div>
      </div>
    </DndProvider>
  );
};
