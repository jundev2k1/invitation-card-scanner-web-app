import { useState } from "react";

export const permissionGroups = [
  { group: "dashboard", labelKey: "dashboard", permissions: [{ key: "view", labelKey: "view" }] },
  {
    group: "user_management",
    labelKey: "userManagement",
    permissions: [
      { key: "view", labelKey: "view" },
      { key: "edit", labelKey: "edit" },
      { key: "approve", labelKey: "approve" },
    ],
  },
  {
    group: "event_management",
    labelKey: "eventManagement",
    permissions: [
      { key: "category_crud", labelKey: "categoryCrud" },
      { key: "create", labelKey: "create" },
      { key: "update", labelKey: "update" },
      { key: "delete", labelKey: "delete" },
      { key: "scan", labelKey: "scan" },
      { key: "assign_member", labelKey: "assignMember" },
      { key: "remove_member", labelKey: "removeMember" },
    ],
  },
];

interface PermissionEditorProps {
  roleId: string;
  initialPermissions: Record<string, boolean>;
  onSave: (permissions: Record<string, boolean>) => Promise<void>;
}

export const usePermissionEditor = ({ roleId, initialPermissions, onSave }: PermissionEditorProps) => {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [isSaving, setIsSaving] = useState(false);

  const togglePermission = (key: string) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(permissions);
    setIsSaving(false);
  };

  return {
    permissionGroups,
    permissions,
    isSaving,
    togglePermission,
    handleSave,
  }
};