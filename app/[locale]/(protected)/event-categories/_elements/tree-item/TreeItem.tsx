import { IconButton } from "@/components";
import { ChevronDownIcon, EyeIcon, LoaderIcon, PencilIcon, PlusIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, FolderIcon, MinusIcon } from "lucide-react";
import type { CategoryNode } from "../types";

interface TreeItemProps {
  node: CategoryNode;
  expanded: boolean;
  isLoading: boolean;
  toggleExpand: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onAddChild: (parentId: string) => void;
  selected: boolean;
  depth: number;
  children?: React.ReactNode;
}

export function TreeItem({
  node,
  expanded,
  isLoading,
  toggleExpand,
  onView,
  onEdit,
  onAddChild,
  selected,
  depth,
  children,
}: TreeItemProps) {
  const hasChildren = (node.items?.length ?? 0) > 0 || true;

  return (
    <div className="relative">
      <div
        className={cn(
          "group relative flex items-center gap-2 py-1.5 px-3 rounded-md cursor-pointer transition-colors",
          selected ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
          `pl-${depth * 4 + 2}`
        )}
      >
        {/* Thin vertical line connector */}
        {depth > 1 && (
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-border/70"
            style={{ left: `${(depth - 1) * 16}px` }}
          />
        )}

        {/* Horizontal connector to chevron */}
        {depth > 1 && (
          <div
            className="absolute left-0 top-1/2 h-px w-4 bg-border/70"
            style={{ left: `${(depth - 2) * 16}px` }}
          />
        )}

        <button
          onClick={() => toggleExpand(node.id)}
          className={cn(
            "h-6 w-6 flex items-center justify-center rounded-sm shrink-0 transition-colors",
            "hover:bg-muted/80",
            isLoading && "opacity-70"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : hasChildren ? (
            expanded ? <ChevronDownIcon className="h-4 w-4 text-muted-foreground" /> : <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <MinusIcon className="h-4 w-4 text-muted-foreground/50" />
          )}
        </button>

        <div className="flex-1 min-w-0 flex items-center gap-2">
          <div className="shrink-0">
            <FolderIcon
              className={cn(
                "h-4 w-4 text-muted-foreground",
                depth === 1 && "text-foreground"
              )}
            />
          </div>

          <div className="flex-1">
            <div className={cn(
              "font-medium truncate text-sm",
              depth === 1 && "font-semibold"
            )}>
              {node.name || "(No name)"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              /{node.slug}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton
            icon={<EyeIcon className="h-4 w-4" />}
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onView(node.id)}
          />
          <IconButton
            icon={<PencilIcon className="h-4 w-4" />}
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onEdit(node.id)}
          />
          <IconButton
            icon={<PlusIcon className="h-4 w-4" />}
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onAddChild(node.id)}
          />
        </div>
      </div>

      {children && (
        <div className="ml-6 mt-0.5 space-y-0.5 border-l border-border/50 pl-4">
          {children}
        </div>
      )}
    </div>
  );
}
