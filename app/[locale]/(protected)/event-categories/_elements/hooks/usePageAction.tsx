import { BaseFilter } from "@/components";
import { EventCategorySearchItemDto, PageAction } from "@/types";
import { useState } from "react";
import { useCategoryTree } from "./useCategoryTree";

export const usePageAction = ({ filter }: { filter: BaseFilter }) => {
  const [selectedItem, setSelectedItem] = useState<EventCategorySearchItemDto | null>(null);
  const [nextId, setNextId] = useState<string | null>(null);
  const [action, setAction] = useState<PageAction | null>(null);

  const tree = useCategoryTree({ filter });

  const handleView = (id: string) => {
    const item = tree.getDetail(id);
    if (!item)
      throw new Error(`Parent category not found: ${id}`);

    setSelectedItem(item);
    setNextId(null);
    setAction(PageAction.VIEW);
  };

  const handleEdit = (id: string) => {
    const item = tree.getDetail(id);
    if (!item)
      throw new Error(`Parent category not found: ${id}`);

    setSelectedItem(item);
    setNextId(null);
    setAction(PageAction.EDIT);
  };

  const handleAddChild = (parentId: string) => {
    const parent = tree.getDetail(parentId);
    if (!parent)
      throw new Error(`Parent category not found: ${parentId}`);

    const nextId = generateNextChildId(parentId, parent.items || []);
    setNextId(nextId);
    setSelectedItem(parent);
    setAction(PageAction.CREATE);
    
    !tree.expanded.has(parent.id) && tree.toggleExpand(parent.id);
  };

  const handleAddRoot = () => {
    const nextId = generateNextChildId(null, tree.roots);
    setNextId(nextId);
    setSelectedItem(null);
    setAction(PageAction.CREATE);
  };

  const handleCloseCard = () => {
    setNextId(null);
    setSelectedItem(null);
    setAction(null);
  };
  return {
    tree,
    selectedItem,
    nextId,
    action,
    handleView,
    handleEdit,
    handleAddChild,
    handleAddRoot,
    handleCloseCard,
  };
};

function generateNextChildId(
  parentId: string | "ROOT" | null,
  children: EventCategorySearchItemDto[]
): string {
  if (!children || children.length === 0) {
    const base = parentId === "ROOT" || parentId === null ? "" : parentId;
    return base + "001";
  }

  const lastSegments = children
    .map(child => {
      const id = child.id;
      if (id.length < 3) return 0;
      const segment = id.slice(-3);
      return Number(segment);
    })
    .filter(n => !isNaN(n));

  const maxSegment = lastSegments.length > 0 ? Math.max(...lastSegments) : 0;
  const nextSegment = (maxSegment + 1).toString().padStart(3, "0");

  if (parentId === "ROOT" || parentId === null) {
    return nextSegment;
  }

  return parentId + nextSegment;
}
