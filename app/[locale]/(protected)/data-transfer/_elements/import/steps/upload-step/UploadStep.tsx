import { Alert, Button, Input } from '@/components';
import { FileTextIcon, InfoIcon, LoaderIcon, UploadIcon } from "@/icons";
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { FileTemplateValues } from '../../setting/importSettings.type';
import { useUploadStep } from './useUploadStep';

export interface UploadStepProps {
  templateSetting: FileTemplateValues | null,
  onTemplateChange: (file: FileTemplateValues) => void,
  onTemplateClear: () => void,
  noConfigSelected?: boolean,
}

export const UploadStep = ({
  noConfigSelected,
  templateSetting,
  onTemplateChange,
  onTemplateClear,
}: UploadStepProps) => {
  const tPlaceholder = useTranslations('dataTransfer.placeholder');
  const tActions = useTranslations('common.actions');
  const tUpload = useTranslations('dataTransfer.import.upload');
  const {
    isLoading,
    parseError,
    onDrop,
    handleReset,
    headerRow,
    onHeaderRowChange,
  } = useUploadStep({ templateSetting, onTemplateChange, onTemplateClear });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  if (noConfigSelected) return (
    <div className="h-full flex flex-col space-y-6 p-6">
      <Alert
        title={tPlaceholder('noConfigSelectedTitle')}
        variant="destructive"
        icon={<InfoIcon />}
      >
        {tPlaceholder('noConfigSelectedDesc')}
      </Alert>
    </div>
  );

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
        <p className="text-lg font-medium mb-2">{tUpload('title')}</p>
        <p className="text-sm text-muted-foreground mb-6">{tUpload('desc')}</p>
        <Button variant="outline" size="lg" disabled={isLoading}>
          {tUpload('button')}
        </Button>
        <p className="text-xs text-muted-foreground mt-4">{tUpload('supported')}</p>
      </div>

      {/* File info & actions */}
      {templateSetting?.name && (
        <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <FileTextIcon className="w-8 h-8 text-primary" />
            <div>
              <p className="font-medium">{templateSetting.name}</p>
              <p className="text-xs text-muted-foreground">
                {((templateSetting.size || 0) / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            {tActions('delete')}
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
      {templateSetting && templateSetting.fileData.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-4 py-2 font-medium text-sm">
            {tUpload('previewTitle')}
          </div>
          <div className="max-h-80 overflow-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {templateSetting.fileData.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className={cn("border-t hover:bg-muted/30", idx === headerRow && "bg-muted/70")}>
                    <td className="border px-2 py-2 text-center">
                      <Input
                        className="cursor-pointer text-sm w-4 h-4"
                        type="radio"
                        name="setAsHeader"
                        checked={headerRow === idx}
                        onChange={() => onHeaderRowChange(idx)}
                      />
                    </td>
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

      {/* Helpful instruction block */}
      <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="space-y-2">
            <p className="font-medium text-blue-800 dark:text-blue-300">
              {tUpload('howTo.title')}
            </p>
            <ul className="text-muted-foreground space-y-1.5 list-disc pl-5 text-sm">
              <li>{tUpload('howTo.items.format')}</li>
              <li>{tUpload('howTo.items.preview')}</li>
              <li>{tUpload('howTo.items.headerSelect')}</li>
              <li>{tUpload('howTo.items.flowMapping')}</li>
              <li>{tUpload('howTo.items.flowRange')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
