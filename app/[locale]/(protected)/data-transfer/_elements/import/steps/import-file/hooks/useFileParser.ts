import { Toast } from '@/root/app/components';
import { ImportConfig } from '@/root/config/import-file';
import Papa from 'papaparse';
import { useCallback } from 'react';
import * as XLSX from 'xlsx';
import { columnToNumber, extract } from '../../range-step/useRangeStepForm';

interface useFileParserProps {
  config: ImportConfig | null
}

export const useFileParser = ({ config }: useFileParserProps) => {
  const parseFile = useCallback(async (selectedFile: File): Promise<{ data: any[][]; headers: string[] }> => {
    if (!config) return { data: [], headers: [] };

    try {
      let rawData: any[][] = [];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';

      // 1. Parse File Content
      if (fileExtension === 'csv') {
        const text = await selectedFile.text();
        const result = Papa.parse(text, { header: false, skipEmptyLines: 'greedy' });
        rawData = result.data as any[][];
      } else if (['xlsx', 'xls'].includes(fileExtension)) {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '', blankrows: true }) as any[][];
      } else {
        Toast.showError('Unsupported file format.');
        return { data: [], headers: [] };
      }

      if (!rawData.length) return { data: [], headers: [] };

      debugger
      // 2. Identify Header Row (Default to Row 1 if not specified)
      const headerIdx = config.uploadStep?.columnRow || 0;
      const headers = (rawData[headerIdx] || []).map(val => String(val ?? ''));

      // 3. Extraction Logic (Bounding Box)
      const rangeStep = config.rangeStep;
      const start = extract(rangeStep?.rangeStart || null);
      const end = extract(rangeStep?.rangeEnd || null);

      // CASE: Read all data if start/end positions are null
      if (!start || !end) {
        return {
          data: rawData.slice(headerIdx + 1),
          headers: headers
        };
      }

      // CASE: Bounding Box Extraction
      const colStartIdx = columnToNumber(start.c) - 1;
      const colEndIdx = columnToNumber(end.c) - 1;
      
      /** 
       * Row Handling:
       * - Start from start.r but always ensure we skip the header row.
       * - If autoScaleY is true (default), ignore end.r and take until end of file.
       */
      const rowStartIdx = Math.max(headerIdx + 1, start.r - 1);
      const autoScaleY = rangeStep?.autoScaleY !== false; 
      const rowEndIdx = autoScaleY ? rawData.length : end.r;

      const processedData = rawData
        .slice(rowStartIdx, rowEndIdx)
        .map(row => row.slice(colStartIdx, colEndIdx + 1));

      return {
        data: processedData,
        headers: headers
      };

    } catch (err) {
      console.error("File Processing Error:", err);
      Toast.showError('An error occurred while processing the file.');
      return { data: [], headers: [] };
    }
  }, [config]);

  return { parseFile };
};
