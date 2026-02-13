import { UserStatus } from "@/types/enum/user-status.enum"

export type GetUserListRequest = {
  keyword: string,
  statuses?: UserStatus[] | undefined,
  page: number,
  pageSize: number
}
