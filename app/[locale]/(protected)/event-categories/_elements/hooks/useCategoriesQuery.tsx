"use client";

import { useEffect, useState } from "react";
import {
  findNodeById,
  getChildren,
  getRoots
} from "../mockCategories";
import type { CategoryNode } from "../types";

export function useCategories() {
  const [roots, setRoots] = useState<CategoryNode[]>([]);
  const [isLoadingRoots, setIsLoadingRoots] = useState(true);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loadingChildren, setLoadingChildren] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setRoots(getRoots());
      setIsLoadingRoots(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  const expandNode = (nodeId: string) => {
    if (expandedIds.has(nodeId)) return;

    setLoadingChildren((prev) => new Set([...prev, nodeId]));

    setTimeout(() => {
      const children = getChildren(nodeId);

      setRoots((prevRoots) =>
        prevRoots.map((root) => {
          if (root.id === nodeId) {
            return { ...root, items: children };
          }
          return root;
        })
      );

      setExpandedIds((prev) => new Set([...prev, nodeId]));
      setLoadingChildren((prev) => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
    }, 600);
  };

  const toggleExpand = (nodeId: string) => {
    if (expandedIds.has(nodeId)) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
    } else {
      expandNode(nodeId);
    }
  };

  const getDetail = (id: string | null): CategoryNode | undefined => {
    if (!id) return undefined;
    return findNodeById(id);
  };

  return {
    roots,
    isLoadingRoots,
    expandedIds,
    loadingChildren,
    toggleExpand,
    getDetail,
  };
}
