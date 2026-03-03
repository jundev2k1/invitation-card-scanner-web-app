import { RouteUtil } from "@/root/app/utils/route";
import { GetEventListRequest, useSearchEvents } from "@/root/services";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useUpcomingEventsList = () => {
  const locale = useLocale();
  const router = useRouter();

  const queryParams: GetEventListRequest = useMemo(() => ({
    keyword: '',
    page: 1,
    pageSize: 8,
    sortBy: 'start_at',
    sortOrder: 'asc',
    startFrom: new Date(),
  }), [locale]);

  const { data, isLoading } = useSearchEvents(queryParams);

  const redirectToList = useCallback(() => {
    router.push(RouteUtil.getEventListRoute(locale));
  }, []);

  return {
    isLoading,
    upcomingEvents: data?.data?.items ?? [],
    redirectToList,
  }
}
