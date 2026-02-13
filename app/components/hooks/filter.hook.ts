import { useCallback, useEffect, useState } from "react";

type SearchFilter = {
  keyword: string,
  page: number,
  pageSize: number,
}

export const useFilter = (defaultFilter?: SearchFilter) => {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState<SearchFilter>(defaultFilter ??
  {
    keyword: '',
    page: 1,
    pageSize: 20
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter({
        keyword: keyword,
        page: keyword.trim() === '' ? filter.page : 1,
        pageSize: filter.pageSize
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [keyword]);

  const onPageChange = useCallback((page: number) => {
    setFilter({ ...filter, page });
  }, [filter]);

  const onPageSizeChange = useCallback((pageSize: number) => {
    setFilter({ ...filter, pageSize });
  }, [filter]);

  return ({
    keyword,
    filter,
    setKeyword,
    onPageChange,
    onPageSizeChange
  });
};