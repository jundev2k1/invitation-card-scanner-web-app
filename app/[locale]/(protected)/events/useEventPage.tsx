"use client";
import { Button, Column, Select, TruncatedText, useFilter } from "@/app/components";
import { InfoIcon, MapPinHouseIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { formatDate } from "@/lib/datetime/date.util";
import { useSearchEvents } from "@/services";
import { useSidebarStore } from "@/store";
import { defaultSearchResult, EventSearchItemDto, EventStatusEnum } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

const getBreadcrumbs = (t: any, locale: string) => [
  { label: t('dashboard.title'), href: RouteUtil.getDashboardRoute(locale) },
  { label: t('event.list.title') },
];

const statusOptions = [
  { label: "event.enum.status.DRAFT", value: EventStatusEnum.DRAFT },
  { label: "event.enum.status.PUBLISHED", value: EventStatusEnum.PUBLISHED },
  { label: "event.enum.status.COMPLETED", value: EventStatusEnum.COMPLETED },
  { label: "event.enum.status.CANCELLED", value: EventStatusEnum.CANCELLED },
];

const getColumns = (t: any, redirectToDetail: (id: string) => void): Column<EventSearchItemDto>[] => [
  {
    key: "id",
    label: t('event.list.table.columns.id'),
    className: "w-20",
    render: (_, item) => <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
  },
  {
    key: "information",
    label: t('user.list.table.columns.information'),
    className: "w-[40%]",
    render: (_, item) => (
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <p className="flex gap-2">
            <span className="font-medium dark:text-muted-foreground">{item.title}</span>
          </p>
          <p className="flex items-center gap-3 dark:text-muted-foreground">
            {item.locationName && (
              <span className="flex items-center gap-1">
                <MapPinHouseIcon size={12} />
                <TruncatedText text={item.locationName} isTruncate={false} />
              </span>
            )}
          </p>
        </div>
      </div>
    )
  },
  {
    key: "eventDate",
    label: t('event.list.table.columns.eventDate'),
    className: "w-[20%]",
    render: (_, item) => (
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-3 dark:text-muted-foreground">
          <span>{t('event.list.table.content.from')}: {item.startAt ? formatDate(item.startAt) : "-"}</span>
        </p>
        <p className="flex items-center gap-3 dark:text-muted-foreground">
          <span>{t('event.list.table.content.to')}: {item.endAt ? formatDate(item.endAt) : "-"}</span>
        </p>
      </div>
    )
  },
  {
    key: "status",
    label: t('user.list.table.columns.status'),
    className: "w-[10%] text-right",
    align: "right",
    render: (_, item) => (
      <Select
        className="dark:text-muted-foreground"
        options={statusOptions.map(i => ({ label: t(i.label), value: i.value.toString() }))}
        value={item.status.toString()} />
    )
  },
  {
    key: "action",
    label: t('user.list.table.columns.action'),
    className: "w-[10%] text-right",
    align: "right",
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

export const useEventPage = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const { currentPage, setCurrentPage } = useSidebarStore();
  const { keyword, filter, setKeyword, onPageChange, onPageSizeChange } = useFilter();
  const { data, isLoading, refetch } = useSearchEvents({ keyword, page: filter.page, pageSize: filter.pageSize });

  useEffect(() => {
    if (currentPage == "event.list.title")
      return;

    setCurrentPage("event.list.title");
  }, [currentPage]);

  const redirectToDetail = useCallback((id: string) => router.push(RouteUtil.getEventDetailUrl(locale, id)), [locale]);

  const breadcrumbs = useMemo(() => getBreadcrumbs(t, locale), [locale]);
  const columns = useMemo(() => getColumns(t, redirectToDetail), [locale]);
  const onPageRefresh = useCallback(refetch, []);

  return {
    currentPage,
    isLoading,
    data: data?.data ?? defaultSearchResult,
    breadcrumbs,
    columns,
    onPageRefresh,
    keyword,
    filter,
    onPageChange,
    onPageSizeChange,
    setKeyword
  }
}
