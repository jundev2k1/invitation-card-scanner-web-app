import { api, baseQuery } from "@/lib/api-client";
import { UserDetailDto } from "@/types";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { SearchResult } from "@/types/search-result";
import { GetUserListRequest } from "./user.type";

export const userService = {
  getProfile: () => {
    return baseQuery(api.get<UserDetailDto>('/users/me'));
  },
  getUserList: ({ keyword, page, pageSize }: GetUserListRequest) => {
    return baseQuery(api.get<SearchResult<UserSearchItemDto>>('/backoffice/users', { params: { keyword, page, pageSize } }));
  },
  getUserDetail: (id: string) => {
    return baseQuery(api.get<UserDetailDto>(`/backoffice/users/${id}`));
  },
  approveUser: (id: string) => {
    return baseQuery(api.post(`/backoffice/users/${id}/status/approve`));
  },
};
