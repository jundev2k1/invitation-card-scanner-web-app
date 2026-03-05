import { Button, ScrollArea } from '@/components';
import { WandIcon } from "@/icons";
import { useTranslations } from 'next-intl';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ImportConfig } from '../../../../type';
import { SourceMappingItem } from './SourceMappingItem';
import { TargetMappingItem } from './TargetMappingItem';
import { useMappingStep } from './useMappingStep';

type MappingStepProps = {
  config: ImportConfig | null;
  parsedHeaders: string[];
};

export const MappingStep = ({ config, parsedHeaders }: MappingStepProps) => {
  const t = useTranslations('dataTransfer.import.mapping');
  const {
    sourceColumns,
    targetFields,
    mappings,
    unmappedSources,
    unmappedTargets,
    handleMap,
    handleUnmap,
    handleAutoMatch,
  } = useMappingStep({ config, parsedHeaders });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{t('title')}</h3>
            <p className="text-sm text-muted-foreground">{t('desc')}</p>
          </div>
          <Button leftIcon={<WandIcon />} onClick={handleAutoMatch} variant="outline" size="sm">
            {t('autoMatch')}
          </Button>
        </div>

        <div className="flex-1 grid grid-cols-7 gap-6">
          {/* Left: Target Fields (7 phần) */}
          <div className="col-span-5 border rounded-lg overflow-hidden bg-background">
            <div className="bg-muted/50 px-4 py-3 font-medium border-b">
              {t('targetFields')} ({targetFields.length})
            </div>
            <ScrollArea className="h-[calc(100%-44px)] pointer-events-auto">
              <div className="p-4 space-y-3 pointer-events-auto">
                {targetFields.map((field) => (
                  <TargetMappingItem
                    key={field.key}
                    item={field}
                    isMapped={!!mappings[field.key]}
                    mappedAlias={mappings[field.key]?.alias}
                    onUnmap={() => handleUnmap(field.key)}
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

          {/* Right: Source Columns (3 phần) */}
          <div className="col-span-2 border rounded-lg overflow-hidden bg-background">
            <div className="bg-muted/50 px-4 py-3 font-medium border-b">
              {t('sourceColumns')} ({sourceColumns.length})
            </div>
            <ScrollArea className="h-[calc(100%-44px)]">
              <div className="p-4 space-y-2">
                {sourceColumns.map((col, index) => (
                  <SourceMappingItem
                    key={col}
                    item={{ key: col, order: index + 1 }}
                    isMapped={!!Object.values(mappings).find(m => m.alias === col)}
                    mappedTo={Object.entries(mappings).find(([_, v]) => v.alias === col)?.[0]}
                    onUnmap={() => {
                      const targetKey = Object.entries(mappings).find(([_, v]) => v.alias === col)?.[0];
                      if (targetKey) handleUnmap(targetKey);
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
