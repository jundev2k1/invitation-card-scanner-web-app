import { Button } from '@/components';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUploadStep } from './useUploadStep';

export const UploadStep = () => {
  const t = useTranslations('dataTransfer.import.upload');
  const { file, handleFileChange } = useUploadStep();

  return (
    <div className="h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-muted/20 p-8">
      <Upload className="w-12 h-12 mb-4 opacity-60" />
      <p className="text-lg font-medium">{t('title')}</p>
      <p className="text-sm mt-2 text-center max-w-md">{t('desc')}</p>

      <div className="mt-6">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button>{t('button')}</Button>
        </label>
      </div>

      <p className="text-xs mt-4 text-muted-foreground">{t('supported')}</p>
      {file && <p className="mt-4 text-sm text-primary">Selected: {file.name}</p>}
    </div>
  );
};
