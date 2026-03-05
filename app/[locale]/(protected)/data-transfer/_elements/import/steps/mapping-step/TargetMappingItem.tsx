import { Badge, IconButton } from '@/components';
import { cn } from '@/lib/utils';
import { TrashIcon } from '@/root/app/components/icons';
import { useMappingItem } from './useMappingItem';

type TargetMappingItemProps = {
  item: { key: string; required?: boolean };
  isMapped: boolean;
  mappedAlias?: string;
  onUnmap: () => void;
  onMap: (sourceOrder: number, targetKey: string) => void;
};

export const TargetMappingItem = ({ item, isMapped, mappedAlias, onUnmap, onMap }: TargetMappingItemProps) => {
  const { ref } = useMappingItem({
    type: 'target',
    item,
    isMapped,
    onMap,
    onUnmap,
  });

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
      <div className="flex-1 p-3 bg-background/80">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">{item.key}</span>
            {item.required && (
              <Badge variant="outline" className="ml-2 text-xs text-destructive border-destructive/50">
                Required
              </Badge>
            )}
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
            <span className="text-primary font-bold text-xl">↔</span>
          </div>
          <div className="flex-1 p-3 bg-primary/5 text-primary font-medium flex items-center">
            {mappedAlias}
          </div>
        </>
      )}
    </div>
  );
};
