import type { ImportConfig } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useFileParser } from './hooks/useFileParser';
import { useFileUpload } from './hooks/useFileUpload';
import { useImportProgress } from './hooks/useImportProgress';
import { validateImportData, type ValidationError } from './hooks/validateImportData';

/**
 * Main hook for the Import File step.
 * Orchestrates file upload, parsing, frontend validation, progress simulation, and server import.
 */
export const useImportFileStep = ({
  config,
  onImportSuccess,
}: {
  config: ImportConfig | null;
  onImportSuccess?: (result: { successCount: number; errorCount: number; logs: string[] }) => void;
}) => {
  const t = useTranslations('dataTransfer.import.importFile');

  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ successCount: number; errorCount: number; logs: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [previewData, setPreviewData] = useState<{ headers: any[], data: any[][] }>({ headers: [], data: [] });
  const [progress, setProgress] = useState(0);
  const { parseFile } = useFileParser({ config: config });

  const uploadHook = useFileUpload(async (file) => {
    const { data, headers } = await parseFile(file);

    // Show preview of first 10 rows
    setPreviewData({ headers, data: data.slice(0, 10) });

    // Run frontend validation using pure function
    const errors = validateImportData(t, data, config);
    setValidationErrors(errors);

    // Set general error message if validation fails
    if (errors.length > 0) {
      setError(t('validation.generalError'));
    }
  });

  const { simulateProgress } = useImportProgress();

  const handleImport = useCallback(async () => {
    if (!uploadHook.file || !config) return;

    setIsUploading(true);
    setError(null);

    try {
      const clearInterval = simulateProgress();

      const formData = new FormData();
      formData.append('file', uploadHook.file);
      formData.append('configId', config.id || '');
      formData.append('module', config.module?.toString() || '');

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      clearInterval();
      setProgress(100);

      if (!response.ok) {
        throw new Error(t('import.failed'));
      }

      const data = await response.json();
      setResult({
        successCount: data.successCount || 0,
        errorCount: data.errorCount || 0,
        logs: data.logs || [],
      });

      onImportSuccess?.(data);
    } catch (err) {
      setError((err as Error).message || t('import.failedTryAgain'));
    } finally {
      setIsUploading(false);
    }
  }, [uploadHook.file, config, onImportSuccess, simulateProgress, t]);

  return {
    file: uploadHook.file,
    isUploading,
    progress,
    result,
    error,
    validationErrors,
    previewData,
    getRootProps: uploadHook.getRootProps,
    getInputProps: uploadHook.getInputProps,
    isDragActive: uploadHook.isDragActive,
    handleRemoveFile: () => {
      uploadHook.setFile(null);
      setPreviewData({ headers: [], data: [] });
      setValidationErrors([]);
    },
    handleImport,
  };
};
