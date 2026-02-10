export interface SearchResult<T> {
  items: T[];
  count: number;
  totalCount: number;
  totalPage: number;
  page: number;
  pageSize: number;
}

export const defaultSearchResult: SearchResult<any> = {
  items: [],
  count: 0,
  totalCount: 0,
  totalPage: 1,
  page: 1,
  pageSize: 20
};
