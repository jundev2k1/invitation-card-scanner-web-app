export interface CategoryNode {
  id: string;
  parentId: string | "ROOT";
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: number;
  sortOrder: number;
  level: number;
  items?: CategoryNode[];
  loaded?: boolean;
  isPlaceholder?: boolean;
  hasChildren?: boolean;
}
