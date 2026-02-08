import { Role } from "@/types/enum";

export interface UserDetailDto {
  id: string;
  email: string;
  nickname: string;
  role: Role;
}
