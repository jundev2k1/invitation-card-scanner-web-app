import { IconButton } from '@/components';
import { GripVerticalIcon, TrashIcon } from "@/icons";
import { cn } from '@/lib/utils';
import { useMappingItem } from './useMappingItem';

type SourceMappingItemProps = {
  item: { key: string; order: number };
  isMapped: boolean;
  mappedTo?: string;
  onUnmap: () => void;
};

export const SourceMappingItem = ({ item, isMapped, mappedTo, onUnmap }: SourceMappingItemProps) => {
  const { ref, isDragging } = useMappingItem({
    type: 'source',
    item,
    isMapped,
    onUnmap,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between p-3 rounded-md border transition-all',
        isDragging ? 'opacity-50 scale-105' : '',
        isMapped ? 'bg-primary/10 border-primary/30 opacity-70 cursor-not-allowed' : 'bg-muted/30 border-border hover:bg-primary/5 cursor-grab',
        'hover:shadow-sm'
      )}
    >
      <div className="flex items-center gap-3">
        <GripVerticalIcon className="w-4 h-4 text-muted-foreground" />
        <div>
          <span className="font-medium">{item.key}</span>
        </div>
      </div>

      {isMapped && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            → {mappedTo || 'Unmapped'}
          </span>
          <IconButton icon={<TrashIcon />} variant="ghost" size="icon" onClick={onUnmap} />
        </div>
      )}
    </div>
  );
};
