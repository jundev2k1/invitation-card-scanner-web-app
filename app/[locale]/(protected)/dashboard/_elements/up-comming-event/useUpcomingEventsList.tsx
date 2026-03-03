import { GetEventListRequest, useSearchEvents } from "@/services";
import { EventStatus, PageAction } from "@/types";
import { RouteUtil } from "@/utils/route";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useUpcomingEventsList = () => {
  const locale = useLocale();
  const router = useRouter();

  const queryParams: GetEventListRequest = useMemo(() => ({
    keyword: '',
    page: 1,
    pageSize: 5,
    statuses: [EventStatus.PUBLISHED],
    sortBy: 'start_at',
    sortOrder: 'asc',
    startFrom: new Date(),
  }), [locale]);

  const { data, isLoading } = useSearchEvents(queryParams);

  const redirectToList = useCallback(() => {
    router.push(RouteUtil.getEventListRoute(locale));
  }, []);

  const redirectToDetail = useCallback((id: string) => {
    router.push(RouteUtil.getEventDetailUrl(locale, id, PageAction.VIEW));
  }, []);

  return {
    isLoading,
    upcomingEvents: data?.data?.items ?? [],
    redirectToList,
    redirectToDetail,
  }
}
