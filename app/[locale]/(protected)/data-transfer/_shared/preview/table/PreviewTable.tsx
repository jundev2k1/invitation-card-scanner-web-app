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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExportConfig, ImportConfig } from '../../../type';
import { useMappedColumns } from './useMappedColumns';

type PreviewTableProps = {
  containerClassName?: string;
  config: ExportConfig | ImportConfig | null;
  type: 'export' | 'import';
  data?: any[];
  interactive?: boolean;
  onCellMouseDown?: (pos: string) => void;
  onCellMouseOver?: (pos: string) => void;
  selectedRangeStart?: string | null;
  selectedRangeEnd?: string | null;
};

/**
 * Excel-like preview table for import/export mapping
 * Supports cell focus, range selection (drag + shift-click), and visual feedback
 */
export const PreviewTable = ({
  containerClassName,
  config,
  type,
  data = [],
  interactive = false,
  onCellMouseDown,
  onCellMouseOver,
  selectedRangeStart,
  selectedRangeEnd = null,
}: PreviewTableProps) => {
  const t = useTranslations('dataTransfer');

  // Current focused cell (always present)
  const [focusCell, setFocusCell] = useState<string>('A1');

  // Selection range anchor and current end
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  // Track drag state to enable range selection
  const [isDragging, setIsDragging] = useState(false);

  // A–Z column headers
  const alphabet = useMemo(() =>
    Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    []);

  // Generate enough row numbers (at least 26 rows for visibility)
  const rows = useMemo(() => {
    const rowCount = Math.max(data.length + 1, 26);
    return Array.from({ length: rowCount }, (_, i) => String(i + 1));
  }, [data.length]);

  const mappedCols = useMappedColumns(config?.columns ?? []);

  // Returns Tailwind classes based on column format
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

  // Displays placeholder text according to column format
  const formatValue = useCallback((val: any, format?: string) => {
    if (val == null) return '';
    const f = format?.toLowerCase();
    switch (f) {
      case 'date':
      case 'datetime': return '[Date]';
      case 'number':
      case 'currency': return '[Number]';
      case 'boolean': return '[Boolean]';
      case 'image': return '[Image]';
      default: return String(val);
    }
  }, []);

  // Parse cell position (e.g. "B4" → { col: "B", row: 4 })
  const parsePos = useCallback((pos: string) => {
    const col = pos.replace(/\d+/g, '');
    const row = Number(pos.replace(/\D+/g, ''));
    return { col, row };
  }, []);

  // Check if a cell lies within the selected range (inclusive)
  const isCellInRange = useCallback((current: string, start: string, end: string) => {
    const c = parsePos(current);
    const s = parsePos(start);
    const e = parsePos(end);

    const minCol = Math.min(s.col.charCodeAt(0), e.col.charCodeAt(0));
    const maxCol = Math.max(s.col.charCodeAt(0), e.col.charCodeAt(0));
    const minRow = Math.min(s.row, e.row);
    const maxRow = Math.max(s.row, e.row);

    return (
      c.col.charCodeAt(0) >= minCol &&
      c.col.charCodeAt(0) <= maxCol &&
      c.row >= minRow &&
      c.row <= maxRow
    );
  }, [parsePos]);

  // Pressing Escape clears the selection range but keeps focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsDragging(false);
        setRangeStart(null);
        setRangeEnd(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle single click or shift+click for range extension
  const handleCellClick = useCallback((pos: string, e: React.MouseEvent) => {
    if (!interactive) return;

    if (e.shiftKey) {
      setRangeStart(!rangeStart ? focusCell : rangeStart);
      setRangeEnd(pos);
      onCellMouseDown?.(focusCell);
      onCellMouseOver?.(pos);
    } else {
      // Regular click → reset to single cell focus
      setIsDragging(false);
      setFocusCell(pos);
      setRangeStart(null);
      setRangeEnd(null);
      onCellMouseDown?.(pos);
    }
  }, [interactive, focusCell, rangeStart, rangeEnd, onCellMouseDown, onCellMouseOver]);

  const handleMouseDown = useCallback((pos: string, e: React.MouseEvent) => {
    if (!interactive || e.shiftKey) return;

    setIsDragging(true);
    setFocusCell(pos);
    setRangeStart(pos);
    setRangeEnd(pos);
    onCellMouseDown?.(pos);
  }, [interactive, onCellMouseDown]);

  const handleMouseOver = useCallback((pos: string) => {
    if (!interactive || !isDragging) return;
    setFocusCell(pos);
    setRangeEnd(pos);
    onCellMouseOver?.(pos);
  }, [interactive, isDragging, onCellMouseOver]);

  const handleMouseUp = useCallback(() => {
    if (!interactive) return;
    setIsDragging(false);
  }, [interactive]);

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
    <div className={cn("excel-wrapper grow border rounded-md shadow-sm bg-background overflow-hidden", containerClassName)}>
      <Table className="border-separate border-spacing-0 w-fit">
        <TableHeader className="sticky top-0 z-30 bg-muted/90 backdrop-blur-sm">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="sticky left-0 top-0 z-40 w-12 h-9 border-b border-r bg-muted/90 backdrop-blur-sm p-0 text-center text-xs font-medium" />
            {alphabet.map((char) => (
              <TableHead
                draggable={false}
                key={char}
                className={cn(
                  'w-30 border-b border-r text-center sticky top-0 px-3 text-xs font-medium transition-colors select-none',
                  parsePos(focusCell).col === char && 'bg-primary/15 text-primary border-b-primary',
                  'bg-muted/70 text-muted-foreground/80'
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
                  draggable={false}
                  className={cn(
                    'sticky left-0 z-20 w-12 h-9 border-b border-r bg-muted/70 p-0 text-center text-xs font-medium transition-colors select-none',
                    parsePos(focusCell).row === Number(rowNum) && 'bg-primary/15 text-primary border-r-primary',
                    isIgnoredRow && 'bg-destructive/15 text-destructive border-r-destructive font-semibold'
                  )}
                >
                  {rowNum}
                </TableCell>

                {alphabet.map((char) => {
                  const pos = `${char}${rowNum}`;
                  const colDef = mappedCols.find((c) => c.letter === char);
                  const format = (colDef as any)?.format;

                  const isFocus = pos === focusCell;
                  const isInSelectedRange =
                    rangeStart && rangeEnd && isCellInRange(pos, rangeStart, rangeEnd);

                  const isSingleSelect = isFocus && !rangeStart && !rangeEnd;

                  const rawValue = rowIndex > 0 ? data[rowIndex - 1]?.[colDef?.matchingKey ?? ''] : '';
                  const cellValue = formatValue(rawValue, format);

                  const inRange =
                    isImport &&
                    isCellInRange(pos, importConfig.leftTopPos || '', importConfig.rightBottomPos || '');

                  return (
                    <TableCell
                      draggable={false}
                      key={pos}
                      className="p-0 w-37.5 min-w-37.5 select-none"
                      onClick={(e) => handleCellClick(pos, e)}
                      onMouseDown={(e) => handleMouseDown(pos, e)}
                      onMouseOver={() => handleMouseOver(pos)}
                      onMouseUp={handleMouseUp}
                    >
                      <div
                        className={cn(
                          'h-9 border-b border-r px-3 flex items-center text-xs transition-colors cursor-cell relative',
                          getFormatStyles(format),
                          isFocus && 'ring-2 ring-primary/60 ring-inset bg-primary/5 dark:bg-primary/10',
                          isInSelectedRange && 'bg-primary/20 border-primary/40 ring-1 ring-primary/30',
                          isSingleSelect && 'bg-primary/10 border-primary/30',
                          inRange && !isFocus && !isInSelectedRange && !isIgnoredRow && 'bg-emerald-100/60 dark:bg-emerald-900/30',
                          !isFocus && !inRange && !isInSelectedRange && !isIgnoredRow && 'hover:bg-muted/40',
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
                            ? colDef.alias || colDef.matchingKey
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
