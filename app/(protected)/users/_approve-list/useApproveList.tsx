import { useFilter } from "@/app/components";
import { userService } from "@/services";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { UserStatus } from "@/types/enum/user-status.enum";
import { defaultSearchResult, SearchResult } from "@/types/search-result";
import { useEffect, useState } from "react";

export const useApproveList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<number>(0);

  const [unApprovedCount, setUnApprovedCount] = useState<number>(0);
  const [data, setData] = useState<SearchResult<UserSearchItemDto>>(defaultSearchResult);
  const { filter, setKeyword, onPageChange, onPageSizeChange } = useFilter({ keyword: '', page: 1, pageSize: 5 });

  const onRefresh = () => {
    setIsRefresh(isRefresh + 1);
  }

  const onApprove = async (id: string) => {
    console.log(id);
    onRefresh();
  }

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    userService.getUserList({ keyword: filter.keyword, page: filter.page, pageSize: filter.pageSize })
      .then(res => {
        setData(res.data!);
        setIsLoading(false);
      });
  }, [isOpen, filter]);

  useEffect(() => {
    setIsLoading(true);
    userService.getStatusStats().then(res => {
      const count = res.data
        ? res.data[UserStatus.WAITING_FOR_APPROVE] ?? 0
        : 0;
      setUnApprovedCount(count);
      setIsLoading(false);
    })
  }, [isRefresh]);

  return {
    unApprovedCount,
    onRefresh,
    isOpen,
    setIsOpen,
    isLoading,
    onApprove,
    data,
    filter,
    setKeyword,
    onPageChange,
    onPageSizeChange
  };
}
