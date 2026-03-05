import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { ExportConfig, ImportConfig } from '../../../type';
import { useMappedColumns } from './useMappedColumns';

type PreviewTableProps = {
  config: ExportConfig | ImportConfig | null;
  type: 'export' | 'import';
  data?: any[];
};

export const PreviewTable = ({ config, type, data = [] }: PreviewTableProps) => {
  const t = useTranslations('dataTransfer');
  const [selectedCell, setSelectedCell] = useState<[string, string]>(['A', '1']);
  const [selCol, selRow] = selectedCell;

  const alphabet = useMemo(() => Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), []);

  const rows = useMemo(() => {
    const rowCount = Math.max(data.length + 1, 50);
    return Array.from({ length: rowCount }, (_, i) => String(i + 1));
  }, [data.length]);

  const mappedCols = useMappedColumns(config?.columns ?? []);

  const getFormatStyles = useCallback((format?: string) => {
    const f = format?.toLowerCase();
    switch (f) {
      case 'number':
      case 'currency':
        return 'justify-end text-blue-600 dark:text-blue-400 font-mono';
      case 'boolean':
        return 'justify-center text-orange-600 dark:text-orange-400 font-bold';
      case 'date':
      case 'datetime':
        return 'justify-start text-emerald-600 dark:text-emerald-400';
      case 'image':
        return 'justify-center text-purple-600 italic';
      default:
        return 'justify-start';
    }
  }, []);

  const formatValue = useCallback((val: any, format?: string) => {
    if (val == null) return '';

    const f = format?.toLowerCase();
    switch (f) {
      case 'date':
      case 'datetime':
        return '[Date]';
      case 'number':
      case 'currency':
        return '[Number]';
      case 'boolean':
        return '[Boolean]';
      case 'image':
        return '[Image]';
      default:
        return String(val);
    }
  }, []);

  const isCellInRange = useCallback((current: string, start?: string, end?: string) => {
    if (!start || !end) return current === start;

    const parse = (pos: string) => ({
      col: pos.replace(/\d+/g, ''),
      row: Number(pos.replace(/\D+/g, '')),
    });

    const s = parse(start);
    const e = parse(end);
    const c = parse(current);

    return c.col >= s.col && c.col <= e.col && c.row >= s.row && c.row <= e.row;
  }, []);

  if (!config || !mappedCols.length) {
    return (
      <div className="h-full min-h-100 border rounded-lg flex items-center justify-center text-muted-foreground text-sm bg-muted/30">
        {t('export.previewNoConfig')}
      </div>
    );
  }

  const isImport = type === 'import';
  const importConfig = config as ImportConfig;

  return (
    <div className="excel-wrapper grow border rounded-md shadow-sm bg-background overflow-hidden">
      <Table className="border-separate border-spacing-0">
        <TableHeader className="sticky top-0 z-30 bg-muted/90 backdrop-blur-sm">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="sticky left-0 top-0 z-40 w-12 h-9 border-b border-r bg-muted/90 backdrop-blur-sm p-0 text-center text-xs font-medium" />
            {alphabet.map((char) => (
              <TableHead
                key={char}
                className={cn(
                  'w-37.5 min-w-37.5 border-b border-r text-center sticky top-0 px-3 text-xs font-medium transition-colors',
                  selCol === char
                    ? 'bg-primary/15 text-primary border-b-primary'
                    : 'bg-muted/70 text-muted-foreground/80'
                )}
              >
                {char}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((rowNum, rowIndex) => {
            const isIgnoredRow =
              isImport &&
              importConfig.columns?.some((c) => c.ignore && c.order.toString() === rowNum);

            return (
              <TableRow
                key={rowNum}
                className={cn(
                  'hover:bg-transparent border-none transition-colors',
                  isIgnoredRow && 'bg-destructive/5'
                )}
              >
                <TableCell
                  className={cn(
                    'sticky left-0 z-20 w-12 h-9 border-b border-r bg-muted/70 p-0 text-center text-xs font-medium transition-colors',
                    selRow === rowNum && 'bg-primary/15 text-primary border-r-primary',
                    isIgnoredRow && 'bg-destructive/15 text-destructive border-r-destructive font-semibold'
                  )}
                >
                  {rowNum}
                </TableCell>

                {alphabet.map((char) => {
                  const pos = `${char}${rowNum}`;
                  const colDef = mappedCols.find((c) => c.letter === char);
                  const isActive = selCol === char && selRow === rowNum;
                  const format = (colDef as any)?.format;

                  const inRange =
                    isImport &&
                    isCellInRange(pos, importConfig.leftTopPos, importConfig.rightBottomPos);

                  const rawValue = rowIndex > 0 ? data[rowIndex - 1]?.[colDef?.matchingKey ?? ''] : '';
                  const cellValue = formatValue(rawValue, format);

                  return (
                    <TableCell
                      key={pos}
                      className="p-0 w-37.5 min-w-37.5"
                      onClick={() => setSelectedCell([char, rowNum])}
                    >
                      <div
                        className={cn(
                          'h-9 w-full border-b border-r px-3 flex items-center text-xs transition-colors cursor-cell relative',
                          getFormatStyles(format),
                          isActive && 'ring-2 ring-primary/60 ring-inset bg-primary/5 dark:bg-primary/10',
                          inRange && !isActive && !isIgnoredRow && 'bg-emerald-100/60 dark:bg-emerald-900/30',
                          !isActive && !inRange && !isIgnoredRow && 'hover:bg-muted/40',
                          isIgnoredRow && 'opacity-60'
                        )}
                      >
                        <span
                          className={cn(
                            'truncate w-full',
                            rowNum === '1' && colDef && 'font-semibold italic',
                            isIgnoredRow && 'text-destructive/70 line-through select-none'
                          )}
                        >
                          {rowNum === '1' && colDef
                            ? (colDef.alias || colDef.matchingKey)
                            : cellValue}

                          {isIgnoredRow && rowNum !== '1' && (
                            <span className="ml-1 text-[10px] font-medium">({t('import.ignored')})</span>
                          )}
                        </span>

                        {isImport && pos === importConfig.leftTopPos && (
                          <div className="absolute -top-0.5 -left-0.5 bg-emerald-600 text-[9px] text-white px-1.5 py-0.5 font-bold rounded-br shadow-sm uppercase select-none">
                            {t('import.rangeStart')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
