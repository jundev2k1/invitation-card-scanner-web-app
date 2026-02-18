import { Button, IconButton, SmartDateTime, TruncatedText, useFilter } from "@/app/components";
import { CheckCheckIcon, CheckIcon, EyeIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { userService } from "@/services";
import {
  defaultSearchResult,
  SearchResult,
  UserSearchItemDto,
  UserStatus
} from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const getColumns = (t: any, handleApprove: (id: string) => void, redirectToUserDetail: (id: string) => void) => [
  {
    key: "id",
    label: t('user.list.table.columns.id'),
    className: "w-32 font-mono text-muted-foreground",
    render: (_: any, item: UserSearchItemDto) =>
      <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
  },
  {
    key: "info",
    label: t('user.list.table.columns.information'),
    render: (_: any, item: UserSearchItemDto) => (
      <div className="space-y-1">
        <div className="font-medium">
          {item.nickname || item.username}
        </div>
        <div className="text-sm text-muted-foreground">
          {item.email}
        </div>
        <div className="text-xs text-muted-foreground flex gap-1 items-center">
          {t('common.datetime.createdAt')} <SmartDateTime className="text-xs" date={item.createdAt} />
        </div>
      </div>
    ),
  },
  {
    key: "actions",
    label: t('user.list.table.columns.action'),
    className: "w-48 text-right",
    render: (_: any, item: UserSearchItemDto) => {
      const isApproved = item.status === UserStatus.ACTIVE;
      return (
        <div className="flex gap-2 justify-end">
          <IconButton
            icon={<EyeIcon />}
            variant="outline"
            onClick={() => redirectToUserDetail(item.id)}
          />
          <Button
            variant={isApproved ? "outline" : "default"}
            leftIcon={isApproved ? <CheckCheckIcon /> : <CheckIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleApprove(item.id);
            }}
            disabled={isApproved}
          >
            {t('user.approveList.btnApprove')}
          </Button>
        </div>
      )
    },
  },
];

type ApproveListProps = {
  onPageRefresh?: () => void
}

export const useApproveList = ({ onPageRefresh }: ApproveListProps) => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
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

  const onClose = useCallback(() => {
    setIsOpen(false);

    if (hasChanged)
      onPageRefresh?.();
  }, [isOpen]);

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

  const redirectToDetail = useCallback((id: string) => router.push(RouteUtil.getUserDetailUrl(locale, id)), [locale]);
  const columns = useMemo(() => getColumns(t, onApprove, redirectToDetail), [onApprove, redirectToDetail]);

  return {
    columns,
    unApprovedCount,
    onRefresh,
    isOpen,
    setIsOpen,
    onClose,
    isLoading,
    data,
    filter,
    keyword,
    setKeyword,
    onPageChange,
    onPageSizeChange
  };
}
