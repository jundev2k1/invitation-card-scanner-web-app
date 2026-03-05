import { Button, Checkbox } from '@/components';
import { RotateCcwIcon } from "@/icons";
import { useTranslations } from 'next-intl';
import { PreviewTable } from '../../../../_shared/preview/table/PreviewTable';
import { ImportConfig } from '../../../../type';
import { useRangeStep } from './useRangeStep';

type RangeStepProps = {
  config: ImportConfig | null;
  parsedData?: any[];
};

export const RangeStep = ({ config, parsedData = [] }: RangeStepProps) => {
  const tGlobal = useTranslations('common');
  const tLocal = useTranslations('dataTransfer.import.range');
  const {
    rangeStart,
    rangeEnd,
    isSelecting,
    handleMouseDown,
    handleMouseOver,
    handleMouseUp,
    handleAutoDetect,
    handleReset,
    includesActionColumn,
    toggleActionColumn,
  } = useRangeStep({ config, parsedData });

  return (
    <div className="flex flex-col h-full space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{tLocal('title')}</h3>
          <p className="text-sm text-muted-foreground">{tLocal('desc')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAutoDetect}>
            {tLocal('autoDetect')}
          </Button>
          <Button leftIcon={<RotateCcwIcon />} variant="secondary" onClick={handleReset}>
            {tGlobal('actions.reset')}
          </Button>
        </div>
      </div>

      {/* Interactive Preview Grid */}
      <div
        className="flex-1 border rounded-lg overflow-hidden bg-background relative"
        onMouseUp={handleMouseUp}
      >
        <PreviewTable
          config={config}
          type="import"
          data={parsedData}
          interactive
          onCellMouseDown={handleMouseDown}
          onCellMouseOver={handleMouseOver}
          selectedRangeStart={rangeStart}
          selectedRangeEnd={rangeEnd}
        />
      </div>

      {/* Summary & Action Column */}
      <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="action-column"
              label={tLocal('actionColumn')}
              checked={includesActionColumn}
              onCheckedChange={toggleActionColumn}
            />
          </div>
          <p className="text-xs text-muted-foreground italic">
            {tLocal('actionDesc')}
          </p>
        </div>

        <div className="text-sm font-medium">
          {tLocal('currentRange')}: {rangeStart || 'Not selected'} → {rangeEnd || 'Not selected'}
        </div>
      </div>
    </div>
  );
};
