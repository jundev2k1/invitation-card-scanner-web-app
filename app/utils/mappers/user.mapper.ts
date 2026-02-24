import { Sex, UserStatus } from "@/types";

export const getUserStatusKey = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.INACTIVE:
      return "user.enum.status.INACTIVE";

    case UserStatus.WAITING_FOR_APPROVE:
      return "user.enum.status.WAITING_FOR_APPROVE";

    case UserStatus.ACTIVE:
      return "user.enum.status.ACTIVE";

    case UserStatus.SUSPENDED:
      return "user.enum.status.SUSPENDED";

    case UserStatus.DELETED:
      return "user.enum.status.DELETED";

    default:
      return "-";
  }
}

export const getUserStatusColor = (status: UserStatus): string => {
  const variants: Record<UserStatus, string> = Object.freeze({
    [UserStatus.INACTIVE]: "bg-gray-500 text-white dark:bg-gray-600 dark:text-white",
    [UserStatus.WAITING_FOR_APPROVE]: "bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white",
    [UserStatus.ACTIVE]: "bg-green-500 text-white dark:bg-green-600 dark:text-white",
    [UserStatus.SUSPENDED]: "bg-red-500 text-white dark:bg-red-600 dark:text-white",
    [UserStatus.DELETED]: "bg-gray-500 text-white dark:bg-gray-600 dark:text-white",
  });
  return variants[status] || "bg-gray-500 text-white dark:bg-gray-600 dark:text-white";
}

export const getUserSexKey = (sex: Sex): string => {
  switch (sex) {
    case Sex.MALE:
      return "user.enum.gender.MALE";

    case Sex.FEMALE:
      return "user.enum.gender.FEMALE";

    case Sex.OTHER:
      return "user.enum.gender.OTHER";

    default:
      return "-";
  };
}

export const getSexColors = (sex: Sex) => {
  const sexColors: Record<Sex, string> = {
    [Sex.MALE]: "bg-blue-500 text-white dark:bg-blue-600 dark:text-white",
    [Sex.FEMALE]: "bg-pink-500 text-white dark:bg-pink-600 dark:text-white",
    [Sex.OTHER]: "bg-gray-500 text-white dark:bg-gray-600 dark:text-white",
  };
  return sexColors[sex];
}
