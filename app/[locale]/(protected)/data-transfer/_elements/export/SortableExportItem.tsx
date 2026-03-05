import { Button, TextBox } from "@/components";
import { GripVerticalIcon, TrashIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ExportColumn } from "../../type";

interface SortableExportItemProps {
  column: ExportColumn;
  onEditAlias: (id: string, alias: string) => void;
  onRemove: (id: string) => void;
}

export function SortableExportItem({ column, onEditAlias, onRemove }: SortableExportItemProps) {
  const t = useTranslations('dataTransfer');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>(column.alias || '');
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
  });

  useEffect(() => {
    setAlias(column.alias || '');
  }, [column]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onEditMode = () => {
    setIsEditing(true);
  };

  const onSave = (input: string) => {
    if (column.alias !== alias)
      onEditAlias(column.id, input.trim());

    setAlias(input.trim());
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVerticalIcon className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1">
        <div className="font-medium">{column.matchingKey}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {t('export.aliasLabel')}:
          </span>
          {!isEditing ? (
            <span onClick={onEditMode} className={cn("cursor-pointer", !alias && 'italic text-xs')}>
              {alias || `(${t('export.noSetAlias')})`}
            </span>
          ) : (
            <TextBox
              className="w-2/3 text-xs"
              value={alias}
              autoFocus
              onChange={(e) => setAlias(e.currentTarget.value)}
              onBlur={(e) => onSave(e.currentTarget.value)}
            />
          )}
        </div>
      </div>

      <Button
        leftIcon={<TrashIcon className="h-4 w-4" />}
        variant="ghost"
        size="icon"
        onClick={() => onRemove(column.id)}
      />
    </div >
  );
}
