'use client';
import { DataList, PageContent, TextBox } from "@/app/components";
import { ApproveList } from "./_approve-list/ApproveList";
import { breadcrumbs, columns, useUserPage } from "./useUserPage";

export default function UserPage() {
  const { isLoading, keyword, data, onPageChange, onPageSizeChange, setKeyword } = useUserPage();

  return (
    <PageContent
      title="User Management"
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
        <ApproveList />
      }
    >
      {
        isLoading ? (
          <></>
        ) : (
          <DataList
            data={data}
            columns={columns}
            emptyMessage="No users found."
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange} />
        )}
    </PageContent >
  );
}
