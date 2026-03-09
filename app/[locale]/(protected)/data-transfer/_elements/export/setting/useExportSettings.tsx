import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExportColumn, ExportConfig, mockFetchExportConfigs } from "../../../type";

export const useExportSettings = () => {
  const [configuredColumns, setConfiguredColumns] = useState<ExportConfig | null>(null);
  const [setting, setSetting] = useState<ExportConfig | null>(null);
  const [availableFields, setAvailableFields] = useState<ExportColumn[]>([]);

  useEffect(() => {
    setConfiguredColumns(setting ? { ...setting } : null);

    const availableFields = mockFetchExportConfigs
      .find(f => f.module == setting?.module)?.columns || [];
      
    setAvailableFields(availableFields);
  }, [setting]);

  const onSettingChange = useCallback((conf: ExportConfig | null) => {
    setSetting(conf);
  }, [setting]);

  const onReset = useCallback(() => {
    if (setting) {
      setConfiguredColumns({
        ...setting,
        columns: [...setting.columns.map(c => ({ ...c }))]
      });
    }
  }, [setting, configuredColumns]);

  const onAddColumn = useCallback((col: ExportColumn) => {
    setConfiguredColumns((prev) => {
      if (!prev) return prev;

      const newItem = {
        id: crypto.randomUUID(),
        matchingKey: col.matchingKey,
        alias: "",
        order: prev.columns.length
      };
      return {
        ...prev,
        columns: [...prev.columns, newItem]
      };
    });
  }, [configuredColumns]);

  const onEditAlias = useCallback((id: string, alias: string) => {
    setConfiguredColumns((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: [...prev.columns.map((c) => (c.id === id ? { ...c, alias } : c))]
      };
    });
  }, [configuredColumns]);

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
      setConfiguredColumns((prev) => {
        if (!prev) return prev;

        const oldIndex = prev.columns.findIndex((i) => i.id === active.id);
        const newIndex = prev.columns.findIndex((i) => i.id === over.id);

        return {
          ...prev,
          columns: [...arrayMove([...prev.columns], oldIndex, newIndex)]
        };
      });
    }
  }, [configuredColumns]);

  // Mock remove column
  const handleRemoveColumn = useCallback((id: string) => {
    setConfiguredColumns((prev) => {
      if (!prev) return prev;

      const newData = prev.columns.reduce((acc, col) => {
        col.order = acc.length + 1;
        if (col.id !== id)
          acc.push(col);

        return acc;
      }, [] as ExportColumn[]);
      prev.columns = newData;
      return {
        ...prev,
        columns: newData
      };
    });
  }, [configuredColumns]);

  const isSettingChanges = useMemo(() => {
    return JSON.stringify(configuredColumns) !== JSON.stringify(setting);
  }, [configuredColumns, setting]);

  return {
    isSettingChanges,
    isEmptySetting: !setting,
    configuredColumns,
    availableFields,
    onSettingChange,
    sensors,
    onReset,
    onAddColumn,
    onEditAlias,
    handleDragEnd,
    handleRemoveColumn,
  };
};
