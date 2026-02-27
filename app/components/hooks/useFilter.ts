"use client";
import { useCallback, useState } from "react";

export interface BaseFilter {
  keyword: string;
  page: number;
  pageSize: number;
}

export const defaultBaseFilter = {
  keyword: '',
  page: 1,
  pageSize: 20
}

export const useFilter = <T extends BaseFilter>(defaultFilter?: T) => {
  const [filter, setFilter] = useState<T>(defaultFilter ?? { ...defaultBaseFilter } as T);

  const updateFilter = useCallback((fieldsToUpdate: Partial<T>) => {
    setFilter((prev) => ({
      ...prev,
      ...fieldsToUpdate,
      page: fieldsToUpdate.page ?? 1
    }));
  }, []);

  const onKeywordChange = useCallback((keyword: string) => {
    setFilter({ ...filter, keyword });
  }, [filter]);

  const onPageChange = useCallback((page: number) => {
    setFilter({ ...filter, page });
  }, [filter]);

  const onPageSizeChange = useCallback((pageSize: number) => {
    setFilter({ ...filter, pageSize });
  }, [filter]);

  return ({
    filter,
    updateFilter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange
  });
};
