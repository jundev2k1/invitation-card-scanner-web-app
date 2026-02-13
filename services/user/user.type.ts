import { Sex, UserStatus } from "@/types"

export type GetUserListRequest = {
  keyword: string,
  statuses?: UserStatus[] | undefined,
  page: number,
  pageSize: number
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
