import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useValidateStep } from './useValidateStep';

export const ValidateStep = () => {
  const t = useTranslations('dataTransfer.import.validate');
  const { issues } = useValidateStep();

  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg p-8">
      <CheckCircle2 className="w-10 h-10 mb-4 opacity-60" />
      <p className="text-lg font-medium">{t('title')}</p>
      <p className="text-sm mt-2 text-center max-w-lg">{t('desc')}</p>

      {/* TODO: List issues */}
      {issues.length === 0 ? (
        <p className="mt-6 text-green-600 dark:text-green-400">{t('noIssues')}</p>
      ) : (
        <div className="mt-6 text-destructive text-sm">
          {/* Render issues list */}
        </div>
      )}
    </div>
  );
};
