import { BaseFilter, Column, defaultBaseFilter, SexBadge, SmartDateTime, TruncatedText, useFilter, UserStatusBadge } from "@/app/components";
import { ClockIcon, InfoIcon, MailIcon, PhoneIcon, UserIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TranslateFn } from "@/i18n/type";
import { useGetUserSearch } from "@/services/user/useUserService";
import { defaultSearchResult, UserStatus } from "@/types";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useTranslations } from "use-intl";
import { getUserStatusOptions } from "./_shared";

const getBreadcrumbs = (t: TranslateFn, locale: string) => [
  { label: t('dashboard.title'), href: RouteUtil.getDashboardRoute(locale) },
  { label: t('user.list.title') },
];

const getColumns = (t: TranslateFn, redirectToDetail: (id: string) => void): Column<UserSearchItemDto>[] => [
  {
    key: "id",
    label: t('user.list.table.columns.id'),
    className: "w-20",
    render: (_, item) => <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
  },
  {
    key: "information",
    label: t('user.list.table.columns.information'),
    render: (_, item) => (
      <div className="flex gap-2">
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
          <p className="flex items-center gap-1 dark:text-muted-foreground">
            <ClockIcon size={12} />
            <SmartDateTime date={item.createdAt} label={t('common.datetime.createdAt')} />
          </p>
        </div>
      </div>
    )
  },
  {
    key: "status",
    label: t('user.list.table.columns.status'),
    render: (_, item) => <UserStatusBadge status={item.status} />
  },
  {
    key: "action",
    label: t('user.list.table.columns.action'),
    render: (_, item) => (
      <Button
        className="cursor-pointer dark:text-muted-foreground"
        variant="outline"
        onClick={() => redirectToDetail(item.id)}>
        <InfoIcon />
      </Button>
    )
  },
];

interface UserFilters extends BaseFilter {
  statuses: UserStatus[]
}

const getSearchParams = (filter: UserFilters) => {
  return {
    keyword: filter.keyword || '',
    statuses: filter.statuses || [],
    page: filter.page || 1,
    pageSize: filter.pageSize || 20,
  }
}

export const useUserPage = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const {
    filter,
    updateFilter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange
  } = useFilter<UserFilters>({ ...defaultBaseFilter, statuses: [] });
  const {
    data,
    isLoading,
    refetch
  } = useGetUserSearch(getSearchParams(filter));

  const redirectToDetail = useCallback((id: string) => router.push(RouteUtil.getUserDetailUrl(locale, id)), [locale]);
  const onStatusChange = useCallback((statuses: UserStatus[]) => {
    updateFilter({ ...filter, page: 1, statuses });
  }, [locale]);

  const breadcrumbs = useMemo(() => getBreadcrumbs(t, locale), [locale]);
  const columns = useMemo(() => getColumns(t, redirectToDetail), [locale]);
  const onPageRefresh = useCallback(refetch, []);
  const useStatusOptions = useMemo(() => getUserStatusOptions(t), [t]);

  return {
    breadcrumbs,
    columns,
    isLoading,
    onPageRefresh,
    data: data?.data ?? defaultSearchResult,
    useStatusOptions,
    filter,
    onStatusChange,
    onKeywordChange,
    onPageChange,
    onPageSizeChange
  }
}
