import type { CategoryNode } from "./types";

export const mockFullTree: CategoryNode[] = [
  {
    parentId: "ROOT",
    id: "001",
    name: "Cate 01",
    slug: "cate-001",
    description: "Example description.",
    imageUrl: "",
    status: 1,
    sortOrder: 0,
    level: 1,
    items: [],
  },
  {
    parentId: "ROOT",
    id: "002",
    name: "Cate 2",
    slug: "cate-002",
    description: "Example description.",
    imageUrl: "",
    status: 1,
    sortOrder: 0,
    level: 1,
    items: [],
  },
  // Con
  {
    parentId: "001",
    id: "001001",
    name: "Cate 1 - 1",
    slug: "cate-001-001",
    description: "Example description.",
    imageUrl: "",
    status: 1,
    sortOrder: 0,
    level: 2,
    items: [],
  },
  {
    parentId: "001",
    id: "001002",
    name: "Cate 1 - 2",
    slug: "cate-001-002",
    description: "Example description.",
    imageUrl: "",
    status: 1,
    sortOrder: 0,
    level: 2,
    items: [],
  },
  {
    parentId: "001001",
    id: "001001001",
    name: "Cate 1 - 1 - 1",
    slug: "cate-001-001-001",
    description: "Example description.",
    imageUrl: "",
    status: 1,
    sortOrder: 0,
    level: 3,
    items: [],
  },
];

export function getRoots(): CategoryNode[] {
  return mockFullTree.filter(n => n.parentId === "ROOT");
}

export function getChildren(parentId: string): CategoryNode[] {
  return mockFullTree.filter(n => n.parentId === parentId);
}

export function findNodeById(id: string): CategoryNode | undefined {
  return mockFullTree.find(n => n.id === id);
}
