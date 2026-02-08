import { Sex } from "@/types/enum/sex.enum";
import { UserStatus } from "@/types/enum/user-status.enum";

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