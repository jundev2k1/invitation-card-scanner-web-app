import { Toast } from "@/components";
import { ImportConfig, ModuleEnum } from "@/root/config/import-file";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { ExportConfig, mockFetchExportConfigs, mockFetchImportConfigs } from "../../type";
import { SelectModuleProps } from "./SelectModule";

export const useSelectModule = ({ mode, onModuleChange }: SelectModuleProps) => {
  const tGlobalMsg = useTranslations('common.messages');
  const tTransfer = useTranslations('dataTransfer');
  const [selectedModule, setSelectedModule] = useState<ModuleEnum>(ModuleEnum.EVENTS);
  const [selectedModuleOption, setSelectedModuleOption] = useState<ImportConfig | ExportConfig | null>(null);

  const moduleOptions = [
    { label: tTransfer(`module.EVENT_CATEGORIES`), value: ModuleEnum.EVENT_CATEGORIES.toString() },
    { label: tTransfer(`module.EVENTS`), value: ModuleEnum.EVENTS.toString() },
    { label: tTransfer(`module.EVENT_CARDS`), value: ModuleEnum.EVENT_CARDS.toString() },
    { label: tTransfer(`module.USERS`), value: ModuleEnum.USERS.toString() },
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
    Toast.showSuccess(tGlobalMsg('insertSuccess'));
  }, []);

  const onDeleteOption = useCallback((id: string) => {
    setSelectedModuleOption(null);
    Toast.showSuccess(tGlobalMsg('deleteSuccess'));
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
    onDeleteOption,
  };
};
