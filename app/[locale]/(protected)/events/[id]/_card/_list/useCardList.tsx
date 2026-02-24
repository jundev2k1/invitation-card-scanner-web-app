import { Column, DropdownButton, SmartDateTime, TruncatedText, useFilter } from "@/app/components";
import { ClockIcon } from "@/app/components/icons";
import { defaultSearchResult, SearchResult } from "@/types";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

interface EventCardSearchItemDto {
  id: string;
  guestName: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const getColumns = (
  t: any,
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
  const [pageAction, setPageAction] = useState<ListItemAction>(ListItemAction.NONE);
  const { keyword, setKeyword, filter, onPageChange, onPageSizeChange } = useFilter();

  const onOpenDetail = useCallback((id: string) => { setPageAction(ListItemAction.DETAIL); }, []);
  const onOpenEdit = useCallback((id: string) => { setPageAction(ListItemAction.EDIT); }, []);
  const onDeleteCard = useCallback(async (id: string) => { }, []);
  const onCloseModal = useCallback(() => { setPageAction(ListItemAction.NONE); }, []);

  const columns = useMemo(() => getColumns(t, onOpenDetail, onOpenEdit, onDeleteCard), [eventId]);

  const mockData: SearchResult<EventCardSearchItemDto> = {
    ...defaultSearchResult,
    items: [
      {
        id: "1",
        guestName: "John Doe",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        guestName: "Jane Doe",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
      {
        id: "3",
        guestName: "John Doe",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
    ],
    count: 3,
    totalCount: 3,
  }

  return {
    isLoading: false,
    data: mockData,
    pageAction,
    onCloseModal,
    columns,
    keyword,
    setKeyword,
    filter,
    onPageChange,
    onPageSizeChange,
  };
};
