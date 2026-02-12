"use client";
import { BadgeButton, PageContent } from "@/app/components";
import { ClipboardPenIcon } from "@/app/components/icons";
import { UserEditForm } from "../form/edit/editUserDetail";
import { UserViewForm } from "../form/view/viewUserDetail";
import { breadcrumbs, useUserDetail } from "./useUserDetail";

type UserDetailProps = {
  id: string;
  action?: 'edit' | 'view';
};

export default function UserDetailView({ id, action }: UserDetailProps) {
  const { title, data } = useUserDetail(id);
  return (
    <PageContent
      title={title}
      description="View, edit, and manage all system users."
      breadcrumbs={[...breadcrumbs, { label: data.id }]}
      actions={
        <BadgeButton
          count={1}
          label={<ClipboardPenIcon />}
          className="dark:text-muted-foreground"
          variant="outline" />
      }
    >
      {action === "edit" ? <UserEditForm userDetail={data} /> : <UserViewForm userDetail={data} />}
    </PageContent>
  );
}
