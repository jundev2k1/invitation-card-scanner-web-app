import { IconButton } from "@/components";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  FolderIcon,
  LoaderIcon,
  PencilIcon,
  PlusIcon
} from "@/icons";
import { cn } from "@/lib/utils";
import { EventCategorySearchItemDto } from "@/types";

interface TreeItemProps {
  node: EventCategorySearchItemDto;
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
  const hasChildren = (node.items?.length ?? 0) > 0 || false;

  const INDENT = 24;

  return (
    <div className="relative">
      <div
        className={cn(
          "group relative flex items-center gap-2 py-1.5 px-3 rounded-md cursor-pointer transition-colors",
          selected ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
        )}
        style={{ paddingLeft: `${depth * INDENT}px` }}
      >
        {/* Chỉ vẽ line connector cho depth > 1 (bỏ root) */}
        {depth > 1 && (
          <div
            className="absolute top-0 bottom-0 w-px bg-border/70 pointer-events-none"
            style={{ left: `${(depth - 1) * INDENT + 12}px` }}
          />
        )}

        {depth > 1 && (
          <div
            className="absolute top-1/2 h-px bg-border/70 pointer-events-none"
            style={{
              left: `${(depth - 1) * INDENT}px`,
              width: '12px',
            }}
          />
        )}

        <button
          onClick={() => toggleExpand(node.id)}
          className={cn(
            "h-6 w-6 flex items-center justify-center rounded-sm shrink-0 transition-colors z-10 bg-background",
            isLoading && "opacity-70",
            hasChildren ? "hover:bg-muted/80 cursor-pointer" : "cursor-default bg-transparent"
          )}
          disabled={isLoading || !hasChildren}
        >
          {isLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : hasChildren ? (
            expanded ? <ChevronDownIcon className="h-4 w-4 text-muted-foreground" /> : <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <></>
          )}
        </button>

        <div className="flex-1 min-w-0 flex items-center gap-2">
          <FolderIcon
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground",
              depth === 1 && "text-foreground"
            )}
          />

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
            onClick={() => onView(node.id)}
          />
          <IconButton
            icon={<PencilIcon className="h-4 w-4" />}
            variant="ghost"
            size="icon"
            onClick={() => onEdit(node.id)}
          />
          <IconButton
            icon={<PlusIcon className="h-4 w-4" />}
            variant="ghost"
            size="icon"
            onClick={() => onAddChild(node.id)}
          />
        </div>
      </div>

      {children && (
        <div className="space-y-0.5" style={{ marginLeft: `${INDENT}px` }}>
          {children}
        </div>
      )}
    </div>
  );
}
