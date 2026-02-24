import {
  BriefcaseIcon,
  CrownIcon,
  ShieldUserIcon,
  UserIcon
} from "@/app/components/icons";
import { roleMapper } from "@/app/utils/mappers";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/types";
import { useTranslations } from "next-intl";

type RoleBadgeProps = {
  role: Role
};

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const t = useTranslations();
  const icons = {
    [Role.ROOT]: CrownIcon,
    [Role.ADMIN]: ShieldUserIcon,
    [Role.STAFF]: BriefcaseIcon,
  };
  const Icon = icons[role] || UserIcon;
  return (
    <Badge className={roleMapper.getRoleColor(role)}>
      <Icon />
      {t(`user.enum.role.${role || "UNKNOWN"}`)}
    </Badge>
  )
};
