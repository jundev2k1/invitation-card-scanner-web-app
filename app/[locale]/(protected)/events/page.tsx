"use client";
import { DataList, PageContent, RefreshButton, SearchTextbox } from "@/app/components";
import { useTranslations } from "next-intl";
import { InsertModal } from "./_insert-modal/InsertModal";
import { EventScanner } from "./_shared";
import { useEventPage } from "./useEventPage";

export default function EventsPage() {
  const t = useTranslations();
  const {
    breadcrumbs,
    columns,
    isLoading,
    onPageRefresh,
    data,
    filter,
    onPageChange,
    onPageSizeChange,
    onKeywordChange,
  } = useEventPage();

  return (
    <PageContent
      title={t('event.list.title')}
      description={t('user.list.desc')}
      breadcrumbs={breadcrumbs}
      filters={
        <SearchTextbox
          value={filter.keyword}
          placeholder={t('event.list.filter.search.placeholder')}
          onTextChange={onKeywordChange}
        />
      }
      actions={
        <>
          <EventScanner />
          <RefreshButton onRefresh={onPageRefresh} />
          <InsertModal />
        </>
      }
    >
      <DataList
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={t("event.list.table.txtEmpty")}
        page={filter.page}
        onPageChange={onPageChange}
        pageSize={filter.pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </PageContent >
  );
}
