import { RouteUtil } from "@/root/app/utils/route";
import { useGetUserSearch } from "@/root/services";
import { UserStatus } from "@/root/types";
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
    pageSize: 8,
  });

  const redirectToList = useCallback(() => {
    router.push(RouteUtil.getUserListRoute(locale));
  }, []);

  return {
    isLoading,
    pendingUsers: data?.data?.items ?? [],
    redirectToList,
  }
}
