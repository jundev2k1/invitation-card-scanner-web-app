"use client";

import { BaseFilter } from "@/components";
import { DetailCard } from "./detail/DetailCard";
import { usePageAction } from "./hooks/usePageAction";
import { TreePanel } from "./tree-panel/TreePanel";

type CategoryManagerProps = {
  filter: BaseFilter;
};

export function CategoryManager({
  filter,
}: CategoryManagerProps) {
  const {
    tree,
    selectedItem,
    nextId,
    action,
    handleView,
    handleEdit,
    handleAddChild,
    handleAddRoot,
    handleCloseCard,
  } = usePageAction({ filter });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TreePanel
            tree={tree}
            onView={handleView}
            onEdit={handleEdit}
            onAddRoot={handleAddRoot}
            onAddChild={handleAddChild}
            selectedId={selectedItem?.id ?? null}
          />
        </div>

        <div className="lg:col-span-1">
          <DetailCard
            action={action}
            selectedItem={selectedItem}
            nextId={nextId}
            onClose={handleCloseCard}
          />
        </div>
      </div>
    </div>
  );
}
