import { RouteUtil } from "@/app/utils/route";
import { useGetUserDetail } from "@/services";
import { PageAction } from "@/types";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Users", href: "/users" },
];

export const useUserDetail = (id: string) => {
  const locale = useLocale();
  const router = useRouter();
  const { data, isLoading, refetch } = useGetUserDetail(id, 5);

  const redirectToEdit = useCallback(() => router.push(RouteUtil.getUserDetailUrl(locale, id, PageAction.EDIT)), [locale]);

  return {
    isLoading,
    data: data?.data ?? null,
    onPageRefresh: refetch,
    redirectToEdit,
  };
};