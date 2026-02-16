"use client";
import { Button, PageContent, SkeletonProfile } from "@/app/components";
import { ClipboardPenIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { PageAction } from "@/types";
import { UserEditForm } from "../_edit/EditUserDetail";
import { UserViewForm } from "../_view/ViewUserDetail";
import { breadcrumbs, useUserDetail } from "./useUserDetail";

type UserDetailProps = {
  id: string;
  action?: PageAction;
};

export default function UserDetailLayout({ id, action }: UserDetailProps) {
  const { data, onPageRefresh, isLoading } = useUserDetail(id);
  if (isLoading) return <SkeletonProfile />;

  return (
    <PageContent
      title="User Detail"
      description="View, edit, and manage all system users."
      breadcrumbs={[...breadcrumbs, { label: data!.nickName || data!.username || '' }]}
      actions={
        <>
          {action === PageAction.VIEW && (
            <Button
              leftIcon={<ClipboardPenIcon />}
              className="dark:text-muted-foreground"
              variant="outline"
              onClick={() => RouteUtil.redirectToUserDetail(id, PageAction.EDIT)}
            >
              Edit
            </Button>
          )}
        </>
      }
    >
      {action === PageAction.VIEW && <UserViewForm userDetail={data!} />}
      {action === PageAction.EDIT && <UserEditForm userDetail={data!} onPageRefresh={onPageRefresh} />}
    </PageContent>
  );
}
