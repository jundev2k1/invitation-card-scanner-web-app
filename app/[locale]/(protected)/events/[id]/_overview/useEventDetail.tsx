import { Toast } from "@/app/components";
import { RouteUtil } from "@/app/utils/route";
import { useDeleteEvent, useGetEventDetail } from "@/services";
import { useSidebarStore } from "@/store";
import { PageAction } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

const getBreadcrumbs = (t: any, locale: string) => [
  { label: t('dashboard.title'), href: RouteUtil.getDashboardRoute(locale) },
  { label: t('event.list.title'), href: RouteUtil.getEventListRoute(locale) },
];

export const useEventDetail = (id: string) => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const { currentPage, setCurrentPage } = useSidebarStore();
  const { data, isLoading, isFetching, refetch, status } = useGetEventDetail(id, 5);
  const { mutateAsync } = useDeleteEvent();

  useEffect(() => {
    if (currentPage == "event.list.title")
      return;

    setCurrentPage("event.list.title");
  }, []);

  useEffect(() => {
    if (status === "error") {
      router.push(RouteUtil.getEventListRoute(locale));
    }
  }, [status, locale, router]);

  const breadcrumbs = useMemo(() => getBreadcrumbs(t, locale), [locale]);
  const redirectToEdit = useCallback(() => router.push(RouteUtil.getEventDetailUrl(locale, id, PageAction.EDIT)), [locale]);
  const redirectToDetail = useCallback(() => router.push(RouteUtil.getEventDetailUrl(locale, id, PageAction.VIEW)), [locale]);
  const handleDelete = useCallback(async () => {
    if (!window.confirm(t('common.messages.confirmDelete'))) return;

    await mutateAsync(id);
    Toast.showSuccess(t('common.messages.deleteSuccess'));
    router.push(RouteUtil.getEventListRoute(locale));
  }, []);

  return {
    breadcrumbs,
    isLoading: isLoading || isFetching,
    data: data?.data ?? null,
    onPageRefresh: refetch,
    redirectToEdit,
    redirectToDetail,
    handleDelete,
  };
};
