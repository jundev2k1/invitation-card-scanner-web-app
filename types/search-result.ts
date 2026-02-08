export interface SearchResult<T> {
  items: T[];
  count: number;
  totalCount: number;
  totalPage: number;
  page: number;
  pageSize: number;
}
