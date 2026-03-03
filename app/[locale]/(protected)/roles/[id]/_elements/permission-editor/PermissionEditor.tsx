"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Label, Separator, Switch } from "@/components";
import { useTranslations } from "next-intl";
import { usePermissionEditor } from "./usePermissionEditor";

interface PermissionEditorProps {
  roleId: string;
  initialPermissions: Record<string, boolean>;
  onSave: (permissions: Record<string, boolean>) => Promise<void>;
}

export function PermissionEditor({ roleId, initialPermissions, onSave }: PermissionEditorProps) {
  const tEditor = useTranslations("permission.permissions_editor");
  const tGroups = useTranslations("permission.permission_groups");
  const tItems = useTranslations("permission.permission_items");

  const {
    permissionGroups,
    permissions,
    isSaving,
    togglePermission,
    handleSave,
  } = usePermissionEditor({ roleId, initialPermissions, onSave });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tEditor("title")}</CardTitle>
        <CardDescription>{tEditor("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {permissionGroups.map((group) => (
          <div key={group.group}>
            <h3 className="font-semibold mb-4">{tGroups(group.group)}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.permissions.map((perm) => {
                const permKey = `${group.group}.${perm.key}`;

                return (
                  <div
                    key={permKey}
                    className="flex items-center justify-between rounded-lg border p-4 shadow-sm hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <Label className="text-base">{tItems(perm.key)}</Label>
                      <p className="text-xs text-muted-foreground">{permKey}</p>
                    </div>

                    <Switch
                      checked={permissions[permKey] ?? false}
                      onCheckedChange={() => togglePermission(permKey)}
                    />
                  </div>
                );
              })}
            </div>

            <Separator className="mt-6" />
          </div>
        ))}

        <div className="flex justify-end mt-8">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="min-w-35"
          >
            {isSaving ? tEditor("saving") : tEditor("save_changes")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
