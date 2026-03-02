export interface GetEventCategoryListRequest {
  parentId?: string;
  id?: string;
  keyword?: string;
}

export interface getEventCategorySuggesttionsRequest {
  keyword?: string;
  pageSize?: number;
}

export interface CreateEventCategoryRequest {
  parentId: string;
  cateId: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
}

export interface UpdateEventCategoryRequest {
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
}
