import { Toast } from "@/app/components";
import { userService } from "@/services";
import { useSidebarStore } from "@/store";
import { UserDetailDto } from "@/types";
import { useEffect, useState } from "react";

export const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Users", href: "/users" },
];

export const useUserDetail = (id: string) => {
  const { currentPage, setCurrentPage } = useSidebarStore();
  const [data, setData] = useState<UserDetailDto>();
  const [isRefresh, setIsRefresh] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentPage == "User Management")
      return;

    setCurrentPage("User Management");
  }, []);

  useEffect(() => {
    userService.getUserDetail(id)
      .then(res => {
        if (res.data == null) {
          Toast.showError("User not found");
          return;
        }

        setData(res.data!);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, [id, isRefresh]);

  const onPageRefresh = () => setIsRefresh(isRefresh + 1);
  return {
    isLoading,
    data,
    onPageRefresh
  };
};