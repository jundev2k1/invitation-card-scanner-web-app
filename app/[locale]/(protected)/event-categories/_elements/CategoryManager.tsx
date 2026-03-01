"use client";

import { BaseFilter } from "@/components";

import { DetailCard } from "./detail/DetailCard";
import { usePageAction } from "./hooks/usePageAction";
import { TreePanel } from "./tree-panel/TreePanel";

type CategoryManagerProps = {
  filter: BaseFilter;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export function CategoryManager({
  filter,
  onPageChange,
  onPageSizeChange,
}: CategoryManagerProps) {
  const {
    tree,
    selectedId,
    action,
    handleView,
    handleEdit,
    handleAddChild,
    handleAddRoot,
    handleCloseCard,
  } = usePageAction();

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
            selectedId={selectedId}
            filter={filter}
            totalPage={tree.totalPage}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>

        <div className="lg:col-span-1">
          <DetailCard
            action={action}
            selectedId={selectedId}
            parentIdForInsert={null}
            onClose={handleCloseCard}
          />
        </div>
      </div>
    </div>
  );
}
