import { Role, Sex, UserStatus } from "@/types";

export interface UserDetailDto {
  id: string;
  username: string;
  email: string;
  nickName: string;
  sex: Sex;
  phoneNumber: string;
  avatarUrl: string;
  bio: string;
  status: UserStatus;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
