import { Button, Combobox, Field, FieldGroup, FieldLabel, Select } from "@/components";
import { FolderSymlinkIcon, TrashIcon } from "@/icons";
import { ImportConfig } from "@/root/config/import-file";
import { useTranslations } from "next-intl";
import React from "react";
import { PreviewConfig } from "../../_shared/preview/PreviewConfig";
import { ExportConfig } from "../../type";
import { UpsertExportForm } from "../export/upsert-form/UpsertExportForm";
import { ConfigInfoFormValues, ImportFormValues } from "../import/setting/importSettings.type";
import { UpsertImportForm } from "../import/upsert-form/UpsertImportForm";
import { SelectModuleChangeFn } from "./type";
import { useSelectModule } from "./useSelectModule";

export type SelectModuleProps = {
  mode: 'import' | 'export';
  formValues?: ImportFormValues | ExportConfig;
  onModuleChange: SelectModuleChangeFn;
  onConfigInfoChange?: (value: ConfigInfoFormValues) => void;
};

export const SelectModule = React.memo(({
  mode,
  formValues,
  onModuleChange,
  onConfigInfoChange,
}: SelectModuleProps) => {
  const tGlobalActions = useTranslations("common.actions");
  const tModuleInput = useTranslations("dataTransfer.moduleInput");
  const {
    moduleOptions,
    selectedModule,
    onModuleSelectChange,
    selectedModuleOption,
    onModuleOptionChange,
    onFetchImportOptions,
    onFetchExportOptions,
    onInsertSuccess,
    onDeleteOption,
  } = useSelectModule({ onModuleChange, onConfigInfoChange, mode, formValues });

  return (
    <FieldGroup >
      <div className="flex items-end gap-2">
        <Field orientation="vertical" className="gap-0.5 w-75">
          <FieldLabel className="text-slate-900 dark:text-muted-foreground">
            {tModuleInput('selectModule')}
          </FieldLabel>
          <Select
            value={selectedModule.toString()}
            options={moduleOptions}
            onValueChange={onModuleSelectChange}
            placeholder={tModuleInput('selectModulePlaceholder')}
          />
        </Field>
        {mode === 'import' && (
          <Combobox
            containerClassName="col-span-2 min-w-100"
            className="mb-0"
            label={tModuleInput('selectSetting')}
            fetchOptions={onFetchImportOptions}
            value={selectedModuleOption as ImportConfig | null}
            onChange={(val) => onModuleOptionChange(val as ImportConfig)}
            getOptionLabel={res => res.configInfo.name}
            getOptionKey={res => res.id!}
            getDisplayValue={res => (
              <span className="w-full flex items-center gap-1">
                <FolderSymlinkIcon className="w-4 h-4 mr-2" />
                {res.configInfo.name}
              </span>
            )}
            placeholder={tModuleInput('selectSettingPlaceholder')}
          />
        )}
        {mode === 'export' && (
          <Combobox
            containerClassName="col-span-2 min-w-100"
            className="mb-0"
            label={tModuleInput('selectSetting')}
            fetchOptions={onFetchExportOptions}
            value={selectedModuleOption as ExportConfig}
            onChange={(val) => onModuleOptionChange(val as ExportConfig)}
            getOptionLabel={res => res.name}
            getOptionKey={res => res.id!}
            getDisplayValue={res => (
              <span className="w-full flex items-center gap-1">
                <FolderSymlinkIcon className="w-4 h-4 mr-2" />
                {res.name}
              </span>
            )}
            placeholder={tModuleInput('selectSettingPlaceholder')}
          />
        )}
        {selectedModuleOption && (
          <>
            <PreviewConfig setting={selectedModuleOption} type={mode} disabled={!selectedModuleOption} />
            <Button
              leftIcon={<TrashIcon />}
              variant="destructive"
              onClick={() => selectedModuleOption.id && onDeleteOption(selectedModuleOption.id)}
            >
              {tGlobalActions('delete')}
            </Button>
          </>
        )}
      </div>

      {mode === 'import' && (
        <UpsertImportForm
          module={selectedModule}
          formValues={formValues as ImportFormValues}
          onConfigInfoChange={(formVal) => onConfigInfoChange?.(formVal)}
          onInsertSuccess={onInsertSuccess}
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

SelectModule.displayName = 'SelectModule';
