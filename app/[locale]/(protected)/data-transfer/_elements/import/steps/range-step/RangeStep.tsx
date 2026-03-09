import { Alert, Button, FormCheckbox, FormTextBox, Label } from '@/components';
import { InfoIcon, RotateCcwIcon, SparklesIcon } from "@/icons";
import { ImportConfig } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import { PreviewTable } from '../../../../_shared/preview/table/PreviewTable';
import { ImportFormValues, RangeStepFormValues } from '../../setting/importSettings.type';
import { useRangeStep } from './useRangeStep';

type RangeStepProps = {
  formValues: ImportFormValues;
  parsedData?: string[][];
  onRangeFormChange: (data: RangeStepFormValues) => void;
};

export const RangeStep = ({
  formValues,
  parsedData = [],
  onRangeFormChange,
}: RangeStepProps) => {
  const t = useTranslations('dataTransfer.import.range');
  const tCommon = useTranslations('common');
  const wRef = useRef<HTMLDivElement>(null);

  const {
    form,
    onFormSubmit,
    rangeStart,
    rangeEnd,
    onRangePreviewChange,
    handleAutoDetect,
    onRangeReset,
    autoScaleY,
    onAutoScaleYChange,
  } = useRangeStep({ rangeStepForm: formValues.rangeStep, parsedData, onRangeFormChange });

  const previewConfig: ImportConfig = {
    ...formValues,
    id: formValues.id,
    module: formValues.module,
    configInfo: {
      name: formValues.configInfo.name,
      description: formValues.configInfo.description,
    },
    mappingStep: {
      mappings: formValues.mappingStep.mappings,
      importFields: formValues.mappingStep.importFields,
    },
    rangeStep: {
      rangeStart,
      rangeEnd,
      autoScaleY,
    },
    uploadStep: {
      name: formValues.fileTemplate.name,
      extension: formValues.fileTemplate.extension,
      size: formValues.fileTemplate.size,
      data: formValues.fileTemplate.fileData,
    },
  }

  if (!formValues?.id)
    return (
      <div className="h-full flex flex-col space-y-6 p-6">
        <Alert
          title={t('noConfigSelectedTitle')}
          variant="destructive"
          icon={<InfoIcon />}
        >
          {t('noConfigSelectedDesc')}
        </Alert>
      </div>
    );

  return (
    <div ref={wRef} className="flex flex-col h-full space-y-6 p-6">
      {/* Header + Quick actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{t('title')}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t('desc')}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            leftIcon={<SparklesIcon />}
            variant="outline"
            onClick={handleAutoDetect}
            className="gap-1.5"
          >
            {t('autoDetect')}
          </Button>
          <Button
            leftIcon={<RotateCcwIcon />}
            variant="secondary"
            onClick={onRangeReset}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            {tCommon('actions.reset')}
          </Button>
        </div>
      </div>

      {/* Preview Table */}
      <div className="border rounded-lg bg-background shadow-sm h-120 relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <PreviewTable
            config={previewConfig}
            type="import"
            data={parsedData}
            interactive
            autoScaleY={autoScaleY}
            onAutoScaleYChange={onAutoScaleYChange}
            onRangeChange={onRangePreviewChange}
            selectedRangeStart={rangeStart ?? undefined}
            selectedRangeEnd={rangeEnd ?? undefined}
          />

        </div>
      </div>

      {/* Configuration Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/40 p-5 rounded-lg border">
        {/* Left column: Range inputs */}
        <div className="space-y-4">
          <FormProvider {...form}>
            <form>
              <div>
                <Label htmlFor="range-start" className="flex items-center gap-1.5">
                  {t('rangeStart')} <span className="text-xs text-muted-foreground"></span>
                </Label>
                <div className="mt-1.5 flex items-start gap-2">
                  <FormTextBox
                    name="rangeStart"
                    placeholder={t('rangeStartPlaceholder')}
                    className="font-mono w-32"
                    onBlur={(e) => onFormSubmit({ rangeStart: e.currentTarget.value || null })}
                  />
                  <span className="text-muted-foreground">→</span>
                  <FormTextBox
                    name="rangeEnd"
                    placeholder={t('rangeEndPlaceholder')}
                    className="font-mono w-32"
                    onBlur={(e) => onFormSubmit({ rangeEnd: e.currentTarget.value || null })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <FormCheckbox
                  name="autoScaleY"
                  label={t('autoY')}
                  subLabel={t('autoYDesc')}
                  onCheckedChange={() => onFormSubmit({})}
                  disabled={(!form.getValues('rangeStart') || !form.getValues('rangeEnd')) && !!form.getValues('autoScaleY')}
                />
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Right column: Current status + quick summary */}
        <div className="space-y-3 flex flex-col justify-center">
          <div className="text-sm">
            <span className="font-medium">{t('currentRange')}:</span>{' '}
            <code className="bg-background px-1.5 py-0.5 rounded border text-primary">
              {rangeStart || t('rangeStartPlaceholder')} → {rangeEnd || t('rangeEndPlaceholder')}
            </code>
          </div>

          <div className="text-sm">
            <span className="font-medium">{t('rowsCount')}:</span>{' '}
            {rangeStart && rangeEnd
              ? Math.max(0, parseInt(rangeEnd.replace(/\D/g, '')) - parseInt(rangeStart.replace(/\D/g, '')) + 1)
              : '—'}{' '}
            {t('rows')}
          </div>

          <div className="text-sm">
            <span className="font-medium">{t('columnsCount')}:</span>{' '}
            {rangeStart && rangeEnd
              ? Math.max(0, rangeEnd.charCodeAt(0) - rangeStart.charCodeAt(0) + 1)
              : '—'}{' '}
            {t('columns')}
          </div>
        </div>
      </div>

      {/* Helpful instruction block */}
      <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="space-y-2">
            <p className="font-medium text-blue-800 dark:text-blue-300">
              {t('howTo.title')}
            </p>
            <ul className="text-muted-foreground space-y-1.5 list-disc pl-5 text-sm">
              <li>{t('howTo.clickDrag')}</li>
              <li>{t('howTo.shiftClick')}</li>
              <li>{t('howTo.autoDetectTip')}</li>
              <li>{t('howTo.actionColumnTip')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
