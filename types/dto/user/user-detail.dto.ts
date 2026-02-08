import { Role } from "@/types/enum";
import { Sex } from "@/types/enum/sex.enum";
import { UserStatus } from "@/types/enum/user-status.enum";

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
