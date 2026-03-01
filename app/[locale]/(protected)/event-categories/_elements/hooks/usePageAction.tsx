import { PageAction } from "@/root/types";
import { useState } from "react";
import { useCategoryTree } from "./useCategoryTree";

export const usePageAction = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<PageAction | null>(null);


  const tree = useCategoryTree();

  const handleView = (id: string) => {
    setSelectedId(id);
    setAction(PageAction.VIEW);
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setAction(PageAction.EDIT);
  };

  const handleAddChild = (parentId: string) => {
    setSelectedId(null);
    setAction(PageAction.CREATE);
  };

  const handleAddRoot = () => {
    setSelectedId(null);
    setAction(PageAction.CREATE);
  };

  const handleCloseCard = () => {
    setSelectedId(null);
    setAction(null);
  };
  return {
    tree,
    selectedId,
    action,
    handleView,
    handleEdit,
    handleAddChild,
    handleAddRoot,
    handleCloseCard,
  };
};
