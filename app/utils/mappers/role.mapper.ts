import { Role } from "@/types";

export const getRoleColor = (role: Role): string => {
  const variants: Record<Role, string> = {
    [Role.ROOT]: "bg-violet-500 hover:bg-violet-600",
    [Role.ADMIN]: "bg-blue-500 hover:bg-blue-600",
    [Role.STAFF]: "bg-green-500 hover:bg-green-600",
  };
  return variants[role] || "bg-gray-500 hover:bg-gray-600";
}
