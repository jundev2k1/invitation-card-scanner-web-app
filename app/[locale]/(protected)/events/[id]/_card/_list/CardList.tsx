"use client";
import { DataList, RefreshButton, SearchTextbox } from "@/app/components";
import React from "react";
import { EventCardDetail } from "../_detail/DetailCard";
import { InsertCard } from "../_insert/InsertCard";
import { ListItemAction, useCardList } from "./useCardList";

export type CardListProps = {
  eventId: string;
};
export const CardList = React.memo(({ eventId }: CardListProps) => {
  const {
    isLoading,
    data,
    pageAction,
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
          <RefreshButton onRefresh={() => { }} />
          <InsertCard />
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

      {pageAction == ListItemAction.DETAIL && <EventCardDetail isOpen={true} onClose={onCloseModal} />}
      {pageAction == ListItemAction.EDIT && <>Show Edit</>}
    </>
  );
});
