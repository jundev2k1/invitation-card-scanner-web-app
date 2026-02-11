'use client';
import { DataList, IconButton, PageContent, TextBox } from "@/app/components";
import { AtSignIcon } from "@/app/components/icons";
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
          type="text"
          value={keyword}
          placeholder="Search..."
          className="w-75"
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      }
      actions={
        <IconButton icon={<AtSignIcon />} variant="outline" isRound />
      }
    >
      {isLoading ? (
        <></>
      ) : (
        <DataList
          data={data}
          columns={columns}
          emptyMessage="No users found."
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange} />
      )}
    </PageContent>
  );
}
