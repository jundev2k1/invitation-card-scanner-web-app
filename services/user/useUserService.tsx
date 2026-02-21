import { UserStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";

const useGetUserSearch = (keyword: string, statuses: UserStatus[], page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUserList({ keyword, statuses, page, pageSize }),
    staleTime: 1000 * 60
  });
}

const useGetUserDetail = (id: string, secconds?: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getUserDetail(id),
    staleTime: 1000 * (secconds || 15),
    enabled: !!id
  });
}

export {
  useGetUserDetail, useGetUserSearch
};

