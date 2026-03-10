import Papa from 'papaparse';
import { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadStepProps } from './UploadStep';

export const useUploadStep = ({ templateSetting, onTemplateChange, onTemplateClear }: UploadStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const parseFile = useCallback(async (selectedFile: File) => {
    setIsLoading(true);
    setParseError(null);

    try {
      const fileExtension = selectedFile.name.split('.').pop() || '';
      if (!['csv', 'xlsx', 'xls'].includes(fileExtension)) throw new Error('CSV files are not supported.');

      let rawData: string[][] = [];

      if (selectedFile.name.endsWith('.csv')) {
        const text = await selectedFile.text();
        const result = Papa.parse(text, {
          header: false,
          skipEmptyLines: 'greedy',
        });
        rawData = result.data as any[][];
      } else {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        rawData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
          blankrows: true
        }) as string[][];
      }

      onTemplateChange?.({
        columnRow: 0,
        name: selectedFile.name,
        extension: fileExtension as 'csv' | 'xlsx' | 'xls',
        size: selectedFile.size,
        fileData: rawData,
      });
    } catch (err) {
      setParseError((err as Error).message || 'Failed to parse file');
    } finally {
      setIsLoading(false);
    }
  }, [templateSetting, onTemplateChange]);

  const onHeaderRowChange = useCallback((row: number) => {
    onTemplateChange?.({
      columnRow: row,
      name: templateSetting?.name || null,
      extension: templateSetting?.extension || null,
      size: templateSetting?.size || null,
      fileData: templateSetting?.fileData || [],
    });
  }, [templateSetting, onTemplateChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      parseFile(selectedFile);
    }
  }, [templateSetting, onTemplateChange]);

  const handleReset = useCallback(() => {
    setParseError(null);
    onTemplateClear();
  }, []);

  return {
    isLoading,
    parseError,
    parsedPreview: templateSetting?.fileData || [],
    onDrop,
    handleReset,
    headerRow: templateSetting?.columnRow || 0,
    onHeaderRowChange,
  };
};
