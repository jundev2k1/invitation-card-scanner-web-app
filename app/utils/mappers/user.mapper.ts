import { Sex, UserStatus } from "@/types";

export const getUserStatus = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.INACTIVE:
      return "Inactive";

    case UserStatus.WAITING_FOR_APPROVE:
      return "Waiting for approve";

    case UserStatus.ACTIVE:
      return "Active";

    case UserStatus.SUSPENDED:
      return "Suspended";

    case UserStatus.DELETED:
      return "Deleted";

    default:
      return "Unknown";
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

export const getUserSex = (sex: Sex): string => {
  switch (sex) {
    case Sex.MALE:
      return "Male";

    case Sex.FEMALE:
      return "Female";

    case Sex.OTHER:
      return "Other";

    default:
      return "Unknown";
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
