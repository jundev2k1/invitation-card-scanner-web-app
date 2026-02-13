import { Role, Sex, UserStatus } from "@/types";

export const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Users", href: "/users" },
  { label: "User Detail" },
]

export const useUserDetail = (id: string) => {
  const data = {
    id: "u123",
    username: "ngoctan_dev",
    email: "tan.ngoc@example.com",
    nickName: "Ngọc Tấn",
    sex: Sex.MALE,
    phoneNumber: "0909123456",
    avatarUrl: "https://example.com/avatar.jpg",
    bio: "Full-stack developer | TypeScript & Next.js enthusiast | Coffee addict ☕",
    status: UserStatus.ACTIVE,
    role: Role.ADMIN,
    createdAt: new Date("2024-05-15T10:30:00"),
    updatedAt: new Date("2025-12-20T14:45:00"),
  };
  return {
    title: "User Detail",
    data
  };
};