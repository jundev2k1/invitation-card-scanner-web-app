"use client";
import { Button, PageContent, RefreshButton, SkeletonProfile } from "@/app/components";
import { ClipboardPenIcon, InfoIcon } from "@/app/components/icons";
import { PageAction } from "@/types";
import { useTranslations } from "next-intl";
import { UserEditForm } from "../_edit/EditUserDetail";
import { UserViewForm } from "../_view/ViewUserDetail";
import { breadcrumbs, useUserDetail } from "./useUserDetail";

type UserDetailProps = {
  id: string;
  action?: PageAction;
};

export default function UserDetailLayout({ id, action }: UserDetailProps) {
  const t = useTranslations();
  const {
    isLoading,
    data,
    onPageRefresh,
    redirectToEdit,
    redirectToDetail,
  } = useUserDetail(id);
  if (isLoading) return <SkeletonProfile />;

  return (
    <PageContent
      title={t('user.detail.title')}
      description={t('user.detail.desc')}
      breadcrumbs={[...breadcrumbs, { label: data!.nickName || data!.username || '' }]}
      actions={
        <>
          {action === PageAction.VIEW && (
            <Button
              leftIcon={<ClipboardPenIcon />}
              className="dark:text-muted-foreground"
              variant="outline"
              onClick={redirectToEdit}
            >
              {t('common.actions.edit')}
            </Button>
          )}
          {action === PageAction.EDIT && (
            <Button
              leftIcon={<InfoIcon />}
              className="dark:text-muted-foreground"
              variant="outline"
              onClick={redirectToDetail}
            >
              {t('common.actions.view')}
            </Button>
          )}
          <RefreshButton onRefresh={onPageRefresh} />
        </>
      }
    >
      {action === PageAction.VIEW && <UserViewForm userDetail={data!} />}
      {action === PageAction.EDIT && <UserEditForm userDetail={data!} onPageRefresh={onPageRefresh} />}
    </PageContent>
  );
}
