import { UserStatus } from "@/types"

export type GetUserListRequest = {
  keyword: string,
  statuses?: UserStatus[] | undefined,
  page: number,
  pageSize: number
}
