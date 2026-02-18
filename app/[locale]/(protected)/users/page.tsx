'use client';
import { DataList, PageContent, TextBox } from "@/app/components";
import { useTranslations } from "next-intl";
import { ApproveList } from "./_approve-list/ApproveList";
import { useUserPage } from "./useUserPage";

export default function UserPage() {
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
  } = useUserPage();
  const t = useTranslations();

  return (
    <PageContent
      title={t(currentPage)}
      description={t('user.list.desc')}
      breadcrumbs={breadcrumbs}
      filters={
        <TextBox
          value={keyword}
          placeholder={t('user.list.filter.search.placeholder')}
          className="w-75"
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      }
      actions={
        <ApproveList tooltip={t('user.list.btnApproveList')} onPageRefresh={onPageRefresh} />
      }
    >
      <DataList
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={t("user.list.table.txtEmpty")}
        page={filter.page}
        onPageChange={onPageChange}
        pageSize={filter.pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </PageContent >
  );
}
