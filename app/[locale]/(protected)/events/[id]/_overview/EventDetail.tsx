"use client";
import { Button, Card, CardContent, PageContent, RefreshButton, SkeletonCard, SkeletonProfile } from "@/app/components";
import { ClipboardPenIcon, InfoIcon, TrashIcon } from "@/app/components/icons";
import { PageAction } from "@/types";
import { useTranslations } from "next-intl";
import { EventViewForm } from "../_view/ViewEventDetail";
import { useEventDetail } from "./useEventDetail";

type EventDetailProps = {
  id: string;
  action?: PageAction;
};

export default function EventDetailLayout({ id, action }: EventDetailProps) {
  const t = useTranslations();
  const {
    breadcrumbs,
    isLoading,
    data,
    onPageRefresh,
    redirectToEdit,
    redirectToDetail,
    handleDelete,
  } = useEventDetail(id);
  if (isLoading) return <SkeletonProfile />;

  return (
    <PageContent
      title={t('event.detail.title')}
      description={t('event.detail.desc')}
      breadcrumbs={breadcrumbs}
      actions={
        <>
          {action === PageAction.VIEW && (
            <>
              <RefreshButton onRefresh={onPageRefresh} />
              <Button
                leftIcon={<TrashIcon />}
                className="dark:text-muted-foreground"
                variant="outline"
                onClick={handleDelete}
              >
                {t('common.actions.delete')}
              </Button>
              <Button
                leftIcon={<ClipboardPenIcon />}
                className="dark:text-muted-foreground"
                variant="outline"
                onClick={redirectToEdit}
              >
                {t('common.actions.edit')}
              </Button>
            </>
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
        </>
      }
    >
      {isLoading || !data ? (
        <Card>
          <CardContent>
            <SkeletonCard />
          </CardContent>
        </Card>
      ) : (
        <>
          {action === PageAction.VIEW && <EventViewForm eventDetail={data} />}
          {action === PageAction.EDIT && <></>}
        </>
      )}
    </PageContent>
  );
}
