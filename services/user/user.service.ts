import { api, baseQuery, mapToUrlSearchParams } from "@/lib/api-client";
import { SearchResult, UserDetailDto, UserSearchItemDto, UserStatus } from "@/types";
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
