import { IconButton, Select, TextBox } from "@/components";
import { TranslateFn } from "@/i18n/type";
import {
  BarcodeIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  CircleDollarSignIcon,
  ClockIcon,
  GripVerticalIcon,
  HashIcon,
  ImageIcon,
  PercentIcon,
  QrCodeIcon,
  TextInitialIcon,
  TrashIcon
} from "@/icons";
import { cn } from "@/lib/utils";
import { ExportFieldType } from "@/root/config/export-file";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { ExportFields } from "./setting/exportSettings.type";

interface SortableExportItemProps {
  column: ExportFields;
  onFormatChange: (id: string, format: ExportFieldType) => void;
  onEditAlias: (id: string, alias: string) => void;
  onRemove: (id: string) => void;
}

const getFormatLabel = (tExport: TranslateFn, format: ExportFieldType) => {
  switch (format) {
    case ExportFieldType.TEXT:
      return <span className="flex items-center gap-1">
        <TextInitialIcon className="w-4 h-4" />
        {tExport('export.types.text')}
      </span>;

    case ExportFieldType.NUMBER:
      return <span className="flex items-center gap-1">
        <HashIcon className="w-4 h-4" />
        {tExport('export.types.number')}
      </span>;

    case ExportFieldType.PERCENT:
      return <span className="flex items-center gap-1">
        <PercentIcon className="w-4 h-4" />
        {tExport('export.types.percent')}
      </span>;

    case ExportFieldType.CURRENCY:
      return <span className="flex items-center gap-1">
        <CircleDollarSignIcon className="w-4 h-4" />
        {tExport('export.types.number')}
      </span>;

    case ExportFieldType.DATETIME:
      return <span className="flex items-center gap-1">
        <CalendarClockIcon className="w-4 h-4" />
        {tExport('export.types.dateTime')}
      </span>;

    case ExportFieldType.DATE:
      return <span className="flex items-center gap-1">
        <CalendarDaysIcon className="w-4 h-4" />
        {tExport('export.types.date')}
      </span>;

    case ExportFieldType.TIME:
      return <span className="flex items-center gap-1">
        <ClockIcon className="w-4 h-4" />
        {tExport('export.types.time')}
      </span>;

    case ExportFieldType.BARCODE:
      return <span className="flex items-center gap-1">
        <BarcodeIcon className="w-4 h-4" />
        {tExport('export.types.qrCode')}
      </span>;

    case ExportFieldType.QR:
      return <span className="flex items-center gap-1">
        <QrCodeIcon className="w-4 h-4" />
        {tExport('export.types.qrCode')}
      </span>;

    case ExportFieldType.IMAGE:
      return <span className="flex items-center gap-1">
        <ImageIcon className="w-4 h-4" />
        {tExport('export.types.image')}
      </span>;

    default:
      return <span className="flex items-center gap-1">
        <TextInitialIcon className="w-4 h-4" />
        {tExport('export.types.text')}
      </span>;
  }
}

export function SortableExportItem({ column, onFormatChange, onEditAlias, onRemove }: SortableExportItemProps) {
  const tTransfer = useTranslations('dataTransfer');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>(column.alias || '');
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: column.id });

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

  const formatOptions = useMemo(() => {
    return column.allowedFormat.map((f) => ({
      label: getFormatLabel(tTransfer, f),
      value: f,
    }));
  }, [column.matchingKey]);

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
            {tTransfer('export.aliasLabel')}:
          </span>
          {!isEditing ? (
            <span onClick={onEditMode} className={cn("cursor-pointer", !alias && 'italic text-xs')}>
              {alias || `(${tTransfer('export.noSetAlias')})`}
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

      <Select
        className="min-w-35"
        value={column.format}
        onValueChange={(value) => onFormatChange(column.id, value as ExportFieldType)}
        options={formatOptions}
      />
      <IconButton
        icon={<TrashIcon className="h-4 w-4" />}
        variant="ghost"
        onClick={() => onRemove(column.id)}
      />
    </div >
  );
}
