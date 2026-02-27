"use client";
import {
  Button,
  Card,
  CardContent,
  PageContent,
  RefreshButton,
  SkeletonCard,
  SkeletonProfile,
} from "@/components";
import { EventScanner } from "@/events/_shared";
import { UpdateModal } from "@/events/_update-modal/UpdateModal";
import { InfoIcon, TrashIcon } from "@/icons";
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
              <EventScanner eventId={data?.id} />
              <RefreshButton onRefresh={onPageRefresh} />
              <Button
                leftIcon={<TrashIcon />}
                variant="destructive"
                onClick={handleDelete}
              >
                {t('common.actions.delete')}
              </Button>
              <UpdateModal detail={data} />
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
        </>
      )}
    </PageContent>
  );
}
