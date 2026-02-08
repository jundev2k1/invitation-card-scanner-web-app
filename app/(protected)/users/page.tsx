'use client';
import { PageContent } from "@/app/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebarStore } from "@/store";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

export default function UserPage() {
  const { currentPage, setCurrentPage } = useSidebarStore();

  useEffect(() => {
    setCurrentPage("User Management");
  }, [currentPage]);

  return (
    <PageContent
      title="User Management"
      description="View, edit, and manage all system users."
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Users" },
      ]}
      filters={
        <>
          <Input
            type="text"
            placeholder="Search users..."
            className="w-1/2"
          />
          <Button>Search</Button>
        </>
      }
      actions={
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      }
    >
      {/* Nội dung list: Table, Cards, Filters... */}
      <div className="space-y-6">
        {/* Ví dụ table */}
        <div className="rounded-md border bg-card">
          {/* Table component hoặc data table */}
          <div className="p-6 text-center text-muted-foreground">
            Users table placeholder
          </div>
        </div>
      </div>
    </PageContent>
  );
}
