"use client";
import { DataList, RefreshButton, SearchTextbox } from "@/components";
import { useTranslations } from "next-intl";
import React from "react";
import { InsertMember } from "../_insert/InsertMember";
import { useMemberList } from "./useMemberList";

export type MemberListProps = {
  eventId: string;
};
export const MemberList = React.memo(({ eventId }: MemberListProps) => {
  const t = useTranslations();
  const {
    isLoading,
    onRefresh,
    data,
    pageAction: [pageAction, targetId],
    onCloseModal,
    columns,
    filter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange
  } = useMemberList({ eventId });
  return (
    <>
      <div className="flex justify-between gap-1 mb-3">
        <SearchTextbox
          placeholder={t('user.list.filter.search.placeholder')}
          value={filter.keyword}
          onTextChange={onKeywordChange}
        />

        <div className="flex items-center gap-2">
          <RefreshButton onRefresh={onRefresh} />
          <InsertMember key={eventId} eventId={eventId} />
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
    </>
  );
});
