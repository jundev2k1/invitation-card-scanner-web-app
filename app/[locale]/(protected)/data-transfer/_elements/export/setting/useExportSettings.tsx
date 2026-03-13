import { ExportFileConfig } from "@/root/config";
import { ExportConfigField, ExportFieldType } from "@/root/config/export-file";
import { ModuleEnum } from "@/root/config/import-file";
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExportColumn, ExportConfig, ExportFields, ExportFormValues } from "./exportSettings.type";

const getDefaultFormValues = (settings: ExportConfig | null, configuredColumns: readonly ExportConfigField[]): ExportFormValues => {
  const getAllowedFormat = (col: ExportColumn): ExportFields => {
    const allowedFormats = configuredColumns.find(cc => cc.matchingKey === col.matchingKey)?.allowedFormat || [];
    return {
      id: crypto.randomUUID(),
      matchingKey: col.matchingKey,
      alias: col.alias,
      order: col.order,
      format: col.format || ExportFieldType.TEXT,
      allowedFormat: allowedFormats
    }
  }

  return {
    module: settings?.module ?? ModuleEnum.EVENTS,
    name: settings?.name ?? "",
    description: settings?.description ?? "",
    includesActionColumn: settings?.includesActionColumn ?? false,
    columns: settings?.columns.map(c => getAllowedFormat(c)) || []
  }
}

export const useExportSettings = () => {
  const [formValues, setFormValues] = useState<ExportFormValues | null>(null);
  const [setting, setSetting] = useState<ExportConfig | null>(null);

  const configuredColumns = useMemo(() => {
    if (!formValues) return [];

    switch (formValues.module) {
      case ModuleEnum.EVENTS:
        return ExportFileConfig.EventExportConfig;

      case ModuleEnum.EVENT_CARDS:
        return ExportFileConfig.EventCardExportConfig;

      case ModuleEnum.EVENT_CATEGORIES:
        return ExportFileConfig.EventCategoryExportConfig;

      case ModuleEnum.USERS:
        return ExportFileConfig.UserExportConfig;

      default:
        return [];
    }
  }, [formValues, setting]);

  useEffect(() => {
    setFormValues(getDefaultFormValues(setting, configuredColumns));
  }, [setting]);

  const onSettingChange = useCallback((conf: ExportConfig | null) => {
    setSetting(conf);
  }, [setting]);

  const onReset = useCallback(() => {
    if (setting)
      setFormValues(getDefaultFormValues(setting, configuredColumns));
  }, [setting, formValues]);

  const onAddColumn = useCallback((col: ExportConfigField) => {
    setFormValues((prev) => {
      if (!prev) return prev;

      const newItem: ExportFields = {
        id: crypto.randomUUID(),
        matchingKey: col.matchingKey,
        alias: "",
        order: prev.columns.length,
        format: ExportFieldType.TEXT,
        allowedFormat: col.allowedFormat
      };
      return {
        ...prev,
        columns: [...prev.columns, newItem]
      };
    });
  }, [formValues]);

  const onFormatChange = useCallback((id: string, format: ExportFieldType) => {
    setFormValues((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: [...prev.columns.map((c) => (c.id === id ? { ...c, format: format } : c))]
      };
    });
  }, []);

  const onEditAlias = useCallback((id: string, alias: string) => {
    setFormValues((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: [...prev.columns.map((c) => (c.id === id ? { ...c, alias } : c))]
      };
    });
  }, [formValues]);

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end for re-order
  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFormValues((prev) => {
        if (!prev) return prev;

        const oldIndex = prev.columns.findIndex((i) => i.id === active.id);
        const newIndex = prev.columns.findIndex((i) => i.id === over.id);

        prev.columns[oldIndex].order = newIndex + 1;
        prev.columns[newIndex].order = oldIndex + 1;
        return {
          ...prev,
          columns: [...arrayMove([...prev.columns], oldIndex, newIndex)]
        };
      });
    }
  }, [formValues]);

  // Mock remove column
  const handleRemoveColumn = useCallback((id: string) => {
    setFormValues((prev) => {
      if (!prev) return prev;

      const newData = prev.columns.reduce((acc, col) => {
        col.order = acc.length + 1;
        if (col.id !== id)
          acc.push(col);

        return acc;
      }, [] as ExportFields[]);
      prev.columns = newData;
      return {
        ...prev,
        columns: newData
      };
    });
  }, [formValues]);

  const isSettingChanges = useMemo(() => {
    return JSON.stringify(formValues) !== JSON.stringify(setting);
  }, [formValues, setting]);

  return {
    isSettingChanges,
    isEmptySetting: !setting,
    formValues,
    configuredColumns,
    onSettingChange,
    sensors,
    onReset,
    onAddColumn,
    onFormatChange,
    onEditAlias,
    handleDragEnd,
    handleRemoveColumn,
  };
};
