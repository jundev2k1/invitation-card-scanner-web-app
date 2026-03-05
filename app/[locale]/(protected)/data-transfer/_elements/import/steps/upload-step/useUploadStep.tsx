import Papa from 'papaparse';
import { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';

export const useUploadStep = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedPreview, setParsedPreview] = useState<any[]>([]);

  const parseFile = useCallback(async (selectedFile: File) => {
    setIsLoading(true);
    setParseError(null);
    setParsedPreview([]);

    try {
      let data: any[] = [];

      if (selectedFile.name.endsWith('.csv')) {
        // Parse CSV
        const text = await selectedFile.text();
        const result = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });

        if (result.errors.length > 0) {
          throw new Error(result.errors[0].message);
        }
        data = result.data;
      } else {
        // Parse Excel
        const arrayBuffer = await selectedFile.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        // Convert to array of objects with header as keys
        const headers = data[0] as string[];
        data = data.slice(1).map((row: any[]) =>
          headers.reduce((obj, header, i) => {
            obj[header] = row[i] ?? '';
            return obj;
          }, {} as Record<string, any>)
        );
      }

      setParsedPreview(data.slice(0, 20));
    } catch (err) {
      setParseError((err as Error).message || 'Failed to parse file');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
  }, []);

  return {
    file,
    isLoading,
    parseError,
    parsedPreview,
    onDrop,
    handleReset,
  };
};
