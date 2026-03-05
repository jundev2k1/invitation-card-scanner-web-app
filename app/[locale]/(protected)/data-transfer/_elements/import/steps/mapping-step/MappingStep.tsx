import { Columns } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMappingStep } from './useMappingStep';

export const MappingStep = () => {
  const t = useTranslations('dataTransfer.import.mapping');
  const { /* mappings, autoMatch */ } = useMappingStep();

  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg p-8">
      <Columns className="w-10 h-10 mb-4 opacity-60" />
      <p className="text-lg font-medium">{t('title')}</p>
      <p className="text-sm mt-2 text-center max-w-lg">{t('desc')}</p>

      {/* TODO: Implement two-panel drag-drop or select mapping */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Source Columns (from file) → Target Fields
        <br />
        (Drag-drop / dropdown mapping UI sẽ ở đây)
      </div>
    </div>
  );
};
