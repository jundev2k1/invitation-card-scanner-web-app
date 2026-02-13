import { Sex, UserStatus } from "@/types";

export interface UserSearchItemDto {
  id: string;
  username: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  sex: Sex;
  avatarUrl: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
