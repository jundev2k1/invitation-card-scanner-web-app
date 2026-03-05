import { Alert, Badge, Button, ScrollArea } from '@/components';
import { AlertTriangleIcon, CheckCheckIcon, InfoIcon, XCircleIcon } from "@/icons";
import { useTranslations } from 'next-intl';
import { ImportConfig } from '../../../../type';
import { useValidateStep } from './useValidateStep';

type ValidateStepProps = {
  config: ImportConfig | null;
  parsedData?: any[];
  mappings?: Record<string, { source: string; ignore?: boolean }>;
  rangeStart?: string | null;
  rangeEnd?: string | null;
  includesActionColumn?: boolean;
  onSave?: () => void;
};

export const ValidateStep = ({
  config,
  parsedData = [],
  mappings = {},
  rangeStart = null,
  rangeEnd = null,
  includesActionColumn = false,
  onSave,
}: ValidateStepProps) => {
  const t = useTranslations('dataTransfer.import.validate');
  const { issues, summary, isValid } = useValidateStep({
    config,
    parsedData,
    mappings,
    rangeStart,
    rangeEnd,
    includesActionColumn,
  });

  return (
    <div className="flex flex-col h-full space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{t('title')}</h3>
          <p className="text-sm text-muted-foreground">{t('desc')}</p>
        </div>
        <Badge variant={isValid ? 'default' : 'destructive'} className="px-4 py-1 text-sm">
          {isValid ? t('noIssues') : `${issues.length} issues found`}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 bg-muted/20">
          <div className="text-sm text-muted-foreground">{t('rowCount')}</div>
          <div className="text-2xl font-bold mt-1">
            {summary.rowCount || 0}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-muted/20">
          <div className="text-sm text-muted-foreground">{t('ignoredCount')}</div>
          <div className="text-2xl font-bold mt-1">
            {summary.ignoredColumns || 0}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-muted/20">
          <div className="text-sm text-muted-foreground">Mapped Fields</div>
          <div className="text-2xl font-bold mt-1">
            {summary.mappedFields || 0} / {summary.totalTargets || 0}
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 border rounded-lg overflow-hidden bg-background">
        <div className="bg-muted/50 px-4 py-3 font-medium border-b flex items-center gap-2">
          <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
          Validation Issues
        </div>
        <ScrollArea className="h-[calc(100%-44px)]">
          {issues.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
              <CheckCheckIcon className="w-12 h-12 mb-4 text-green-600" />
              <p className="text-lg font-medium">{t('noIssues')}</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {issues.map((issue, idx) => (
                <Alert
                  key={idx}
                  variant={issue.severity === 'error' ? 'destructive' : 'default'}
                  icon={issue.severity === 'error' ? (
                    <XCircleIcon className="h-5 w-5 mt-0.5" />
                  ) : (
                    <InfoIcon className="h-5 w-5 mt-0.5 text-amber-600" />
                  )}
                  title={issue.title}
                >
                  {issue.description}
                </Alert>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t">
        <Button variant="outline" disabled={!isValid}>
          Back to Range
        </Button>
        <Button onClick={onSave} disabled={!isValid}>
          Save Configuration
        </Button>
      </div>
    </div>
  );
};
