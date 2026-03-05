import { Button, Checkbox, Input, Label } from '@/components';
import { Info, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { PreviewTable } from '../../../../_shared/preview/table/PreviewTable';
import { ImportConfig } from '../../../../type';
import { useRangeStep } from './useRangeStep';

type RangeStepProps = {
  config: ImportConfig | null;
  parsedData?: any[];
  onRangeChange?: (start: string | null, end: string | null) => void;
  onActionColumnChange?: (checked: boolean) => void;
};

export const RangeStep = ({
  config,
  parsedData = [],
  onRangeChange,
  onActionColumnChange,
}: RangeStepProps) => {
  const t = useTranslations('dataTransfer.import.range');
  const tCommon = useTranslations('common');

  const {
    rangeStart,
    rangeEnd,
    includesActionColumn,
    handleMouseDown,
    handleMouseOver,
    handleMouseUp,
    handleAutoDetect,
    handleReset,
    toggleActionColumn,
    setRangeStart,
    setRangeEnd,
    setIncludesActionColumn,
  } = useRangeStep({ config, parsedData });

  useEffect(() => {
    onRangeChange?.(rangeStart, rangeEnd);
  }, [rangeStart, rangeEnd, onRangeChange]);

  useEffect(() => {
    onActionColumnChange?.(includesActionColumn);
  }, [includesActionColumn, onActionColumnChange]);

  return (
    <div className="flex flex-col h-full space-y-6 p-6">
      {/* Header + Quick actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{t('title')}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t('description')}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            leftIcon={<Sparkles />}
            variant="outline"
            onClick={handleAutoDetect}
            className="gap-1.5"
          >
            {t('autoDetect')}
          </Button>
          <Button
            leftIcon={<RotateCcw />}
            variant="secondary"
            onClick={handleReset}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            {tCommon('actions.reset')}
          </Button>
        </div>
      </div>

      {/* Preview Table */}
      <div
        className="border rounded-lg overflow-hidden bg-background shadow-sm w-[75vw] max-h-200"
        onMouseUp={handleMouseUp}
      >
        <PreviewTable
          config={config}
          type="import"
          data={parsedData}
          interactive
          onCellMouseDown={handleMouseDown}
          onCellMouseOver={handleMouseOver}
          selectedRangeStart={rangeStart ?? undefined}
          selectedRangeEnd={rangeEnd ?? undefined}
        />
      </div>

      {/* Configuration Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/40 p-5 rounded-lg border">
        {/* Left column: Range inputs */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="range-start" className="flex items-center gap-1.5">
              {t('rangeStart')} <span className="text-xs text-muted-foreground"></span>
            </Label>
            <div className="mt-1.5 flex items-center gap-2">
              <Input
                id="range-start"
                value={rangeStart || ''}
                onChange={(e) => setRangeStart(e.target.value.trim().toUpperCase() || null)}
                placeholder="A2"
                className="font-mono w-32"
              />
              <span className="text-muted-foreground">→</span>
              <Input
                value={rangeEnd || ''}
                onChange={(e) => setRangeEnd(e.target.value.trim().toUpperCase() || null)}
                placeholder="Z100"
                className="font-mono w-32"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="range-end" className="flex items-center gap-1.5">
              {t('rangeEnd')} <span className="text-xs text-muted-foreground"></span>
            </Label>
            <div className="mt-1.5 flex items-center gap-2">
              <Input
                id="range-end"
                value={rangeStart || ''}
                onChange={(e) => setRangeStart(e.target.value.trim().toUpperCase() || null)}
                placeholder="A2"
                className="font-mono w-32"
              />
              <span className="text-muted-foreground">→</span>
              <Input
                value={rangeEnd || ''}
                onChange={(e) => setRangeEnd(e.target.value.trim().toUpperCase() || null)}
                placeholder="Z100"
                className="font-mono w-32"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              label=''
              id="include-action-col"
              checked={includesActionColumn}
              onCheckedChange={(checked) => {
                setIncludesActionColumn(!!checked);
              }}
            />
            <div className="grid gap-0.5 leading-none">
              <label
                htmlFor="include-action-col"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('autoY')}
              </label>
              <p className="text-xs text-muted-foreground">
                {t('autoYDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              label=''
              id="include-action-col"
              checked={includesActionColumn}
              onCheckedChange={(checked) => {
                setIncludesActionColumn(!!checked);
              }}
            />
            <div className="grid gap-0.5 leading-none">
              <label
                htmlFor="include-action-col"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('includeActionColumn')}
              </label>
              <p className="text-xs text-muted-foreground">
                {t('actionColumnDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Current status + quick summary */}
        <div className="space-y-3 flex flex-col justify-center">
          <div className="text-sm">
            <span className="font-medium">{t('currentRange')}:</span>{' '}
            <code className="bg-background px-1.5 py-0.5 rounded border text-primary">
              {rangeStart || '—'} → {rangeEnd || '—'}
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
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
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
