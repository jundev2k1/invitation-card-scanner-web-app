"use client";
import { DataList, RefreshButton, SearchTextbox } from "@/app/components";
import React from "react";
import { EventCardDetail } from "../_detail/DetailCard";
import { InsertCard } from "../_insert/InsertCard";
import { UpdateCard } from "../_update/UpdateCard";
import { ListItemAction, useCardList } from "./useCardList";

export type CardListProps = {
  eventId: string;
};
export const CardList = React.memo(({ eventId }: CardListProps) => {
  const {
    isLoading,
    onRefresh,
    data,
    pageAction: [pageAction, targetId],
    onCloseModal,
    columns,
    keyword,
    setKeyword,
    filter,
    onPageChange,
    onPageSizeChange
  } = useCardList({ eventId });
  return (
    <>
      <div className="flex justify-between gap-1 mb-3">
        <SearchTextbox
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <RefreshButton onRefresh={onRefresh} />
          <InsertCard key={eventId} eventId={eventId} />
        </div>
      </div>

      <DataList
        isLoading={isLoading}
        columns={columns}
        data={data}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        page={filter.page}
        pageSize={filter.pageSize}
      />

      {/* Show Card Detail */}
      {pageAction == ListItemAction.DETAIL && !!targetId && (
        <EventCardDetail eventId={eventId} cardId={targetId} isOpen={true} onClose={onCloseModal} />
      )}

      {/* Show Card Edit */}
      {pageAction == ListItemAction.EDIT && (
        <UpdateCard
          eventId={eventId}
          detail={data.items.find((x) => x.id == targetId)!}
          isOpen={true}
          onClose={onCloseModal}
        />
      )}
    </>
  );
});
