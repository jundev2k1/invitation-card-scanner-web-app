import { api, baseQuery, mapToFormData, mapToUrlSearchParams } from "@/lib/api-client";
import { SearchResult, UserDetailDto, UserSearchItemDto, UserStatus } from "@/types";
import { GetUserListRequest, UpdateUserRequest, UploadAvatarResponse } from "./user.type";

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
  updateUser: (id: string, data: UpdateUserRequest) => {
    return baseQuery(api.put(`/backoffice/users/${id}`, data));
  },
  uploadAvatar: (id: string, file: File) => {
    const req = mapToFormData({ id, avatar: file });
    return baseQuery<UploadAvatarResponse>(api.put(`/users/${id}/avatar`, req));
  },
  approveUser: (id: string) => {
    return baseQuery<null>(api.patch(`/backoffice/users/${id}/status/approve`));
  },
};
