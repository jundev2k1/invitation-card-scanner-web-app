import { Column, SexBadge, TruncatedText, useFilter, UserStatusBadge } from "@/app/components";
import { InfoIcon, MailIcon, PhoneIcon, UserIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userService } from "@/services";
import { useSidebarStore } from "@/store";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { defaultSearchResult, SearchResult } from "@/types/search-result";
import { useCallback, useEffect, useState } from "react";

export const breadcrumbs = [
  { label: "Dashboard", href: RouteUtil.getDashboardRoute() },
  { label: "Users" },
];

export const columns: readonly Column<UserSearchItemDto>[] = Object.freeze([
  {
    key: "id",
    label: "ID",
    className: "w-20",
    render: (_, item) => <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
  },
  {
    key: "information",
    label: "Information",
    render: (_, item) => (
      <div className="flex items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src={item.avatarUrl} />
          <AvatarFallback><UserIcon /></AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="flex gap-2">
            <SexBadge sex={item.sex} />
            <span className="font-medium dark:text-muted-foreground">{item.nickname} ({item.username})</span>
          </p>
          <p className="flex items-center gap-3 dark:text-muted-foreground">
            <span className="flex items-center gap-1">
              <MailIcon size={12} />
              <TruncatedText text={item.email} isTruncate={false} />
            </span>
            <span className="flex items-center gap-1">
              <PhoneIcon size={12} />
              <TruncatedText text={item.phoneNumber} isTruncate={false} />
            </span>
          </p>
        </div>
      </div>
    )
  },
  {
    key: "status",
    label: "Status",
    render: (_, item) => <UserStatusBadge status={item.status} />
  },
  {
    key: "action",
    label: "Action",
    render: (_, item) => (
      <Button
        className="cursor-pointer dark:text-muted-foreground"
        variant="outline"
        onClick={() => RouteUtil.redirectToUserDetail(item.id)}>
        <InfoIcon />
      </Button>
    )
  },
]);

export const useUserPage = () => {
  const { currentPage, setCurrentPage } = useSidebarStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { keyword, filter, setKeyword, onPageChange, onPageSizeChange } = useFilter()
  const [data, setData] = useState<SearchResult<UserSearchItemDto>>(defaultSearchResult);
  const [isRefresh, setIsRefresh] = useState<number>(1);

  useEffect(() => {
    if (currentPage != "User Management") {
      setCurrentPage("User Management");
    }

    setIsLoading(true);
    userService.getUserList({ keyword: filter.keyword, page: filter.page, pageSize: filter.pageSize })
      .then(res => {
        setData(res.data!);
        setIsLoading(false);
      });
  }, [filter, isRefresh]);

  const onPageRefresh = useCallback(() => setIsRefresh(isRefresh + 1), [isRefresh]);
  return {
    currentPage,
    isLoading,
    onPageRefresh,
    keyword,
    data,
    filter,
    setKeyword,
    onPageChange,
    onPageSizeChange
  }
}
