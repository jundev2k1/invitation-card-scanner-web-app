import { useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";
import { GetUserListRequest } from "./user.type";

const useGetUserSearch = (params: GetUserListRequest) => {
  const { keyword, statuses, page, pageSize } = params;
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUserList({ keyword, statuses, page, pageSize }),
    staleTime: 1000 * 60
  });
}

const useGetUserDetail = (id: string, secconds?: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getUserDetail(id),
    staleTime: 1000 * (secconds || 15),
    enabled: !!id
  });
}

export {
  useGetUserDetail, useGetUserSearch
};
