import { Badge, Separator } from '@/components';
import { FileDownIcon, FileUpIcon, InfoIcon, LayoutGridIcon } from "@/icons";
import { useTranslations } from 'next-intl';
import { ExportConfig, ImportConfig } from '../../../type';

type PreviewHeaderProps = {
  config: ExportConfig | ImportConfig | null;
  type: 'export' | 'import';
};

export const PreviewHeader = ({ config, type }: PreviewHeaderProps) => {
  const t = useTranslations('dataTransfer');

  if (!config) return null;

  const isImport = type === 'import';
  const importConfig = config as ImportConfig;

  return (
    <div className="space-y-6 mb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            {isImport ? (
              <FileUpIcon className="w-5 h-5 text-primary" />
            ) : (
              <FileDownIcon className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold leading-tight text-primary">{config.name}</h3>
            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
              <InfoIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-75 text-muted-foreground">
                {config.description || t('export.noDescription')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="secondary" className="px-3 py-1 capitalize">
            {type} Mode
          </Badge>
          {isImport && importConfig?.range?.rangeStart && (
            <Badge
              variant="outline"
              className="border-emerald-500/50 text-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-700/50"
            >
              {t('import.dataRange')}: {importConfig.range?.rangeStart}
              {importConfig.range?.rangeEnd && ` → ${importConfig.range.rangeEnd}`}
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="space-y-1.5">
          <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
            {t('export.totalColumns')}
          </span>
          <div className="flex items-center gap-2 text-sm font-mono">
            <LayoutGridIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary">
              {config.columns?.length || 0} {t('export.fields')}
            </span>
          </div>
        </div>

        {isImport && (
          <div className="space-y-1.5">
            <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
              {t('import.range.ignoredColumns')}
            </span>
            <div className="text-sm font-mono text-destructive">
              {importConfig.columns?.filter((c) => c.ignore).length || 0} {t('export.fields')}
            </div>
          </div>
        )}

        <div className="space-y-1.5 col-span-1 sm:col-span-2">
          <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
            {t('export.mappingPreview')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {config.columns?.slice(0, 6).map((col) => (
              <span
                key={col.id}
                className="text-xs bg-muted/60 px-2 py-0.5 rounded border border-border/50 truncate max-w-30 text-muted-foreground"
              >
                {col.alias || col.matchingKey}
              </span>
            ))}
            {config.columns && config.columns.length > 6 && (
              <span className="text-xs text-muted-foreground self-center">+{config.columns.length - 6}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
