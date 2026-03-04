import { Badge, Separator } from "@/components";
import { FileDown, FileUp, Info, LayoutGrid } from "lucide-react";
import { ExportConfig, ImportConfig } from "../../../type";

export const PreviewHeader = ({ config, type }: { config: ExportConfig | ImportConfig | null, type: 'export' | 'import' }) => {
  if (!config) return null;

  const isImport = type === 'import';
  const impConfig = config as ImportConfig;

  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            {isImport ? <FileUp className="w-5 h-5 text-primary" /> : <FileDown className="w-5 h-5 text-primary" />}
          </div>
          <div>
            <h3 className="text-lg font-bold leading-none mb-1">{config.name}</h3>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span className="truncate max-w-100">
                {config.description || "Không có mô tả cho cấu hình này"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize px-3 py-1">
            {type} Mode
          </Badge>
          {isImport && impConfig.leftTopPos && (
            <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10">
              Vùng nhập: {impConfig.leftTopPos} {impConfig.rightBottomPos ? `→ ${impConfig.rightBottomPos}` : ""}
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-4 gap-4 px-1">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Tổng số cột</span>
          <div className="flex items-center gap-2 font-mono text-sm">
            <LayoutGrid className="w-4 h-4 text-muted-foreground" />
            {config.columns?.length || 0} Fields
          </div>
        </div>
        
        {isImport && (
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Cấu hình Ignore</span>
            <div className="font-mono text-sm text-destructive">
              {impConfig.columns?.filter(c => c.ignore).length || 0} Fields
            </div>
          </div>
        )}

        <div className="space-y-1 col-span-2">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Mapping Preview</span>
          <div className="flex flex-wrap gap-1">
            {config.columns?.slice(0, 5).map((col, i) => (
              <span key={col.id} className="text-[10px] bg-muted px-1.5 py-0.5 rounded border max-w-30 truncate">
                {String.fromCharCode(65 + i)}: {col.alias || col.matchingKey}
              </span>
            ))}
            {config.columns?.length > 5 && <span className="text-[10px] text-muted-foreground self-center">...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
