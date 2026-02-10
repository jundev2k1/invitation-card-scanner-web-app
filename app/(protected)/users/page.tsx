'use client';
import { DataList, PageContent } from "@/app/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { breadcrumbs, columns, useUserPage } from "./useUserPage";

export default function UserPage() {
  const { isLoading, keyword, filter, data, onPageChange, onPageSizeChange, setKeyword } = useUserPage();

  return (
    <PageContent
      title="User Management"
      description="View, edit, and manage all system users."
      breadcrumbs={breadcrumbs}
      filters={
        <Input
          type="text"
          value={keyword}
          placeholder="Search..."
          className="w-75"
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      }
      actions={
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New User
        </Button>
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
