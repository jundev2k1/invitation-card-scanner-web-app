import { ImportConfig, ModuleEnum } from "@/root/config/import-file";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { ExportConfig, mockFetchExportConfigs, mockFetchImportConfigs } from "../../type";
import { SelectModuleProps } from "./SelectModule";

export const useSelectModule = ({ mode, onModuleChange }: SelectModuleProps) => {
  const t = useTranslations('dataTransfer');
  const [selectedModule, setSelectedModule] = useState<ModuleEnum>(ModuleEnum.EVENTS);
  const [selectedModuleOption, setSelectedModuleOption] = useState<ImportConfig | ExportConfig | null>(null);

  const moduleOptions = [
    { label: t(`module.EVENT_CATEGORIES`), value: ModuleEnum.EVENT_CATEGORIES.toString() },
    { label: t(`module.EVENTS`), value: ModuleEnum.EVENTS.toString() },
    { label: t(`module.EVENT_CARDS`), value: ModuleEnum.EVENT_CARDS.toString() },
    { label: t(`module.USERS`), value: ModuleEnum.USERS.toString() },
  ];

  useEffect(() => {
    if (!selectedModuleOption) {
      onModuleChange(null);
      return;
    }

    onModuleChange(selectedModuleOption);
  }, [selectedModule, selectedModuleOption]);

  const onModuleSelectChange = useCallback((value: ModuleEnum | string) => {
    setSelectedModule(value as ModuleEnum);
    setSelectedModuleOption(null);
  }, [selectedModule, mode]);

  const onModuleOptionChange = useCallback((setting: ImportConfig | ExportConfig) => {
    setSelectedModuleOption(setting);
  }, [selectedModule, selectedModuleOption, mode]);

  const onFetchImportOptions = useCallback(async (keyword: string): Promise<ImportConfig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const res = mockFetchImportConfigs.filter(i => i.module == selectedModule);
        resolve(res);
      }, 300);
    })
  }, [selectedModule, mode]);

  const onFetchExportOptions = useCallback(async (keyword: string): Promise<ExportConfig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const res = mockFetchExportConfigs.filter(i => i.module == selectedModule);
        resolve(res);
      }, 300);
    });
  }, [selectedModule, mode]);

  const onInsertSuccess = useCallback((setting: ImportConfig | ExportConfig) => {
    setSelectedModuleOption(setting);
  }, []);

  return {
    moduleOptions,
    selectedModule,
    onModuleSelectChange,
    selectedModuleOption,
    onModuleOptionChange,
    onFetchImportOptions,
    onFetchExportOptions,
    onInsertSuccess,
  };
};
