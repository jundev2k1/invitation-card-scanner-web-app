import { useMemo } from 'react';
import { ImportConfig } from '../../../../type';

type ValidationIssue = {
  severity: 'error' | 'warning';
  title: string;
  description: string;
};

type UseValidateStepProps = {
  config: ImportConfig | null;
  parsedData: any[];
  mappings: Record<string, { source: string; ignore?: boolean }>;
  rangeStart: string | null;
  rangeEnd: string | null;
  includesActionColumn: boolean;
};

export const useValidateStep = ({
  config,
  parsedData,
  mappings,
  rangeStart,
  rangeEnd,
  includesActionColumn,
}: UseValidateStepProps) => {
  const issues: ValidationIssue[] = useMemo(() => {
    const result: ValidationIssue[] = [];

    // 1. Required fields missing mapping
    config?.columns?.forEach((col) => {
      if (col.required && !mappings[col.matchingKey]) {
        result.push({
          severity: 'error',
          title: 'Missing Mapping for Required Field',
          description: `The required field "${col.matchingKey}" has no mapped source column.`,
        });
      }
    });

    // 2. Range validation
    if (!rangeStart || !rangeEnd) {
      result.push({
        severity: 'error',
        title: 'No Data Range Selected',
        description: 'Please select a valid data range in the previous step.',
      });
    } else {
      const startRow = Number(rangeStart.replace(/\D/g, '')) || 1;
      const endRow = Number(rangeEnd.replace(/\D/g, '')) || 1;
      if (endRow <= startRow) {
        result.push({
          severity: 'error',
          title: 'Invalid Range',
          description: 'End row must be greater than start row.',
        });
      }
    }

    // 3. Data in range check (nếu parsedData có)
    if (parsedData.length > 0 && rangeStart && rangeEnd) {
    }

    // 4. Ignored columns count warning nếu quá nhiều
    const ignoredCount = config?.columns?.filter((c) => c.ignore).length || 0;
    if (ignoredCount > 5) {
      result.push({
        severity: 'warning',
        title: 'High Number of Ignored Columns',
        description: `${ignoredCount} columns are ignored. Ensure this is intentional.`,
      });
    }

    // 5. Action column if enabled
    if (includesActionColumn) {
      result.push({
        severity: 'warning',
        title: 'Action Column Enabled',
        description: 'The action column is enabled. Ensure this is intentional.',
      });
    }

    return result;
  }, [config, parsedData, mappings, rangeStart, rangeEnd, includesActionColumn]);

  const summary = useMemo(() => ({
    rowCount: parsedData.length,
    ignoredColumns: config?.columns?.filter((c) => c.ignore).length || 0,
    mappedFields: Object.keys(mappings).length,
    totalTargets: config?.columns?.length || 0,
  }), [config, parsedData, mappings]);

  const isValid = issues.every((i) => i.severity !== 'error');

  return {
    issues,
    summary,
    isValid,
  };
};
