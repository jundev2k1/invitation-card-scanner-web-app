"use client";
import { DataList, PageContent, RefreshButton, TextBox } from "@/app/components";
import { useTranslations } from "next-intl";
import { useEventPage } from "./useEventPage";

export default function EventsPage() {
  const t = useTranslations();
  const {
    currentPage,
    breadcrumbs,
    columns,
    isLoading,
    onPageRefresh,
    keyword,
    data,
    filter,
    onPageChange,
    onPageSizeChange,
    setKeyword
  } = useEventPage();

  return (
    <PageContent
      title={currentPage ? t(currentPage) : 'User Management'}
      description={t('user.list.desc')}
      breadcrumbs={breadcrumbs}
      filters={
        <TextBox
          value={keyword}
          placeholder={t('event.list.filter.search.placeholder')}
          className="w-75"
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      }
      actions={
        <>
          <RefreshButton onRefresh={onPageRefresh} />
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
