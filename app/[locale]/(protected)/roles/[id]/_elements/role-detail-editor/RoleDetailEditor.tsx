"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  TextArea,
} from "@/components";
import { Calendar, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface RoleDetailEditorProps {
  role: {
    id: string;
    name: string;
    description: string;
    isSystem?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  onSave: (updatedRole: Partial<{ name: string; description: string }>) => Promise<void>;
}

export function RoleDetailEditor({ role, onSave }: RoleDetailEditorProps) {
  const tOverview = useTranslations("permission.role_overview");
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ name, description });
    } catch (err) {
      console.error("Save role error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tOverview("title")}</CardTitle>
        <CardDescription>{tOverview("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">{tOverview("name_label")}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={role.isSystem}
          />
          {role.isSystem && (
            <p className="text-xs text-muted-foreground">
              {tOverview("system_role_note")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{tOverview("description_label")}</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            disabled={role.isSystem}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{tOverview("created")}</span>
            <span className="font-medium text-foreground">
              {role.createdAt || "—"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{tOverview("updated")}</span>
            <span className="font-medium text-foreground">
              {role.updatedAt || "—"}
            </span>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving || role.isSystem}
          className="w-full"
        >
          {isSaving ? tOverview("saving") : tOverview("save")}
        </Button>

        {role.isSystem && (
          <div className="flex justify-center">
            <Badge variant="secondary" className="w-fit">
              {tOverview("system_protected")}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
