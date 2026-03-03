import { MailIcon, UsersIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PermissionEditor } from "./_elements/permission-editor/PermissionEditor";
import { RoleDetailEditor } from "./_elements/role-detail-editor/RoleDetailEditor";

const mockRole = {
  id: "event_manager",
  name: "Event Manager",
  description: "Quản lý toàn bộ sự kiện và thẻ sự kiện",
  isSystem: false,
  createdAt: "2025-01-15",
  updatedAt: "2025-03-01",
};

const mockInitialPermissions = {
  "dashboard.view": true,
  "user_management.view": true,
  "event_management.create": true,
  "event_management.update": true,
};

enum TabNames {
  OVERVIEW = "overview",
  PERMISSIONS = "permissions",
}

type PermissionManagerProps = {
  roleId: string;
};

export const usePermissionManager = ({ roleId }: PermissionManagerProps) => {
  const t = useTranslations("permission");
  const [role, setRole] = useState(mockRole);
  const [permissions, setPermissions] = useState<Record<string, boolean>>(mockInitialPermissions);

  const handleRoleSave = async (updates: Partial<{ name: string; description: string }>) => {
    setRole((prev) => ({ ...prev, ...updates }));
  };

  const handlePermissionSave = async (newPermissions: Record<string, boolean>) => {
    setPermissions(newPermissions);
  };

  const tabOptions = [
    {
      label: (
        <div className="flex items-center gap-2">
          <MailIcon />
          {t('role_detail.tabOverview')}
        </div >
      ),
      value: TabNames.OVERVIEW,
      content: (
        <RoleDetailEditor role={role} onSave={handleRoleSave} />
      ),
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <UsersIcon />
          {t('role_detail.tabPermissions')}
        </div>
      ),
      value: TabNames.PERMISSIONS,
      content: (
        <PermissionEditor
          roleId={roleId}
          initialPermissions={permissions}
          onSave={handlePermissionSave}
        />
      ),
    }
  ];

  return {
    tabOptions,
    role,
  };
};
