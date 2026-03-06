import Papa from 'papaparse';
import { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadStepProps } from './UploadStep';

export const useUploadStep = ({ onTemplateChange, templateSetting }: UploadStepProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedPreview, setParsedPreview] = useState<string[][]>([]);
  const [headerRow, setHeaderRow] = useState<number>(0);

  const parseFile = useCallback(async (selectedFile: File) => {
    setIsLoading(true);
    setParseError(null);
    setParsedPreview([]);

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

      setParsedPreview(rawData);
      onTemplateChange?.({
        name: selectedFile.name,
        extension: fileExtension as 'csv' | 'xlsx' | 'xls',
        data: [...rawData.slice(headerRow, rawData.length)]
      });
    } catch (err) {
      setParseError((err as Error).message || 'Failed to parse file');
    } finally {
      setIsLoading(false);
    }
  }, [onTemplateChange]);

  const onHeaderRowChange = useCallback((row: number) => {
    setHeaderRow(row);
    onTemplateChange?.({
      name: templateSetting?.name || '',
      extension: templateSetting?.extension || 'xlsx',
      data: [...parsedPreview.slice(row, parsedPreview.length)]
    });
  }, [parsedPreview, headerRow]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      parseFile(selectedFile);
    }
  }, [parseFile]);

  const handleReset = useCallback(() => {
    setFile(null);
    setParsedPreview([]);
    setParseError(null);
    onTemplateChange(null);
  }, []);

  return {
    file,
    isLoading,
    parseError,
    parsedPreview,
    onDrop,
    handleReset,
    headerRow,
    onHeaderRowChange,
  };
};
