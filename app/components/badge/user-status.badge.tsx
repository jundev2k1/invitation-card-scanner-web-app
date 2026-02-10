import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/types/enum/user-status.enum";

const colors = Object.freeze({
  [UserStatus.INACTIVE]: "bg-gray-500 text-white dark:bg-gray-600 dark:text-white",
  [UserStatus.WAITING_FOR_APPROVE]: "bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white",
  [UserStatus.ACTIVE]: "bg-green-500 text-white dark:bg-green-600 dark:text-white",
  [UserStatus.SUSPENDED]: "bg-red-500 text-white dark:bg-red-600 dark:text-white",
  [UserStatus.DELETED]: "bg-gray-500 text-white dark:bg-gray-600 dark:text-white",
});

const statusContents = Object.freeze({
  [UserStatus.INACTIVE]: "Inactive",
  [UserStatus.WAITING_FOR_APPROVE]: "Waiting for approve",
  [UserStatus.ACTIVE]: "Active",
  [UserStatus.SUSPENDED]: "Suspended",
  [UserStatus.DELETED]: "Deleted",
});

type UserStatusBadgeProps = {
  status: UserStatus
}
export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <Badge className={colors[status]}>
      {statusContents[status]}
    </Badge>
  );
}
