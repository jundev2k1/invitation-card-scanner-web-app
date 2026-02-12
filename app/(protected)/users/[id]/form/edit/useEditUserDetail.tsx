import { UserDetailDto } from "@/types";

export const useUserEditForm = (userDetail: UserDetailDto) => {
  return {
    userDetail,
  }
}