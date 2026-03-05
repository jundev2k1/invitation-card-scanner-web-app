import { Button } from '@/components';
import { SquareMousePointerIcon } from "@/icons";
import { useTranslations } from 'next-intl';
import { ImportConfig } from '../../../../type';
import { useRangeStep } from './useRangeStep';

type RangeStepProps = {
  config: ImportConfig | null;
};

export const RangeStep = ({ config }: RangeStepProps) => {
  const t = useTranslations('dataTransfer.import.range');
  const { rangeStart, rangeEnd, handleAutoDetect } = useRangeStep();

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Grid preview placeholder */}
      <div className="flex-1 border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center text-muted-foreground">
        <div className="text-center p-8">
          <SquareMousePointerIcon className="w-10 h-10 mx-auto mb-4 opacity-60" />
          <p className="text-lg font-medium">{t('title')}</p>
          <p className="text-sm mt-2">{t('desc')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleAutoDetect}>
          {t('autoDetect')}
        </Button>
        <p className="text-sm text-muted-foreground">
          {t('currentRange')}: {rangeStart || '—'} → {rangeEnd || '—'}
        </p>
      </div>
    </div>
  );
};
