import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components';
import { cn } from '@/lib/utils';
import { ImportConfig } from '@/root/config/import-file';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getImportConfig } from '../../../_elements/import/setting/useImportSettings';
import { extract } from '../../../_elements/import/steps/range-step/useRangeStepForm';
import { ExportConfig } from '../../../type';
import { PreviewContext } from './PreviewContext';
import { useMappedColumns } from './useMappedColumns';

type PreviewTableProps = {
  containerClassName?: string;
  config: ExportConfig | ImportConfig | null;
  type: 'export' | 'import';
  data?: string[][];
  interactive?: boolean;
  onRangeChange?: (start: string | null, end: string | null) => void;
  selectedRangeStart?: string | null;
  selectedRangeEnd?: string | null;
  autoScaleY?: boolean;
  onAutoScaleYChange?: (autoScaleY: boolean) => void;
};

export const PreviewTable = ({
  containerClassName,
  config,
  type,
  data = [],
  interactive = false,
  onRangeChange,
  selectedRangeStart = null,
  selectedRangeEnd = null,
  autoScaleY = false,
  onAutoScaleYChange,
}: PreviewTableProps) => {
  const tTranfer = useTranslations('dataTransfer');

  // Current focused cell (always present)
  const [focusCell, setFocusCell] = useState<string>('A1');

  // Selection range anchor and current end
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  // Handle smooth scrolling
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollState = useRef({
    isSpaceDown: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onGlobalKeyDown = async (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        scrollState.current.isSpaceDown = true;
        container.style.cursor = 'grab';

        // Prevent scrolling
        const target = e.target;
        if (target instanceof Node && (target === document.body || container.contains(target))) {
          e.preventDefault();
        }
      }
    };

    const onGlobalKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        scrollState.current.isSpaceDown = false;
        scrollState.current.isDragging = false;
        container.style.cursor = 'cell';
      }
    };

    const onGlobalMouseDown = (e: MouseEvent) => {
      if (!scrollState.current.isSpaceDown
        || e.button == 1
        || e.button == 2
      ) return;

      scrollState.current.isDragging = true;
      container.style.cursor = 'grab!important';

      scrollState.current.startX = e.pageX - container.offsetLeft;
      scrollState.current.startY = e.pageY - container.offsetTop;
      scrollState.current.scrollLeft = container.scrollLeft;
      scrollState.current.scrollTop = container.scrollTop;
    };

    const onGlobalMouseMove = (e: MouseEvent) => {
      if (
        !scrollState.current.isDragging
        || !scrollState.current.isSpaceDown
        || e.button == 1
        || e.button == 2
      ) return;
      e.preventDefault();

      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const walkX = x - scrollState.current.startX;
      const walkY = y - scrollState.current.startY;

      container.scrollLeft = scrollState.current.scrollLeft - walkX;
      container.scrollTop = scrollState.current.scrollTop - walkY;
    };

    const onGlobalMouseUp = (e: MouseEvent) => {
      if (e.button == 1 || e.button == 2) return;

      scrollState.current.isDragging = false;
      if (scrollState.current.isSpaceDown) container.style.cursor = 'grab';
    };

    // Add event listeners
    window.addEventListener('keydown', onGlobalKeyDown);
    window.addEventListener('keyup', onGlobalKeyUp);
    container.addEventListener('mousedown', onGlobalMouseDown);
    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('keydown', onGlobalKeyDown);
      window.removeEventListener('keyup', onGlobalKeyUp);
      container.removeEventListener('mousedown', onGlobalMouseDown);
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup', onGlobalMouseUp);
    };
  }, [config, data]);

  useEffect(() => {
    const onMoveOrCopyKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey
        && !e.shiftKey
        && !e.altKey
        && !scrollState.current.isSpaceDown
        && !scrollState.current.isDragging
      ) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setFocusCell((prev) => prev.replace(/^[A-Z]+/, (match) => {
            const code = match.charCodeAt(0);
            return code > 65 ? String.fromCharCode(code - 1) : match;
          }));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setFocusCell((prev) => prev.replace(/^[A-Z]+/, (match) => {
            const code = match.charCodeAt(0);
            return code < 90 ? String.fromCharCode(code + 1) : match;
          }));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setFocusCell((prev) => prev.replace(/[0-9]+$/, (match) => {
            const val = Number(match);
            return val > 1 ? String(val - 1) : match;
          }));
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFocusCell((prev) => prev.replace(/[0-9]+$/, (match) => String(Number(match) + 1)));
        }
      }
    }
    window.addEventListener('keydown', onMoveOrCopyKeyDown);

    return () => {
      window.removeEventListener('keydown', onMoveOrCopyKeyDown);
    }
  }, [focusCell]);

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

  const mappedCols = useMappedColumns(config, type);

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

  const getNormalizedRange = useCallback((start: string, end: string) => {
    const s = parsePos(start);
    const e = parsePos(end);

    const startColCode = s.col.charCodeAt(0);
    const endColCode = e.col.charCodeAt(0);

    const minCol = String.fromCharCode(Math.min(startColCode, endColCode));
    const maxCol = String.fromCharCode(Math.max(startColCode, endColCode));

    let minRow = Math.min(s.row, e.row);
    const maxRow = Math.max(s.row, e.row);

    const headerRow = 1;
    if (minRow === headerRow) {
      minRow = headerRow + 1;
    }

    const finalMinRow = minRow > maxRow ? maxRow : minRow;

    return {
      start: `${minCol}${finalMinRow}`,
      end: `${maxCol}${maxRow}`,
      isSameRow: s.row === e.row
    };
  }, [parsePos]);

  // Pressing Escape clears the selection range but keeps focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsDragging(false);
        setRangeStart(null);
        setRangeEnd(null);
        scrollState.current.isDragging = false;
        scrollState.current.isSpaceDown = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle single click or shift+click for range extension
  const handleCellClick = useCallback((pos: string, e: React.MouseEvent) => {
    if (e.button == 1
      || scrollState.current.isDragging
      || scrollState.current.isSpaceDown
    ) return;

    if (!interactive && !e.shiftKey) {
      setFocusCell(pos);
      return;
    }

    if (e.shiftKey) {
      setRangeStart(!rangeStart ? focusCell : rangeStart);
      setRangeEnd(pos);
    } else {
      // Regular click → reset to single cell focus
      setIsDragging(false);
      setFocusCell(pos);
      setRangeStart(null);
      setRangeEnd(null);
    }
  }, [interactive, focusCell, rangeStart, rangeEnd, onRangeChange]);

  const handleMouseDown = useCallback((pos: string, e: React.MouseEvent) => {
    if (!interactive
      || e.shiftKey
      || e.button == 2
      || e.button == 1
      || scrollState.current.isDragging
      || scrollState.current.isSpaceDown) return;

    setIsDragging(true);
    setFocusCell(pos);
    setRangeStart(pos);
    setRangeEnd(pos);
  }, [interactive, onRangeChange]);

  const handleMouseOver = useCallback((pos: string, e: React.MouseEvent) => {
    if (!interactive
      || !isDragging
      || e.shiftKey
      || e.button == 2
      || e.button == 1
      || scrollState.current.isDragging
      || scrollState.current.isSpaceDown
    ) return;

    setFocusCell(pos);
    setRangeEnd(pos);
  }, [interactive, isDragging, onRangeChange]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!interactive
      || e.shiftKey
      || e.button == 2
      || e.button == 1
      || scrollState.current.isDragging
      || scrollState.current.isSpaceDown
    ) return;

    setIsDragging(false);
  }, [interactive]);

  const handleSelectionChangeWithAutoScale = useCallback(() => {
    if (!rangeStart || !rangeEnd) return;

    const { start, end, isSameRow } = getNormalizedRange(rangeStart, rangeEnd);
    if (isSameRow) {
      onRangeChange?.(start, end);
      onAutoScaleYChange?.(true);
    }
  }, [rangeStart, rangeEnd, onRangeChange, onAutoScaleYChange, getNormalizedRange]);

  const handleSelectionChange = useCallback(() => {
    if (!rangeStart || !rangeEnd) return;

    const { start, end } = getNormalizedRange(rangeStart, rangeEnd);
    onRangeChange?.(start, end);
    onAutoScaleYChange?.(false);
  }, [rangeStart, rangeEnd, onRangeChange, onAutoScaleYChange, getNormalizedRange]);

  const handleClearSelection = useCallback(() => {
    onRangeChange?.(null, null);
    setRangeStart(null);
    setRangeEnd(null);
    onAutoScaleYChange?.(true);
    setIsDragging(false);
  }, [selectedRangeStart, selectedRangeEnd, rangeStart, rangeEnd]);

  if (!config) {
    return (
      <div className="h-full min-h-100 border rounded-lg flex items-center justify-center text-muted-foreground text-sm bg-muted/30">
        {tTranfer('export.previewNoConfig')}
      </div>
    );
  }

  const isImport = type === 'import';
  const importConfig = config as ImportConfig;
  const isShowSelectWithAutoScale = isImport
    && rangeStart !== rangeEnd
    && extract(rangeStart)?.r === extract(rangeEnd)?.r;
  const fieldConfigs = useMemo(() => isImport ? getImportConfig(importConfig.module) : [], [importConfig.module]);

  return (
    <PreviewContext
      className={containerClassName}
      interactive={interactive}
      isSelected={!!selectedRangeStart && !!selectedRangeEnd}
      isCellSelecting={!!rangeStart && !!rangeEnd}
      isShowSelectWithAutoScale={isShowSelectWithAutoScale}
      onSelectionChangeWithAutoScale={handleSelectionChangeWithAutoScale}
      onSelectionChange={handleSelectionChange}
      onClearSelection={handleClearSelection}
    >
      <Table containerRef={containerRef} containerTabIndex={0} className="border-separate border-spacing-0 w-fit">
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
            return (
              <TableRow
                key={rowNum}
                className={cn(
                  'hover:bg-transparent border-none transition-colors',
                )}
              >
                <TableCell
                  draggable={false}
                  className={cn(
                    'sticky left-0 z-20 w-12 h-9 border-b border-r bg-muted/70 p-0 text-center text-xs font-medium transition-colors select-none',
                    parsePos(focusCell).row === Number(rowNum) && 'bg-primary/15 text-primary border-r-primary'
                  )}
                >
                  {rowNum}
                </TableCell>

                {alphabet.map((char, colIndex) => {
                  const pos = `${char}${rowNum}`;
                  const colDef = mappedCols.find((c) => c.letter === char);
                  const format = (colDef as any)?.format;

                  const isFocus = pos === focusCell;
                  const isInSelectedRange =
                    rangeStart && rangeEnd && isCellInRange(pos, rangeStart, rangeEnd);

                  const isSingleSelect = isFocus && !rangeStart && !rangeEnd;
                  const rawValue = data[rowIndex]?.[colIndex] || '';
                  const cellValue = formatValue(rawValue, format);

                  // Determine if cell is inside the configured import range
                  let inRange = false;

                  if (isImport && selectedRangeStart && selectedRangeEnd) {
                    const start = parsePos(selectedRangeStart);
                    const end = parsePos(selectedRangeEnd);
                    const current = parsePos(pos);

                    const minCol = Math.min(start.col.charCodeAt(0), end.col.charCodeAt(0));
                    const maxCol = Math.max(start.col.charCodeAt(0), end.col.charCodeAt(0));

                    const minRow = Math.min(start.row, end.row);

                    // Special rule:
                    // If autoScaleY is enabled AND start/end are on the same row,
                    // the selection should expand vertically to the end of the file.
                    if (autoScaleY && start.row === end.row) {
                      inRange =
                        current.col.charCodeAt(0) >= minCol &&
                        current.col.charCodeAt(0) <= maxCol &&
                        current.row >= minRow;
                    } else {
                      // Default rectangular range behavior
                      inRange = isCellInRange(pos, selectedRangeStart, selectedRangeEnd);
                    }
                  }

                  const currentMapping = importConfig.mappingStep?.mappings?.find((c) => c.src === colIndex);
                  const isHeaderIgnored = isImport
                    && rowIndex === 0
                    && importConfig.mappingStep
                    && colIndex < importConfig.mappingStep.importFields.length + 1
                    && !currentMapping;
                  const isHeaderRequired = isImport
                    && rowIndex === 0
                    && importConfig.mappingStep
                    && colIndex < importConfig.mappingStep.importFields.length + 1
                    && !!currentMapping
                    && fieldConfigs.some((c) => c.id === currentMapping?.dest && c.validate?.required === true);

                  const inContent = colIndex < ((importConfig.mappingStep?.importFields.length || 0) + 1)
                    && rowIndex > 0 && (autoScaleY || inRange || rowIndex < data.length);
                  const isIgnored = isImport
                    && inContent
                    && (!inRange || !currentMapping);

                  return (
                    <TableCell
                      draggable={false}
                      key={pos}
                      className="p-0 w-37.5 min-w-37.5 select-none"
                      onClick={(e) => handleCellClick(pos, e)}
                      onMouseDown={(e) => handleMouseDown(pos, e)}
                      onMouseOver={(e) => handleMouseOver(pos, e)}
                      onMouseUp={handleMouseUp}
                    >
                      <div
                        className={cn(
                          'h-9 border-b border-r px-3 flex items-center text-xs transition-colors relative dark:bg-gray-950',
                          getFormatStyles(format),
                          isFocus && 'ring-2 ring-primary/60 ring-inset bg-primary/5 dark:bg-primary/10 cell-forcused',
                          isInSelectedRange && 'bg-primary/20 border-primary/40 ring-1 ring-primary/30',
                          isSingleSelect && 'bg-primary/10 border-primary/30',
                          inRange && !isFocus && !isInSelectedRange && !isIgnored && 'bg-emerald-100/60 dark:bg-emerald-900/30',
                          !isFocus && !inRange && !isInSelectedRange && !isIgnored && 'hover:bg-muted/40',
                          (isIgnored || isHeaderIgnored) && 'opacity-60 bg-destructive/25 dark:bg-destructive/15',
                        )}
                      >
                        <span
                          className={cn(
                            'truncate w-full',
                            rowNum === '1' && colDef && 'font-semibold italic',
                            (isIgnored || isHeaderIgnored) && 'text-destructive/70 line-through select-none'
                          )}
                        >
                          {cellValue}
                          {isHeaderRequired && <span className="ml-1 text-[10px] font-medium text-destructive">(*)</span>}

                          {!cellValue && isIgnored && (
                            <span className="ml-1 text-[10px] font-medium">({tTranfer('import.ignored')})</span>
                          )}
                        </span>

                        {isImport && pos === selectedRangeStart && (
                          <div className="absolute -top-0.5 -left-0.5 bg-emerald-600 text-[9px] text-white px-1.5 py-0.5 font-bold rounded-br shadow-sm uppercase select-none">
                            {tTranfer('import.rangeStart')}
                          </div>
                        )}
                        {isImport && pos === selectedRangeEnd && (
                          <div
                            className={cn(
                              "absolute bg-emerald-600 text-[9px] text-white px-1.5 py-0.5 font-bold shadow-sm uppercase select-none",
                              autoScaleY ? "-top-0.5 -right-0.5 rounded-bl" : "-bottom-0.5 -right-0.5 rounded-tl"
                            )}
                          >
                            {tTranfer('import.rangeEnd')}
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
    </PreviewContext>
  );
};
