"use client";
import {
  Column,
  DropdownButton,
  Select,
  SmartDateTime,
  Toast,
  TruncatedText,
  useFilter,
} from "@/components";
import { TranslateFn } from "@/i18n/type";
import { ClockIcon, MapPinHouseIcon } from "@/icons";
import { formatDate } from "@/lib/datetime/date.util";
import { useDeleteEvent, useSearchEvents, useUpdateEventStatus } from "@/services";
import { defaultSearchResult, EventSearchItemDto, EventStatus, InputOption } from "@/types";
import { RouteUtil } from "@/utils/route";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { getEventStatusOptions } from "./_shared";

const getBreadcrumbs = (t: TranslateFn, locale: string) => [
  { label: t('dashboard.title'), href: RouteUtil.getDashboardRoute(locale) },
  { label: t('event.list.title') },
];

const getColumns = (
  t: TranslateFn,
  redirectToDetail: (id: string) => void,
  onDeleteEvent: (id: string) => void,
  onUpdateStatus: (id: string, status: EventStatus) => Promise<void>,
  eventStatusOptions: InputOption[]
): Column<EventSearchItemDto>[] => [
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
          <p className="flex items-center gap-1 dark:text-muted-foreground">
            <ClockIcon size={12} />
            <SmartDateTime date={item.createdAt} label={t('common.datetime.createdAt')} />
          </p>
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
          options={eventStatusOptions}
          value={item.status.toString()}
          onValueChange={async (value) => await onUpdateStatus(item.id, parseInt(value) as EventStatus)}
        />
      )
    },
    {
      key: "action",
      label: t('user.list.table.columns.action'),
      className: "w-[10%] text-right",
      align: "right",
      render: (_, item) => {
        const options = [
          { label: t('common.actions.view'), action: () => redirectToDetail(item.id) },
          { label: t('common.actions.delete'), action: () => onDeleteEvent(item.id), className: "text-red-600" },
        ];
        return (
          <DropdownButton options={options} />
        )
      }
    },
  ];

export const useEventPage = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const { filter, onKeywordChange, onPageChange, onPageSizeChange } = useFilter();
  const { data, isLoading, refetch } = useSearchEvents({
    keyword: filter.keyword.trim(),
    page: filter.page,
    pageSize: filter.pageSize
  });
  const { mutateAsync: deleteEvent } = useDeleteEvent();
  const { mutateAsync: updateStatus } = useUpdateEventStatus();

  const redirectToDetail = useCallback((id: string) => router.push(RouteUtil.getEventDetailUrl(locale, id)), [locale]);
  const onDeleteEvent = useCallback(async (id: string) => {
    if (!window.confirm(t('common.messages.confirmDelete'))) return;

    await deleteEvent(id);
    Toast.showSuccess(t('common.messages.deleteSuccess'));
  }, [locale]);
  const onUpdateStatus = useCallback(async (id: string, status: EventStatus) => {
    await updateStatus({ id, status });
    Toast.showSuccess(t('common.messages.updateStatusSuccess'));
  }, [locale]);

  const eventStatusOptions = useMemo(() => getEventStatusOptions(t), [locale]);
  const breadcrumbs = useMemo(() => getBreadcrumbs(t, locale), [locale]);
  const columns = useMemo(() => getColumns(
    t,
    redirectToDetail,
    onDeleteEvent,
    onUpdateStatus,
    eventStatusOptions
  ), [locale]);
  const onPageRefresh = useCallback(refetch, []);

  return {
    isLoading,
    data: data?.data ?? defaultSearchResult,
    breadcrumbs,
    columns,
    onPageRefresh,
    filter,
    onPageChange,
    onPageSizeChange,
    onKeywordChange,
  }
}
