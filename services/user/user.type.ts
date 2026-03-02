import { BaseFilter } from "@/root/app/components";
import { Sex, UserStatus } from "@/types";

export interface GetUserListRequest extends BaseFilter {
  statuses?: UserStatus[] | undefined;
  sortBy?: 'createdAt' | 'nickname' | 'status',
  sortOrder?: 'asc' | 'desc'
}

export type UpdateUserRequest = {
  email: string,
  nickName: string,
  sex: Sex,
  phoneNumber: string,
  bio: string,
}

export type UploadAvatarResponse = {
  avatarUrl: string
}
