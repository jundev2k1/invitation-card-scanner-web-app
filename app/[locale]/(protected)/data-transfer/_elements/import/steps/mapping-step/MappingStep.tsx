import { Alert, Button, RefreshButton, ScrollArea } from '@/components';
import { InfoIcon, SaveIcon, WandIcon } from "@/icons";
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
  onMappingStepChange: (data: MappingStepFormValues) => void;
  noConfigSelected?: boolean;
};

export const MappingStep = ({
  selectedModule,
  formValues,
  onMappingStepChange,
  noConfigSelected,
}: MappingStepProps) => {
  const tPlaceholder = useTranslations('dataTransfer.placeholder');
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

  if (noConfigSelected) return (
    <div className="h-full flex flex-col space-y-6 p-6">
      <Alert
        title={tPlaceholder('noConfigSelectedTitle')}
        variant="destructive"
        icon={<InfoIcon />}
      >
        {tPlaceholder('noConfigSelectedDesc')}
      </Alert>
    </div>
  );

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
                    {tMapping('unmappedColumn', { count: unmappedTargets.length })}
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
                    {tMapping('unmappedColumn', { count: unmappedSources.length })}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {tMapping('mapped')}: {Object.keys(mappings).length} / {targetFields.length} {tMapping('fields')}
        </div>

        {/* Helpful instruction block */}
        <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <div className="space-y-2">
              <p className="font-medium text-blue-800 dark:text-blue-300">
                {tMapping('howTo.title')}
              </p>
              <ul className="text-muted-foreground space-y-1.5 list-disc pl-5 text-sm">
                <li>{tMapping('howTo.items.display')}</li>
                <li>{tMapping('howTo.items.interaction')}</li>
                <li>{tMapping('howTo.items.autoMatch')}</li>
                <li>{tMapping('howTo.items.warning')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
