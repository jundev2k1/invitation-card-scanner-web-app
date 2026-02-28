import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Column,
  IconButton,
  Toast,
  TruncatedText,
  useFilter
} from "@/components";
import { PhoneIcon, TrashIcon, UserIcon } from "@/icons";
import { TranslateFn } from "@/root/i18n/type";
import { useDeleteEventCard, useSearchEventCards } from "@/services";
import { defaultSearchResult, EventCardSearchItemDto, SearchResult } from "@/types";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { UpdateMember } from "../_update/UpdateMember";

const getColumns = (
  t: TranslateFn,
  eventId: string,
  onOpenEdit: (id: string) => void,
  onDeleteCard: (id: string) => void
): Column<EventCardSearchItemDto>[] => ([
  {
    key: "id",
    label: t('event.cardList.table.columns.id'),
    className: "w-[20%]",
    render: (_, item) => <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
  },
  {
    key: "information",
    label: t('event.memberList.table.columns.information'),
    render: (_, item) => (
      <div className="flex items-center gap-1">
        <Avatar size="lg">
          <AvatarImage src={""} />
          <AvatarFallback>{"user".substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-1 dark:text-muted-foreground text-sm">
            <UserIcon size={12} />
            <span className="text-sm">Nick name</span>
          </p>
          <p className="flex items-center gap-1 dark:text-muted-foreground text-sm">
            <PhoneIcon size={12} />
            <span className="text-sm dark:text-muted-foreground">0969 969 969</span>
          </p>
        </div>
      </div>
    )
  },
  {
    key: "member-role",
    label: t('event.memberList.table.columns.memberRole'),
    align: "left",
    className: "w-[35%]",
    render: (_, item) => (
      <UpdateMember eventId={eventId} memberId={item.id} assignedRole={"123123"} assignedAt={new Date()} />
    )
  },
  {
    key: "actions",
    className: "w-[10%] text-right",
    align: "right",
    label: t('event.memberList.table.columns.action'),
    render: (_, item) => (
      <IconButton variant="destructive" icon={<TrashIcon />} onClick={() => onDeleteCard(item.id)} />
    )
  },
]);

export enum ListItemAction {
  NONE = "NONE",
  DETAIL = "DETAIL",
  EDIT = "EDIT",
}

export const useMemberList = ({ eventId }: { eventId: string }) => {
  const t = useTranslations();

  const [pageAction, setPageAction] = useState<[ListItemAction, string | null]>([ListItemAction.NONE, null]);
  const { filter, onKeywordChange, onPageChange, onPageSizeChange } = useFilter();
  const { data, isLoading, refetch } = useSearchEventCards(
    eventId,
    { keyword: filter.keyword, page: filter.page, pageSize: filter.pageSize }
  );
  const { mutateAsync: deleteEventCard } = useDeleteEventCard();

  const onCloseModal = useCallback(() => { setPageAction([ListItemAction.NONE, null]); }, []);
  const onOpenEdit = useCallback((id: string) => { setPageAction([ListItemAction.EDIT, id]); }, []);
  const onDeleteCard = useCallback(async (id: string) => {
    if (!window.confirm(t('common.messages.confirmDelete')))
      return;

    await deleteEventCard({ eventId: eventId, id });
    refetch();

    Toast.showSuccess(t('common.messages.deleteSuccess'));
  }, []);

  const columns = useMemo(() => getColumns(t, eventId, onOpenEdit, onDeleteCard), [eventId]);

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
