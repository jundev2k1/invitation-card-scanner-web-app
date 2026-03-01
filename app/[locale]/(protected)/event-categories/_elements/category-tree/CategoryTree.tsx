import { EventCategorySearchItemDto } from "@/root/types/dto/event-category/event-category-search-item.dto";
import { TreeItem } from "../tree-item/TreeItem";

interface CategoryTreeProps {
  nodes: EventCategorySearchItemDto[];
  expanded: Set<string>;
  loading: Set<string>;
  toggleExpand: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onAddChild: (parentId: string) => void;
  selectedId: string | null;
  depth?: number;
}

export function CategoryTree({
  nodes,
  expanded,
  loading,
  toggleExpand,
  onView,
  onEdit,
  onAddChild,
  selectedId,
  depth = 1,
}: CategoryTreeProps) {
  return (
    <div className="space-y-1">
      {nodes.map(node => (
        <TreeItem
          key={node.id}
          node={node}
          expanded={expanded.has(node.id)}
          isLoading={loading.has(node.id)}
          toggleExpand={toggleExpand}
          onView={onView}
          onEdit={onEdit}
          onAddChild={onAddChild}
          selected={selectedId === node.id}
          depth={depth}
        >
          {expanded.has(node.id) && node.items && node.items.length > 0 && (
            <CategoryTree
              nodes={node.items}
              expanded={expanded}
              loading={loading}
              toggleExpand={toggleExpand}
              onView={onView}
              onEdit={onEdit}
              onAddChild={onAddChild}
              selectedId={selectedId}
              depth={depth + 1}
            />
          )}
        </TreeItem>
      ))}
    </div>
  );
}
