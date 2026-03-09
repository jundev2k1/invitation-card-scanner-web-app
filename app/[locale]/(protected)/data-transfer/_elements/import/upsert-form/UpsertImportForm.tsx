import { Button, Field, FieldGroup, FormTextBox } from '@/components';
import { ImportConfig, ModuleEnum } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';
import { ConfigInfoFormValues, ImportFormValues } from '../setting/importSettings.type';
import { useUpsertImportForm } from './useUpsertImportForm';

export interface InsertImportFormProps {
  module: ModuleEnum;
  formValues: ImportFormValues | null;
  onInsertSuccess: (setting: ImportConfig) => void;
  onConfigInfoChange: (value: ConfigInfoFormValues) => void;
}

export const UpsertImportForm = ({ module, formValues: setting, onInsertSuccess, onConfigInfoChange }: InsertImportFormProps) => {
  const t = useTranslations('dataTransfer');
  const tActions = useTranslations('common.actions');

  const { form, onSubmit } = useUpsertImportForm({ module, formValues: setting, onInsertSuccess, onConfigInfoChange });

  return (
    <div className="p-6 border bg-gray-50 dark:bg-gray-800 rounded-lg">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field orientation="responsive" className="flex">
              <FormTextBox
                name="name"
                label={t('export.settingName')}
                isRequired
                containerClassName="md:min-w-100"
              />
              <FormTextBox
                name="description"
                label={t('export.settingDescription')}
                containerClassName="grow"
              />
            </Field>

            <Field orientation="horizontal" className="gap-4 justify-start items-start">
              <Button type="submit">
                {!setting ? tActions('add') : tActions('save')}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
};
