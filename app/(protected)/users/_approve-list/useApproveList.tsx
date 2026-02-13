import { useFilter } from "@/app/components";
import { userService } from "@/services";
import {
  defaultSearchResult,
  SearchResult,
  UserSearchItemDto,
  UserStatus
} from "@/types";
import { useEffect, useState } from "react";

type ApproveListProps = {
  onPageRefresh?: () => void
}

export const useApproveList = ({ onPageRefresh }: ApproveListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<number>(0);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const [unApprovedCount, setUnApprovedCount] = useState<number>(0);
  const [data, setData] = useState<SearchResult<UserSearchItemDto>>(defaultSearchResult);
  const { filter, keyword, setKeyword, onPageChange, onPageSizeChange } = useFilter({ keyword: '', page: 1, pageSize: 5 });

  const onRefresh = () => {
    setIsRefresh(isRefresh + 1);
  }

  const onApprove = async (id: string) => {
    try {
      // Handle approve user
      await userService.approveUser(id);

      // Set new status
      const targetItem = data.items.find(i => i.id === id);
      if (!targetItem) return;
      targetItem.status = UserStatus.ACTIVE;
      setData(data);

      // Refresh page
      setHasChanged(true);
      onRefresh();
    } catch (err: any) {
      console.error(err);
    }
  }

  const onClose = () => {
    setIsOpen(false);

    if (hasChanged)
      onPageRefresh?.();
  }

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    userService.getUserList({ keyword: filter.keyword, statuses: [UserStatus.WAITING_FOR_APPROVE], page: filter.page, pageSize: filter.pageSize })
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
    onClose,
    isLoading,
    onApprove,
    data,
    filter,
    keyword,
    setKeyword,
    onPageChange,
    onPageSizeChange
  };
}
