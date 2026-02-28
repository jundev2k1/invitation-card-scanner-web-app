import { RouteUtil } from "@/root/app/utils/route";
import { useSearchEvents } from "@/root/services";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useUpcomingEventsList = () => {
  const locale = useLocale();
  const router = useRouter();
  const { data, isLoading } = useSearchEvents({ keyword: '', page: 1, pageSize: 8 });

  const redirectToList = () => useCallback(() => {
    router.push(RouteUtil.getEventListRoute(locale));
  }, []);

  return {
    isLoading,
    upcomingEvents: data?.data?.items,
    redirectToList,
  }
}
