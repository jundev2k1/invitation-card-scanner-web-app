import { Button, Field, FieldGroup, FormCheckbox, FormTextBox } from "@/components";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { ImportConfig, ModuleEnum } from "../../../type";
import { useUpsertImportForm } from "./useUpsertImportForm";

export interface InsertExportFormProps {
  module: ModuleEnum;
  setting: ImportConfig | null;
  onSuccess: (setting: ImportConfig) => void;
}

export const UpsertImportForm = ({ module, setting, onSuccess }: InsertExportFormProps) => {
  const tActions = useTranslations('common.actions');

  const { form, onSubmit } = useUpsertImportForm({ module, setting, onSuccess });

  return (
    <div className="p-6 border bg-gray-50 dark:bg-gray-800 rounded-lg">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field orientation="responsive" className="flex">
              <FormTextBox name="name" label="Tên cấu hình" isRequired containerClassName="md:min-w-100" />
              <FormTextBox name="description" label="Ghi chú" containerClassName="grow" />
            </Field>
            <Field orientation="responsive" className="gap-1 justify-between">
              <div className="flex flex-col gap-1">
                <FormCheckbox name="includesActionColumn" label="Tự động thêm cột hành động" />
                <p className="text-xs text-muted-foreground italic">
                  *Chọn cấu hình này sẽ tự động thêm cột hành động hỗ trợ import dữ liệu.
                </p>
              </div>
              <Button type="submit">{!setting ? tActions('add') : tActions('save')}</Button>
            </Field>
          </FieldGroup>
          <Field>
          </Field>
        </form>
      </FormProvider>
    </div>
  );
};
