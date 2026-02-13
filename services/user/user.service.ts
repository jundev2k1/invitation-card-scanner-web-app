import { api, baseQuery, mapToUrlSearchParams } from "@/lib/api-client";
import { UserDetailDto } from "@/types";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { UserStatus } from "@/types/enum/user-status.enum";
import { SearchResult } from "@/types/search-result";
import { GetUserListRequest } from "./user.type";

export const userService = {
  getProfile: () => {
    return baseQuery(api.get<UserDetailDto>('/users/me'));
  },
  getStatusStats: () => {
    return baseQuery(api.get<Record<UserStatus, number>>('/backoffice/users/status/stats'));
  },
  getUserList: (props: GetUserListRequest) => {
    const req = mapToUrlSearchParams(props);
    return baseQuery(api.get<SearchResult<UserSearchItemDto>>('/backoffice/users', { params: req }));
  },
  getUserDetail: (id: string) => {
    return baseQuery(api.get<UserDetailDto>(`/backoffice/users/${id}`));
  },
  approveUser: (id: string) => {
    return baseQuery<null>(api.post(`/backoffice/users/${id}/status/approve`));
  },
};
