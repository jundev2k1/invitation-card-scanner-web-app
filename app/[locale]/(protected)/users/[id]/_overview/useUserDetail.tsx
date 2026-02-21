import { RouteUtil } from "@/app/utils/route";
import { useGetUserDetail } from "@/services";
import { useSidebarStore } from "@/store";
import { PageAction } from "@/types";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Users", href: "/users" },
];

export const useUserDetail = (id: string) => {
  const locale = useLocale();
  const router = useRouter();
  const { currentPage, setCurrentPage } = useSidebarStore();
  const { data, isLoading, refetch } = useGetUserDetail(id, 5);

  useEffect(() => {
    if (currentPage == "user.list.title")
      return;

    setCurrentPage("user.list.title");
  }, []);

  const redirectToEdit = useCallback(() => router.push(RouteUtil.getUserDetailUrl(locale, id, PageAction.EDIT)), [locale]);
  const redirectToDetail = useCallback(() => router.push(RouteUtil.getUserDetailUrl(locale, id, PageAction.VIEW)), [locale]);

  return {
    isLoading,
    data: data?.data ?? null,
    onPageRefresh: refetch,
    redirectToEdit,
    redirectToDetail,
  };
};