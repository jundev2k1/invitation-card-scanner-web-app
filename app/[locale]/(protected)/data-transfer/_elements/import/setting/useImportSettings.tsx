import { TranslateFn } from "@/root/i18n/type";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { ImportConfig, ImportFileTemplate } from "../../../type";
import { MappingStep } from "../steps/mapping-step/MappingStep";
import { RangeStep } from "../steps/range-step/RangeStep";
import { UploadStep } from "../steps/upload-step/UploadStep";
import { ValidateStep } from "../steps/validate-step/ValidateStep";
import { ImportFormValues, MappingStepFormValues, RangeStepFormValues } from "./importSettings.type";

interface getTabItemsProps {
  tTranfer: TranslateFn,
  selectedConfig: ImportConfig | null,
  templateFile: ImportFileTemplate | null,
  setTemplateFile: (file: ImportFileTemplate | null) => void,
  onMappingStepChange: (data: MappingStepFormValues) => void,
  onRangeStepChange: (data: RangeStepFormValues) => void
}

const getTabItems = ({
  tTranfer,
  selectedConfig,
  templateFile,
  setTemplateFile,
  onMappingStepChange,
  onRangeStepChange
}: getTabItemsProps) => {
  const headerFiles = templateFile?.data?.[0] || [];
  return [
    {
      value: 'upload',
      label: tTranfer('import.step.upload'),
      content: <UploadStep onTemplateChange={setTemplateFile} templateSetting={templateFile} noConfigSelected={!selectedConfig} />,
      disabled: !selectedConfig
    },
    {
      value: 'range',
      label: tTranfer('import.step.range'),
      content: <RangeStep config={selectedConfig} parsedData={templateFile?.data} onRangeFormChange={onRangeStepChange} />,
      disabled: !selectedConfig
    },
    {
      value: 'mapping',
      label: tTranfer('import.step.mapping'),
      content: <MappingStep config={selectedConfig} parsedHeaders={headerFiles} onMappingStepChange={onMappingStepChange} />,
      disabled: !selectedConfig
    },
    {
      value: 'validate',
      label: tTranfer('import.step.validate'),
      content: <ValidateStep config={selectedConfig} />,
      disabled: !selectedConfig
    },
  ]
};

const truncateTemplates = (templates: string[][]): string[][] => {
  return templates.map((template) => template.slice(0, 10).map(t => t.substring(0, 20)));
};

const getDefaultFormValues = (setting: ImportConfig | null): ImportFormValues => {
  return {
    module: setting?.module,
    id: setting?.id,
    name: setting?.name,
    description: setting?.description,
    fileTemplates: {
      fileName: setting?.fileTemplate?.name || '',
      fileType: setting?.fileTemplate?.extension || 'xlsx',
      fileTemplates: truncateTemplates(setting?.fileTemplate?.data || [])
    },
    rangeStep: {
      errorMessage: '',
      errorDetails: [],

      rangeStart: setting?.range?.rangeStart,
      rangeEnd: setting?.range?.rangeEnd,
      autoScaleY: setting?.range?.autoScaleY || false,
    },
    mappingStep: {
      errorMessage: '',
      errorDetails: [],

      importCount: 0,
      ignoreCount: 0,
      mappedCount: 0,
      mappings: {},
      importFields: setting?.fileTemplate?.data?.[0].map((f, i) => ({ field: f, order: i })) || [],
    },
  }
};

export const useImportSettings = () => {
  const tTranfer = useTranslations('dataTransfer');
  const [selectedConfig, setSelectedConfig] = useState<ImportConfig | null>(null);
  const [templateFile, setTemplateFile] = useState<ImportFileTemplate | null>(null);
  const [formValues, setFormValues] = useState<ImportFormValues>(
    getDefaultFormValues(selectedConfig ? { ...selectedConfig } : null));

  useEffect(() => {
    setFormValues(getDefaultFormValues(selectedConfig));
  }, [selectedConfig]);

  const handleConfigChange = (conf: ImportConfig | null) => {
    setSelectedConfig(conf);
  };

  const onRangeStepChange = useCallback(({
    rangeStart,
    rangeEnd,
    autoScaleY,
  }: RangeStepFormValues) => {
    setFormValues({
      ...formValues,
      rangeStep: {
        ...formValues.rangeStep,
        rangeStart: rangeStart || formValues.rangeStep.rangeStart,
        rangeEnd: rangeEnd || formValues.rangeStep.rangeEnd,
        autoScaleY: autoScaleY || formValues.rangeStep.autoScaleY,
      }
    });
  }, [formValues, selectedConfig]);

  const onMappingStepChange = useCallback(({
    importCount,
    ignoreCount,
    mappedCount,
    mappings,
    errorMessage,
    errorDetails
  }: MappingStepFormValues) => {
    setFormValues({
      ...formValues,
      mappingStep: {
        ...formValues.mappingStep,
        importCount,
        ignoreCount,
        mappedCount,
        mappings,
        errorMessage,
        errorDetails,
      }
    });
  }, [formValues, selectedConfig]);

  const tabItems = getTabItems({
    tTranfer,
    selectedConfig,
    templateFile,
    setTemplateFile,
    onRangeStepChange,
    onMappingStepChange,
  });

  return {
    formValues,
    tabItems,
    handleConfigChange
  };
}
