import {
  BriefcaseIcon,
  CrownIcon,
  ShieldUserIcon,
  UserIcon
} from "@/app/components/icons";
import { roleMapper } from "@/app/utils/mappers";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/types";

type RoleBadgeProps = {
  role: Role
};

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const icons = {
    [Role.ROOT]: CrownIcon,
    [Role.ADMIN]: ShieldUserIcon,
    [Role.STAFF]: BriefcaseIcon,
  };
  const Icon = icons[role] || UserIcon;
  return (
    <Badge className={roleMapper.getRoleColor(role)}>
      <Icon />
      {roleMapper.getUserRole(role)}
    </Badge>
  )
};
