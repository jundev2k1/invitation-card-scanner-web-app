"use client";

import { BaseFilter } from "@/components";
import { useSearchEventCategories } from "@/services";
import { EventCategorySearchItemDto } from "@/types";
import { useEffect, useState } from "react";

export function useCategoryTree({ filter }: { filter: BaseFilter }) {
  const { data, isLoading } = useSearchEventCategories({ keyword: filter.keyword });

  const [roots, setRoots] = useState<EventCategorySearchItemDto[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isLoading && data?.data) {
      setRoots(data.data);
    }
  }, [isLoading, data]);

  const expandAll = () => {
    const allIds = new Set<string>();

    const collectIds = (nodes: EventCategorySearchItemDto[]) => {
      nodes.forEach(node => {
        allIds.add(node.id);
        if (node.items) collectIds(node.items);
      });
    };

    collectIds(roots);
    setExpanded(allIds);
  };

  const collapseAll = () => {
    setExpanded(new Set());
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    // setLoading(prev => new Set([...prev, id]));
    // setTimeout(() => {
    //   setLoading(prev => {
    //     const next = new Set(prev);
    //     next.delete(id);
    //     return next;
    //   });
    // }, 150);
  };

  const getDetail = (id: string | null): EventCategorySearchItemDto | undefined => {
    if (!id) return undefined;

    const findNode = (nodes: EventCategorySearchItemDto[]): EventCategorySearchItemDto | undefined => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.items) {
          const found = findNode(node.items);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findNode(roots);
  };

  return {
    roots,
    expanded,
    loading,
    toggleExpand,
    getDetail,
    expandAll,
    collapseAll,
  };
}
