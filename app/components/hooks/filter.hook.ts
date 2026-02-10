import { useEffect, useState } from "react";

type SearchFilter = {
  keyword: string,
  page: number,
  pageSize: number,
}

export const useFilter = () => {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState<SearchFilter>({
    keyword: '',
    page: 1,
    pageSize: 20
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter({
        keyword: keyword,
        page: 1,
        pageSize: 20
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [keyword]);

  const onPageChange = (page: number) => {
    setFilter({ ...filter, page });
  }

  const onPageSizeChange = (pageSize: number) => {
    setFilter({ ...filter, pageSize });
  }

  return ({
    keyword,
    filter,
    setKeyword,
    onPageChange,
    onPageSizeChange
  });
};