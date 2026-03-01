export interface EventCategorySearchItemDto {
  parentId: string | 'ROOT';
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: number;
  sortOrder: number;
  level: string;
  items: EventCategorySearchItemDto[];
}
