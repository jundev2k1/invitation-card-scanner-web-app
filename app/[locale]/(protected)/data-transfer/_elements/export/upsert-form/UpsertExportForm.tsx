import {
  Button,
  Field,
  FieldGroup,
  FormCheckbox,
  FormTextBox,
} from "@/components";
import { ModuleEnum } from "@/root/config/import-file";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { ExportConfig } from "../../../type";
import { useUpsertExportForm } from "./useUpsertExportForm";

export interface InsertExportFormProps {
  module: ModuleEnum;
  setting: ExportConfig | null;
  onSuccess: (setting: ExportConfig) => void;
}

export const UpsertExportForm = ({ module, setting, onSuccess }: InsertExportFormProps) => {
  const t = useTranslations("dataTransfer");
  const tActions = useTranslations("common.actions");

  const { form, onSubmit } = useUpsertExportForm({ module, setting, onSuccess });

  return (
    <div className="p-6 border bg-gray-50 dark:bg-gray-800 rounded-lg">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field orientation="responsive" className="flex">
              <FormTextBox
                name="name"
                label={t("export.settingName")}
                isRequired
                containerClassName="md:min-w-100"
              />
              <FormTextBox
                name="description"
                label={t("export.settingDescription")}
                containerClassName="grow"
              />
            </Field>

            <Field orientation="responsive" className="gap-1 justify-between">
              <div className="flex flex-col gap-1">
                <FormCheckbox
                  name="includesActionColumn"
                  label={t("export.autoAddActionColumn")}
                />
                <p className="text-xs text-muted-foreground italic">
                  {t("export.autoAddActionColumnDesc")}
                </p>
              </div>

              <Button type="submit">
                {!setting ? tActions("add") : tActions("save")}
              </Button>
            </Field>
          </FieldGroup>

          <Field>
            {/* Reserved for future fields if needed */}
          </Field>
        </form>
      </FormProvider>
    </div>
  );
};
