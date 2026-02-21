import { UserStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";

const useUserSearch = (keyword: string, statuses: UserStatus[], page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUserList({ keyword, statuses, page, pageSize }),
    staleTime: 1000 * 60
  });
}

export {
  useUserSearch
};

