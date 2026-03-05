import { Button, Field, FieldGroup, FormCheckbox, FormTextBox } from '@/components';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';
import { ImportConfig, ModuleEnum } from '../../../type';
import { useUpsertImportForm } from './useUpsertImportForm';

export interface InsertImportFormProps {
  module: ModuleEnum;
  setting: ImportConfig | null;
  onSuccess: (setting: ImportConfig) => void;
}

export const UpsertImportForm = ({ module, setting, onSuccess }: InsertImportFormProps) => {
  const t = useTranslations('dataTransfer');
  const tActions = useTranslations('common.actions');

  const { form, onSubmit } = useUpsertImportForm({ module, setting, onSuccess });

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

            <Field orientation="responsive" className="gap-4 justify-between items-start">
              <div className="flex flex-col gap-1">
                <FormCheckbox name="includesActionColumn" label={t('import.autoAddAction')} />
                <p className="text-xs text-muted-foreground italic">
                  {t('import.autoAddActionDesc')}
                </p>
              </div>
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
