import { Toast } from "@/components";
import { TranslateFn } from "@/i18n/type";
import { useDeleteEvent, useGetEventDetail } from "@/services";
import { PageAction } from "@/types";
import { RouteUtil } from "@/utils/route";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

const getBreadcrumbs = (t: TranslateFn, dashboardUrl: string, eventListUrl: string, pageTitle: string) => [
  { label: t('dashboard.title'), href: dashboardUrl },
  { label: t('event.list.title'), href: eventListUrl },
  { label: pageTitle },
];

export const useEventDetail = (id: string) => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const { data, isLoading, isFetching, refetch, status } = useGetEventDetail(id, 5);
  const { mutateAsync } = useDeleteEvent();

  useEffect(() => {
    if (status === "error") {
      router.push(RouteUtil.getEventListRoute(locale));
    }
  }, [status, locale, router]);

  const redirectToDetail = useCallback(() => router.push(RouteUtil.getEventDetailUrl(locale, id, PageAction.VIEW)), [locale]);
  const handleDelete = useCallback(async () => {
    if (!window.confirm(t('common.messages.confirmDelete'))) return;

    await mutateAsync(id);
    Toast.showSuccess(t('common.messages.deleteSuccess'));
    router.push(RouteUtil.getEventListRoute(locale));
  }, []);
  const dashboardUrl = useMemo(() => RouteUtil.getDashboardRoute(locale), [locale]);
  const eventListUrl = useMemo(() => RouteUtil.getEventListRoute(locale), [locale]);
  const breadcrumbs = useMemo(() => getBreadcrumbs(t, dashboardUrl, eventListUrl, data?.data?.title ?? '...'), [locale, isLoading]);

  return {
    breadcrumbs,
    isLoading: isLoading || isFetching,
    data: data?.data ?? null,
    onPageRefresh: refetch,
    redirectToDetail,
    handleDelete,
  };
};
