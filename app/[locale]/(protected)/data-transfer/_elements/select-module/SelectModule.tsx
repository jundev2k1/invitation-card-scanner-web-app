import { Combobox, Field, FieldGroup, FieldLabel, Select } from "@/components";
import { FolderSymlinkIcon } from "@/icons";
import { useTranslations } from "next-intl";
import React from "react";
import { PreviewConfig } from "../../_shared/preview/PreviewConfig";
import { ExportConfig, ImportConfig, SelectModuleChangeFn } from "../../type";
import { UpsertExportForm } from "../export/upsert-form/UpsertExportForm";
import { UpsertImportForm } from "../import/upsert-form/UpsertImportForm";
import { useSelectModule } from "./useSelectModule";

export type SelectModuleProps = {
  mode: 'import' | 'export';
  onModuleChange: SelectModuleChangeFn;
};

export const SelectModule = React.memo(({
  mode,
  onModuleChange,
}: SelectModuleProps) => {
  const t = useTranslations("dataTransfer.moduleInput");
  const {
    moduleOptions,
    selectedModule,
    onModuleSelectChange,
    selectedModuleOption,
    onModuleOptionChange,
    onFetchImportOptions,
    onFetchExportOptions,
    onInsertSuccess,
  } = useSelectModule({ onModuleChange, mode });

  return (
    <FieldGroup >
      <div className="flex items-end gap-4">
        <Field orientation="vertical" className="gap-0.5 w-75">
          <FieldLabel className="text-slate-900 dark:text-muted-foreground">
            {t('selectModule')}
          </FieldLabel>
          <Select
            value={selectedModule.toString()}
            options={moduleOptions}
            onValueChange={onModuleSelectChange}
            placeholder={t('selectModulePlaceholder')}
          />
        </Field>
        {mode === 'import' && (
          <Combobox
            containerClassName="col-span-2 min-w-100"
            className="mb-0"
            label={t('selectSetting')}
            fetchOptions={onFetchImportOptions}
            value={selectedModuleOption}
            onChange={(val) => onModuleOptionChange(val as ImportConfig)}
            getOptionLabel={res => res.name}
            getOptionKey={res => res.id!}
            getDisplayValue={res => (
              <span className="w-full flex items-center gap-1">
                <FolderSymlinkIcon className="w-4 h-4 mr-2" />
                {res.name}
              </span>
            )}
            placeholder={t('selectSettingPlaceholder')}
          />
        )}
        {mode === 'export' && (
          <Combobox
            containerClassName="col-span-2 min-w-100"
            className="mb-0"
            label={t('selectSetting')}
            fetchOptions={onFetchExportOptions}
            value={selectedModuleOption}
            onChange={(val) => onModuleOptionChange(val as ExportConfig)}
            getOptionLabel={res => res.name}
            getOptionKey={res => res.id!}
            getDisplayValue={res => (
              <span className="w-full flex items-center gap-1">
                <FolderSymlinkIcon className="w-4 h-4 mr-2" />
                {res.name}
              </span>
            )}
            placeholder={t('selectSettingPlaceholder')}
          />
        )}
        {mode === 'export' && (
          <PreviewConfig setting={selectedModuleOption} type={mode} disabled={!selectedModuleOption} />
        )}
      </div>

      {mode === 'import' && (
        <UpsertImportForm
          module={selectedModule}
          setting={selectedModuleOption as ImportConfig}
          onSuccess={onInsertSuccess}
        />
      )}

      {mode === 'export' && (
        <UpsertExportForm
          module={selectedModule}
          setting={selectedModuleOption as ExportConfig}
          onSuccess={onInsertSuccess}
        />
      )}
    </FieldGroup>
  );
});