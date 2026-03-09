import { Badge, IconButton, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';
import { InfoIcon, KeyIcon, Link2Icon, TrashIcon } from '@/icons';
import { cn } from '@/lib/utils';
import { ModuleEnum } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { useMappingItem } from './useMappingItem';

type TargetMappingItemProps = {
  item: { module: ModuleEnum, id: number; key: string, desc?: string, required?: boolean };
  isMapped: boolean;
  mappedAlias?: string;
  onUnmap: () => void;
  onMap: (sourceOrder: number, targetId: number) => void;
};

export const TargetMappingItem = ({ item, isMapped, mappedAlias, onUnmap, onMap }: TargetMappingItemProps) => {
  const tBadge = useTranslations('common.badge');
  const tFields = useTranslations('dataTransfer.fields');
  const { ref } = useMappingItem({
    type: 'target',
    item,
    isMapped,
    onMap,
  });

  const itemLabel = ModuleEnum[item.module]
    ? tFields(`${ModuleEnum[item.module]}.${item.key}`)
    : item.key;
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-stretch gap-0 rounded-lg overflow-hidden border shadow-sm transition-all pointer-events-auto',
        isMapped ? 'border-primary/50 bg-primary/5' : 'border-border bg-muted/20',
        'hover:shadow-md'
      )}
    >
      {/* Target Block */}
      <div className="flex-2 p-3 bg-background/80">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-medium">{itemLabel}</span>
              {item.required && (
                <Badge variant="outline" className="ml-2 text-xs text-destructive border-destructive/50">
                  {tBadge('required')}
                </Badge>
              )}
              {item.desc && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon size={16} className="text-destructive cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {item.desc.split('\n').map((content, index) => <p key={`${content}-${index}`}>{content}</p>)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <KeyIcon size={12} />
              {item.key}
            </span>
          </div>
          {isMapped && (
            <IconButton
              icon={<TrashIcon />}
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive/80"
              onClick={onUnmap}
            />
          )}
        </div>
      </div>

      {isMapped && (
        <>
          <div className="w-10 flex items-center justify-center bg-primary/10 border-l border-r border-primary/30">
            <span className="text-primary font-bold text-xl"><Link2Icon /></span>
          </div>
          <div className="flex-1 p-3 bg-primary/5 text-primary font-medium flex items-center">
            {mappedAlias}
          </div>
        </>
      )}
    </div>
  );
};
