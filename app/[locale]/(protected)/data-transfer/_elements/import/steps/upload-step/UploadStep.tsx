import { Alert, Button } from '@/components';
import { FileTextIcon, InfoIcon, LoaderIcon, UploadIcon } from "@/icons";
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { useUploadStep } from './useUploadStep';

export const UploadStep = () => {
  const t = useTranslations('dataTransfer.import.upload');
  const {
    file,
    isLoading,
    parseError,
    parsedPreview,
    onDrop,
    handleReset,
  } = useUploadStep();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
      {/* Drag-drop area */}
      <div
        {...getRootProps()}
        className={cn(
          'flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-10 transition-colors cursor-pointer',
          isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-muted/30'
        )}
      >
        <input {...getInputProps()} />
        <UploadIcon className="w-16 h-16 mb-6 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">{t('title')}</p>
        <p className="text-sm text-muted-foreground mb-6">{t('desc')}</p>
        <Button variant="outline" size="lg" disabled={isLoading}>
          {t('button')}
        </Button>
        <p className="text-xs text-muted-foreground mt-4">{t('supported')}</p>
      </div>

      {/* File info & actions */}
      {file && (
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
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Remove
          </Button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-sm">Parsing file...</span>
        </div>
      )}

      {/* Error */}
      {parseError && (
        <Alert variant="destructive" icon={<InfoIcon />} title={"Error"}>
          {parseError}
        </Alert>
      )}

      {/* Mini Preview Table */}
      {parsedPreview && parsedPreview.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-4 py-2 font-medium text-sm">
            {t('previewTitle')}
          </div>
          <div className="max-h-80 overflow-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/70">
                  {Object.keys(parsedPreview[0] || {}).map((key) => (
                    <th key={key} className="border px-4 py-2 text-left font-medium">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedPreview.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="border-t hover:bg-muted/30">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="border px-4 py-2">
                        {String(val ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
