'use client';
import { DataList, PageContent, TextBox } from "@/app/components";
import { ApproveList } from "./_approve-list/ApproveList";
import { breadcrumbs, columns, useUserPage } from "./useUserPage";

export default function UserPage() {
  const {
    currentPage,
    isLoading,
    onPageRefresh,
    keyword,
    data,
    filter,
    onPageChange,
    onPageSizeChange,
    setKeyword
  } = useUserPage();

  return (
    <PageContent
      title={currentPage}
      description="View, edit, and manage all system users."
      breadcrumbs={breadcrumbs}
      filters={
        <TextBox
          value={keyword}
          placeholder="Search with username or email..."
          className="w-75"
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      }
      actions={
        <ApproveList onPageRefresh={onPageRefresh} />
      }
    >
      <DataList
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No users found."
        page={filter.page}
        onPageChange={onPageChange}
        pageSize={filter.pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </PageContent >
  );
}
