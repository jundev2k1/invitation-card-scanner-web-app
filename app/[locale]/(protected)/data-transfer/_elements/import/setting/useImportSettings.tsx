import { ImportFileConfig } from "@/root/config";
import { ImportConfig, MappingConfigField, ModuleEnum } from "@/root/config/import-file";
import { TranslateFn } from "@/root/i18n/type";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SelectModuleChangeFn } from "../../select-module/type";
import { MappingStep } from "../steps/mapping-step/MappingStep";
import { RangeStep } from "../steps/range-step/RangeStep";
import { UploadStep } from "../steps/upload-step/UploadStep";
import { ValidateStep } from "../steps/validate-step/ValidateStep";
import { ConfigInfoFormValues, FileTemplateValues, ImportFormValues, MappingStepFormValues, RangeStepFormValues } from "./importSettings.type";

interface getTabItemsProps {
  tTranfer: TranslateFn,
  selectedModule: ModuleEnum | null,
  hasConfig: boolean,
  formValues: ImportFormValues,
  onTemplateChange: (file: FileTemplateValues) => void,
  onTemplateClear: () => void,
  onMappingStepChange: (data: MappingStepFormValues) => void,
  onRangeStepChange: (data: RangeStepFormValues) => void
}

const getTabItems = ({
  tTranfer,
  selectedModule,
  hasConfig = false,
  formValues,
  onTemplateChange,
  onTemplateClear,
  onMappingStepChange,
  onRangeStepChange
}: getTabItemsProps) => {
  const rangeSkipRow = formValues.fileTemplate.columnRow;
  const rangeData = formValues.fileTemplate.fileData
    .slice(rangeSkipRow, formValues.fileTemplate.fileData.length) || [];
  return [
    {
      value: 'upload',
      label: tTranfer('import.step.upload'),
      content: (
        <UploadStep
          templateSetting={formValues.fileTemplate}
          onTemplateChange={onTemplateChange}
          onTemplateClear={onTemplateClear}
          noConfigSelected={!hasConfig}
        />
      ),
      disabled: !hasConfig
    },
    {
      value: 'mapping',
      label: tTranfer('import.step.mapping'),
      content: (
        <MappingStep
          selectedModule={selectedModule}
          formValues={formValues.mappingStep}
          onMappingStepChange={onMappingStepChange}
          noConfigSelected={!hasConfig}
        />
      ),
      disabled: !hasConfig
    },
    {
      value: 'range',
      label: tTranfer('import.step.range'),
      content: (
        <RangeStep
          formValues={formValues}
          parsedData={rangeData}
          onRangeFormChange={onRangeStepChange}
          noConfigSelected={!hasConfig}
        />
      ),
      disabled: !hasConfig || !formValues.fileTemplate.name
    },
    {
      value: 'validate',
      label: tTranfer('import.step.validate'),
      content: (
        <ValidateStep
          formValues={formValues}
          noConfigSelected={!hasConfig}
        />
      ),
      disabled: !hasConfig
    },
    {
      value: 'import',
      label: tTranfer('import.step.import'),
      content: (
        <>Import data</>
      ),
      disabled: !hasConfig
    }
  ]
};

export const truncateTemplates = (templates: any[][]): string[][] => {
  return templates.map((template) => template
    .slice(0, 10)
    .map(t => t.toString().substring(0, 15) + (t.length > 15 ? '...' : '')));
};

export const getImportConfig = (module: ModuleEnum | null): readonly MappingConfigField[] => {
  switch (module) {
    case ModuleEnum.EVENTS:
      return ImportFileConfig.EventImportConfig;

    case ModuleEnum.EVENT_CARDS:
      return ImportFileConfig.EventCardImportConfig;

    case ModuleEnum.EVENT_CATEGORIES:
      return ImportFileConfig.EventCategoryImportConfig;

    case ModuleEnum.USERS:
      return ImportFileConfig.UserImportConfig;

    default:
      return [];
  }
}

const getDefaultFormValues = (setting: ImportConfig | null): ImportFormValues => {
  const mappingConfig = getImportConfig(setting?.module || null);

  return {
    module: setting?.module || null,
    id: setting?.id,
    configInfo: {
      name: setting?.configInfo?.name || '',
      description: setting?.configInfo?.description || '',
    },
    fileTemplate: {
      columnRow: 0,
      name: setting?.uploadStep?.name || null,
      extension: setting?.uploadStep?.extension || null,
      size: setting?.uploadStep?.size || null,
      fileData: truncateTemplates(setting?.uploadStep?.data || [])
    },
    rangeStep: {
      rangeStart: setting?.rangeStep?.rangeStart,
      rangeEnd: setting?.rangeStep?.rangeEnd,
      autoScaleY: setting?.rangeStep?.autoScaleY || false,
    },
    mappingStep: {
      configs: mappingConfig,
      mappings: setting?.mappingStep?.mappings || [],
      importFields: setting?.uploadStep?.data?.[0].map((f, i) => ({ field: f, order: i })) || [],
    },
  }
};

export const useImportSettings = () => {
  const tTranfer = useTranslations('dataTransfer');
  const [selectedConfig, setSelectedConfig] = useState<ImportConfig | null>(null);
  const [formValues, setFormValues] = useState<ImportFormValues>(
    getDefaultFormValues(selectedConfig ? { ...selectedConfig } : null));
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    setFormValues(getDefaultFormValues(selectedConfig));
    if (!selectedConfig && tabRefs.current) {
      tabRefs.current.get('upload')?.click();
    }
  }, [selectedConfig]);

  const handleConfigChange: SelectModuleChangeFn = useCallback((conf) => {
    setSelectedConfig(conf as ImportConfig | null);
  }, []);

  const onConfigInfoChange = useCallback((info: ConfigInfoFormValues) => {
    setFormValues(prev => {
      return ({
        ...prev,
        configInfo: info
      })
    });
  }, []);

  const onTemplateChange = useCallback((file: FileTemplateValues) => {
    setFormValues(prev => {
      const importHeaders = prev.fileTemplate.fileData.slice(file.columnRow, file.columnRow + 1)?.[0] || [];
      const importFields = importHeaders.map((c, index) => ({ field: c, order: index }));
      return ({
        ...prev,
        fileTemplate: {
          ...prev.fileTemplate,
          columnRow: file.columnRow,
          name: file.name,
          extension: file.extension,
          size: file.size,
          fileData: truncateTemplates(file?.fileData || []),
        },
        rangeStep: {
          ...prev.rangeStep,
          rangeStart: null,
          rangeEnd: null,
          autoScaleY: true,
        },
        mappingStep: {
          configs: [...prev.mappingStep.configs],
          importFields,
          mappings: [],
        }
      })
    });
  }, []);

  const onTemplateClear = useCallback(() => {
    setFormValues(prev => {
      return {
        ...prev,
        fileTemplate: {
          ...prev.fileTemplate,
          name: null,
          extension: null,
          size: null,
          fileData: [],
        },
        rangeStep: {
          ...prev.rangeStep,
          rangeStart: null,
          rangeEnd: null,
          autoScaleY: true,
        },
        mappingStep: {
          configs: [...prev.mappingStep.configs],
          importFields: [],
          mappings: [],
        }
      }
    });
  }, []);

  const onRangeStepChange = useCallback(({
    rangeStart,
    rangeEnd,
    autoScaleY,
  }: RangeStepFormValues) => {
    setFormValues((prevFormValues) => {
      const rangeStep = prevFormValues.rangeStep;
      const template = prevFormValues.fileTemplate;
      const importFields = (template.fileData.slice(template.columnRow, 1)?.[0] || [])
        .map((c, index) => ({ field: c, order: index }));

      return {
        ...prevFormValues,
        rangeStep: {
          ...rangeStep,
          rangeStart: rangeStart || null,
          rangeEnd: rangeEnd || null,
          autoScaleY: autoScaleY,
        },
        mappingStep: {
          ...prevFormValues.mappingStep,
          mappings: [],
          importFields,
        }
      };
    });
  }, []);

  const onMappingStepChange = useCallback(({
    mappings,
  }: MappingStepFormValues) => {
    setFormValues(prev => {
      return ({
        ...prev,
        mappingStep: {
          ...prev.mappingStep,
          mappings,
        }
      })
    });
  }, []);

  const tabItems = useMemo(() => getTabItems({
    tTranfer,
    selectedModule: selectedConfig?.module || null,
    hasConfig: !!selectedConfig,
    formValues,
    onTemplateChange,
    onTemplateClear,
    onRangeStepChange,
    onMappingStepChange,
  }), [selectedConfig, formValues]);

  return {
    formValues,
    tabRefs,
    tabItems,
    handleConfigChange,
    onConfigInfoChange,
  };
}
