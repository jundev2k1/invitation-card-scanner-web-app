import { Toast } from "@/components";
import { ImportConfig, ModuleEnum } from "@/root/config/import-file";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { mockFetchExportConfigs, mockFetchImportConfigs } from "../../type";
import { ExportConfig } from "../export/setting/exportSettings.type";
import { SelectModuleProps } from "./SelectModule";

export const useSelectModule = ({ mode, onModuleChange, formValues }: SelectModuleProps) => {
  const tGlobalMsg = useTranslations('common.messages');
  const tTransfer = useTranslations('dataTransfer');
  const [selectedModuleOption, setSelectedModuleOption] = useState<ImportConfig | ExportConfig | null>(null);

  const moduleOptions = [
    { label: tTransfer(`module.EVENT_CATEGORIES`), value: ModuleEnum.EVENT_CATEGORIES.toString() },
    { label: tTransfer(`module.EVENTS`), value: ModuleEnum.EVENTS.toString() },
    { label: tTransfer(`module.EVENT_CARDS`), value: ModuleEnum.EVENT_CARDS.toString() },
    { label: tTransfer(`module.USERS`), value: ModuleEnum.USERS.toString() },
  ];

  const onModuleSelectChange = useCallback((value: ModuleEnum | string) => {
    if (mode === 'export') {
      onModuleChange({
        id: '',
        module: value as ModuleEnum,
        name: '',
        description: '',
        includesActionColumn: false,
        columns: [],
      } as ExportConfig);
    } else {
      onModuleChange({
        id: undefined,
        module: value as ModuleEnum,
        uploadStep: { columnRow: 0, name: null, extension: null, size: null, data: [] },
        configInfo: { name: '', description: '' },
        mappingStep: { importFields: [], mappings: [] },
        rangeStep: { rangeStart: null, rangeEnd: null, autoScaleY: false },
        createdAt: undefined,
        updatedAt: undefined
      } as ImportConfig);
    }
    setSelectedModuleOption(null);
  }, [mode]);

  const onModuleOptionChange = useCallback((setting: ImportConfig | ExportConfig) => {
    setSelectedModuleOption(setting);
    onModuleChange(setting);
  }, [mode]);

  const onFetchImportOptions = useCallback(async (keyword: string): Promise<ImportConfig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const res = mockFetchImportConfigs.filter(i => i.module == (formValues?.module || ModuleEnum.EVENTS));
        resolve(res);
      }, 300);
    })
  }, [mode, formValues?.module]);

  const onFetchExportOptions = useCallback(async (keyword: string): Promise<ExportConfig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const res = mockFetchExportConfigs.filter(i => i.module == (formValues?.module || ModuleEnum.EVENTS));
        resolve(res);
      }, 300);
    });
  }, [mode, formValues?.module]);

  const onInsertSuccess = useCallback((setting: ImportConfig | ExportConfig) => {
    onModuleChange(setting);
    Toast.showSuccess(tGlobalMsg('insertSuccess'));
  }, []);

  const onDeleteOption = useCallback((id: string) => {
    onModuleChange(null);
    Toast.showSuccess(tGlobalMsg('deleteSuccess'));
  }, []);

  return {
    moduleOptions,
    onModuleSelectChange,
    selectedModuleOption,
    onModuleOptionChange,
    onFetchImportOptions,
    onFetchExportOptions,
    onInsertSuccess,
    onDeleteOption,
  };
};
