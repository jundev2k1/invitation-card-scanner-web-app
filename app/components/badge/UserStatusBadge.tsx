import { Badge } from "@/shadcn/badge";
import { UserStatus } from "@/types";
import { userMapper } from "@/utils/mappers";
import { getUserStatusKey } from "@/utils/mappers/user.mapper";
import { useTranslations } from "next-intl";

type UserStatusBadgeProps = {
  status: UserStatus
}

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const t = useTranslations();
  return (
    <Badge className={userMapper.getUserStatusColor(status)}>
      {status ? t(getUserStatusKey(status)) : "-"}
    </Badge>
  );
}
