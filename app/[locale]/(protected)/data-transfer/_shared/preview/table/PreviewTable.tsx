import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { cn } from "@/lib/utils";
import { useCallback, useMemo, useState } from "react";

interface ExportColumn {
  id: string;
  matchingKey: string;
  alias?: string;
  format?: string;
  order: number;
}

interface ImportColumn {
  matchingKey: string;
  id: string;
  order: number;
  alias?: string;
  ignore?: boolean;
}

interface ExportConfig {
  name: string;
  columns: ExportColumn[];
}

interface ImportConfig {
  name: string;
  leftTopPos?: string;
  rightBottomPos?: string;
  columns: ImportColumn[];
}

type PreviewTableProps = {
  config: ExportConfig | ImportConfig;
  type: "export" | "import";
  data?: any[];
};

export const PreviewTable = ({ config, type, data = [] }: PreviewTableProps) => {
  const [selectCell, setSelectCell] = useState<[string, string]>(["A", "1"]);
  const [selCol, selRow] = selectCell;

  const alphabet = useMemo(() => Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), []);
  
  const rows = useMemo(() => {
    const rowCount = Math.max(data.length + 1, 50); 
    return Array.from({ length: rowCount }, (_, i) => (i + 1).toString());
  }, [data]);

  const mappedCols = useMemo(() => {
    if (!config?.columns) return [];
    return [...config.columns]
      .sort((a, b) => a.order - b.order)
      .map((col, index) => ({
        ...col,
        letter: String.fromCharCode(65 + index),
      }));
  }, [config?.columns]);

  const getFormatStyles = useCallback((format?: string) => {
    const f = format?.toLowerCase();
    switch (f) {
      case "number":
      case "currency":
        return "justify-end text-blue-600 dark:text-blue-400 font-mono";
      case "boolean":
        return "justify-center text-orange-600 dark:text-orange-400 font-bold";
      case "date":
      case "datetime":
        return "justify-start text-emerald-600 dark:text-emerald-400";
      case "image":
        return "justify-center text-purple-600 italic";
      default:
        return "justify-start";
    }
  }, []);

  const formatValue = useCallback((val: any, format?: string) => {
    if (val === null || val === undefined) return "";
    
    switch (format?.toLowerCase()) {
      case "date":
      case "datetime":
        return "[Date Value]";
      case "number":
      case "currency":
        return "[Number Value]";
      case "boolean":
        return "[Boolean]";
      case "image":
        return "[Image]";
      default:
        return String(val);
    }
  }, []);

  const isCellInRange = useCallback((current: string, start?: string, end?: string) => {
    if (!start || !end) return current === start;
    const parse = (pos: string) => ({
      col: pos.replace(/[0-9]/g, ""),
      row: parseInt(pos.replace(/\D/g, ""), 10),
    });
    const s = parse(start), e = parse(end), c = parse(current);
    return c.col >= s.col && c.col <= e.col && c.row >= s.row && c.row <= e.row;
  }, []);

  if (!config) {
    return (
      <div className="excel-wrapper h-full min-h-100 border rounded-md flex items-center justify-center text-muted-foreground text-sm">
        Vui lòng chọn cấu hình để xem trước
      </div>
    );
  }

  return (
    <div className="excel-wrapper h-full min-h-100 border rounded-md shadow-sm bg-background">
      <Table>
        <TableHeader className="sticky top-0 z-30 bg-muted/80 backdrop-blur-sm">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="sticky left-0 top-0 z-40 w-12 h-9 border-b border-r bg-muted/80 backdrop-blur-sm p-0 text-center" />
            {alphabet.map((char) => (
              <TableHead
                key={char}
                className={cn(
                  "min-w-37.5 w-37.5 border-r border-b text-center sticky top-0 px-2 text-xs font-medium transition-colors",
                  selCol === char ? "bg-primary/10 text-primary border-b-primary" : "bg-muted/50 text-muted-foreground/60"
                )}
              >
                {char}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((rowNum, rowIndex) => {
            const isIgnoredRow = type === "import" && 
              (config as ImportConfig).columns?.some(c => (c as ImportColumn).ignore && (c as ImportColumn).order.toString() === rowNum);

            return (
              <TableRow 
                key={rowNum} 
                className={cn(
                  "hover:bg-transparent border-none transition-colors",
                  isIgnoredRow && "bg-destructive/8"
                )}
              >
                <TableCell
                  className={cn(
                    "sticky left-0 z-20 w-12 h-8 border-r border-b bg-muted/50 p-0 text-center text-[10px] font-medium transition-colors",
                    selRow === rowNum && "bg-primary/10 text-primary border-r-primary",
                    isIgnoredRow && "bg-destructive/20 text-destructive border-r-destructive font-bold"
                  )}
                >
                  {rowNum}
                </TableCell>

                {alphabet.map((char) => {
                  const currentPos = `${char}${rowNum}`;
                  const colDef = mappedCols.find((c) => c.letter === char);
                  const isActive = selCol === char && selRow === rowNum;
                  const format = (colDef as ExportColumn)?.format;
                  
                  const inImportRange = type === "import" && 
                    isCellInRange(currentPos, (config as ImportConfig).leftTopPos, (config as ImportConfig).rightBottomPos);

                  const rawValue = rowIndex > 0 ? data[rowIndex - 1]?.[colDef?.matchingKey || ""] : "";
                  const cellValue = formatValue(rawValue, format);

                  return (
                    <TableCell
                      key={currentPos}
                      className="p-0 min-w-37.5 w-37.5"
                      onClick={() => setSelectCell([char, rowNum])}
                    >
                      <div
                        className={cn(
                          "h-8 w-full border-r border-b px-3 flex items-center text-xs transition-all cursor-cell relative",
                          getFormatStyles(format),
                          isActive && "z-10 ring-2 ring-primary ring-inset bg-primary/5 dark:bg-primary/10",
                          inImportRange && !isActive && !isIgnoredRow && "bg-emerald-500/8 dark:bg-emerald-500/15",
                          !isActive && !inImportRange && !isIgnoredRow && "hover:bg-muted/30"
                        )}
                      >
                        <span className={cn(
                          "truncate w-full",
                          rowNum === "1" && colDef && "font-bold text-foreground italic justify-start flex",
                          isIgnoredRow && "text-destructive/50 line-through italic select-none"
                        )}>
                          {rowNum === "1" && colDef ? (colDef.alias || colDef.matchingKey) : (cellValue || "")}
                          {isIgnoredRow && rowNum !== "1" && "Ignored"}
                        </span>
                        
                        {type === "import" && currentPos === (config as ImportConfig).leftTopPos && (
                          <div className="absolute top-0 left-0 bg-emerald-600 text-[8px] text-white px-1 font-bold rounded-br uppercase select-none">
                            Start
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
