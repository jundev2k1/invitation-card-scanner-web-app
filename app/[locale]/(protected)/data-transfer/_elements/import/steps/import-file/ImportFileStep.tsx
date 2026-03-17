import {
  Alert,
  Badge,
  Button,
  Progress,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  FileTextIcon,
  UploadIcon,
} from "@/icons";
import { cn } from '@/lib/utils';
import { ImportConfig } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { useImportFileStep } from './useImportFileStep';

type ImportFileStepProps = {
  config: ImportConfig | null;
  onImportSuccess?: (result: { successCount: number; errorCount: number; logs: string[] }) => void;
};

export const ImportFileStep = ({ config, onImportSuccess }: ImportFileStepProps) => {
  const t = useTranslations('dataTransfer.import.importFile');
  const {
    file,
    isUploading,
    progress,
    result,
    validationErrors,
    previewData,
    getRootProps,
    getInputProps,
    isDragActive,
    handleRemoveFile,
    handleImport,
  } = useImportFileStep({ config, onImportSuccess });

  const hasErrors = validationErrors.length > 0;

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
      {/* Upload Area */}
      {previewData.headers.length === 0 && (
        <div
          {...getRootProps()}
          className={cn(
            'flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-10 transition-colors cursor-pointer',
            isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-muted/30',
            isUploading && 'opacity-50 pointer-events-none'
          )}
        >
          <input {...getInputProps()} />
          <UploadIcon className="w-16 h-16 mb-6 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">{t('upload.title')}</p>
          <p className="text-sm text-muted-foreground mb-6">{t('upload.desc')}</p>
          <Button variant="outline" size="lg" disabled={isUploading || !config}>
            {t('upload.button')}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">{t('upload.supported')}</p>
        </div>
      )}

      {/* File Info */}
      {file && !result && (
        <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <FileTextIcon className="w-8 h-8 text-primary" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemoveFile} disabled={isUploading}>
            {t('actions.remove')}
          </Button>
        </div>
      )}

      {/* Short Preview */}
      {previewData.headers.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-4 py-2 font-medium text-sm">
            {t('preview.title')}
          </div>
          <ScrollArea className="h-64">
            <Table>
              <TableHeader>
                <TableRow>
                  {previewData.headers.map((key, index) => {
                    const mappingField = config?.mappingStep?.mappings.find((m) => m.src === index);
                    const mappedKey = mappingField ? mappingField.dest : key;
                    return (
                      <TableHead key={key} className="text-left">{key}</TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.data.map((row, idx) => (
                  <TableRow key={idx}>
                    {Object.values(row).map((val, i) => (
                      <TableCell key={i}>{String(val ?? '')}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {/* Validation Errors */}
      <Alert
        variant={hasErrors ? 'destructive' : 'default'}
        icon={hasErrors ? <AlertTriangleIcon /> : <CheckCircleIcon className="text-green-600" />}
        title={hasErrors ? t('validate.errorsTitle') : t('validate.passedTitle')}
        containerClassName="mt-4 text-lg"
        className='mt-2'
      >
        {hasErrors ? (
          <>
            {/* Summary */}
            <div className="flex items-center gap-6 text-sm mt-2">
              <span>
                <Badge className="rounded" variant="destructive">
                  {validationErrors.length}
                </Badge>
                {" "}
                {t('validate.fieldsWithErrors')}
              </span>

              <span>
                <Badge className="rounded" variant="destructive">
                  {validationErrors.reduce((acc, e) => acc + e.messages.length, 0)}
                </Badge>
                {" "}
                {t("validate.totalErrors")}
              </span>
            </div>

            {/* Error list */}
            <ScrollArea className="w-full max-h-200 mt-4 border rounded-md">
              <div className="divide-y">

                {validationErrors.map((err, i) => (
                  <details key={i} className="group p-3">

                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <div className="flex items-center gap-3">

                        <span className="font-semibold text-destructive">
                          {err.field}
                        </span>

                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                          {err.messages.length} errors
                        </span>

                      </div>

                      <ChevronDownIcon className="w-4 h-4 transition group-open:rotate-180" />
                    </summary>

                    <ul className="mt-3 pl-6 space-y-1 text-sm text-destructive/90 list-disc">
                      {err.messages.map((msg, j) => (
                        <li key={j}>{msg}</li>
                      ))}
                    </ul>

                  </details>
                ))}

              </div>
            </ScrollArea>
          </>
        ) : (
          <p className="text-green-600">{t('validate.passedMessage')}</p>
        )}
      </Alert>

      {/* Progress */}
      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            {t('progress.importing')} {progress}%
          </p>
        </div>
      )}

      {/* Import Button */}
      {!result && (
        <div className="flex justify-end">
          <Button
            onClick={handleImport}
            disabled={!file || !config || isUploading || hasErrors}
            isLoading={isUploading}
          >
            {t('actions.import')}
          </Button>
        </div>
      )}
    </div>
  );
};
