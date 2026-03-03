import { useGetUserSearch } from "@/services";
import { PageAction, UserStatus } from "@/types";
import { RouteUtil } from "@/utils/route";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const usePendingUsersList = () => {
  const locale = useLocale();
  const router = useRouter();

  const { data, isLoading } = useGetUserSearch({
    keyword: '',
    statuses: [UserStatus.WAITING_FOR_APPROVE],
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    pageSize: 5,
  });

  const redirectToList = useCallback(() => {
    router.push(RouteUtil.getUserListRoute(locale));
  }, []);

  const redirectToDetail = useCallback((id: string) => {
    router.push(RouteUtil.getUserDetailUrl(locale, id, PageAction.VIEW));
  }, []);

  return {
    isLoading,
    pendingUsers: data?.data?.items ?? [],
    redirectToList,
    redirectToDetail,
  }
}
