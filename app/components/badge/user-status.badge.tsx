import { userMapper } from "@/app/utils/mappers";
import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/types";

type UserStatusBadgeProps = {
  status: UserStatus
}

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <Badge className={userMapper.getUserStatusColor(status)}>
      {userMapper.getUserStatus(status)}
    </Badge>
  );
}
