'use client';
import {
  DataList,
  MultiCombobox,
  PageContent,
  RefreshButton,
  SearchTextbox
} from "@/components";
import { getUserStatusKey } from "@/root/app/utils/mappers/user.mapper";
import { useTranslations } from "next-intl";
import { ApproveList } from "./_approve-list/ApproveList";
import { useUserPage } from "./useUserPage";

export default function UserPage() {
  const {
    breadcrumbs,
    columns,
    isLoading,
    onPageRefresh,
    data,
    userStatusOptions,
    filter,
    onStatusChange,
    onKeywordChange,
    onPageChange,
    onPageSizeChange,
  } = useUserPage();
  const t = useTranslations();

  return (
    <PageContent
      title={t('user.list.title')}
      description={t('user.list.desc')}
      breadcrumbs={breadcrumbs}
      filters={
        <>
          <SearchTextbox
            value={filter.keyword}
            placeholder={t('user.list.filter.search.placeholder')}
            onTextChange={onKeywordChange}
          />
          <MultiCombobox
            className="flex-nowrap max-w-75 overflow-hidden"
            value={filter.statuses || []}
            onChange={onStatusChange}
            placeholder={t('user.list.filter.statusList.placeholder')}
            options={userStatusOptions}
            displayCount={2}
            getOptionLabel={(status) => t(getUserStatusKey(status))}
            getDisplayValue={(status) => t(getUserStatusKey(status))}
          />
        </>
      }
      actions={
        <>
          <ApproveList tooltip={t('user.list.btnApproveList')} onPageRefresh={onPageRefresh} />
          <RefreshButton onRefresh={onPageRefresh} />
        </>
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
