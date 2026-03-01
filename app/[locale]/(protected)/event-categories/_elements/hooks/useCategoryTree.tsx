"use client";

import { useMemo, useState } from "react";
import { findNodeById, getChildren, getRoots } from "../mockCategories";
import type { CategoryNode } from "../types";

export function useCategoryTree() {
  const [roots, setRoots] = useState<CategoryNode[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());

  useMemo(() => {
    setRoots(getRoots());
  }, []);

  const toggleExpand = (id: string) => {
    setLoading(prev => new Set([...prev, id]));

    setTimeout(() => {
      const children = getChildren(id);

      setRoots(prev =>
        prev.map(node => {
          if (node.id === id) {
            return { ...node, items: children };
          }
          return node;
        })
      );

      setExpanded(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });

      setLoading(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1000);
  };

  const getDetail = (id: string | null) => (id ? findNodeById(id) : undefined);

  return {
    roots,
    expanded,
    loading,
    toggleExpand,
    getDetail,
  };
}
