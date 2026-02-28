import {
  Badge,
  Column,
  DropdownButton,
  EventCardStatusBadge,
  SmartDateTime,
  Toast,
  TruncatedText,
  useFilter,
} from "@/components";
import { ClockIcon } from "@/icons";
import { TranslateFn } from "@/root/i18n/type";
import { useDeleteEventCard, useSearchEventCards } from "@/services";
import { defaultSearchResult, EventCardSearchItemDto, SearchResult } from "@/types";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

const getColumns = (
  t: TranslateFn,
  onOpenDetail: (id: string) => void,
  onOpenEdit: (id: string) => void,
  onDeleteCard: (id: string) => void
): Column<EventCardSearchItemDto>[] => ([
  {
    key: "id",
    label: t('event.cardList.table.columns.id'),
    render: (_, item) => <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
  },
  {
    key: "information",
    label: t('event.cardList.table.columns.information'),
    render: (_, item) => (
      <div className="flex flex-col gap-1">
        <p className="flex gap-2">
          <span className="font-medium dark:text-muted-foreground">{item.guestName}</span>
        </p>
        <p className="flex items-center gap-1 dark:text-muted-foreground">
          <ClockIcon size={12} />
          <SmartDateTime date={item.createdAt} label={t('common.datetime.createdAt')} />
        </p>
      </div>
    )
  },
  {
    key: "scan-status",
    label: t('event.cardList.table.columns.isScanned'),
    align: "left",
    render: (_, item) => (
      <span className="flex flex-col gap-1">
        {item.isUsed ? (
          <Badge variant="default">{t("event.enum.isScanned.YES")}</Badge>
        ) : (
          <Badge variant="destructive">{t("event.enum.isScanned.NO")}</Badge>
        )}
        {item.firstScannedAt && (
          <SmartDateTime date={item.firstScannedAt} />
        )}
      </span>
    )
  },
  {
    key: "status",
    label: t('event.cardList.table.columns.status'),
    className: "text-center",
    align: "center",
    render: (_, item) => <EventCardStatusBadge status={item.status} />
  },
  {
    key: "actions",
    className: "w-48 text-right",
    align: "right",
    label: t('event.cardList.table.columns.action'),
    render: (_, item) => {
      const options = [
        {
          label: t('common.actions.view'),
          action: () => { onOpenDetail(item.id) }
        },
        {
          label: t('common.actions.edit'),
          action: () => { onOpenEdit(item.id) }
        },
        {
          label: t('common.actions.delete'),
          className: "text-red-600",
          action: () => { onDeleteCard(item.id) }
        },
      ];
      return <DropdownButton options={options} />
    }
  },
]);

export enum ListItemAction {
  NONE = "NONE",
  DETAIL = "DETAIL",
  EDIT = "EDIT",
}

export const useCardList = ({ eventId }: { eventId: string }) => {
  const t = useTranslations();

  const [pageAction, setPageAction] = useState<[ListItemAction, string | null]>([ListItemAction.NONE, null]);
  const { filter, onKeywordChange, onPageChange, onPageSizeChange } = useFilter();
  const { data, isLoading, refetch } = useSearchEventCards(
    eventId,
    { keyword: filter.keyword, page: filter.page, pageSize: filter.pageSize }
  );
  const { mutateAsync: deleteEventCard } = useDeleteEventCard();

  const onCloseModal = useCallback(() => { setPageAction([ListItemAction.NONE, null]); }, []);
  const onOpenDetail = useCallback((id: string) => { setPageAction([ListItemAction.DETAIL, id]); }, []);
  const onOpenEdit = useCallback((id: string) => { setPageAction([ListItemAction.EDIT, id]); }, []);
  const onDeleteCard = useCallback(async (id: string) => {
    if (!window.confirm(t('common.messages.confirmDelete')))
      return;

    await deleteEventCard({ eventId: eventId, id });
    refetch();

    Toast.showSuccess(t('common.messages.deleteSuccess'));
  }, []);

  const columns = useMemo(() => getColumns(t, onOpenDetail, onOpenEdit, onDeleteCard), [eventId]);

  return {
    isLoading,
    onRefresh: refetch,
    data: data?.data ?? defaultSearchResult as SearchResult<EventCardSearchItemDto>,
    pageAction,
    onCloseModal,
    columns,
    onKeywordChange,
    filter,
    onPageChange,
    onPageSizeChange,
  };
};
