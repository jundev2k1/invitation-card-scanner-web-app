"use client";
import { Label } from "@/shadcn/label";
import { Switch } from "@/shadcn/switch";
import { Controller, useFormContext } from "react-hook-form";

export function FormSwitch({ name, label, disabled }: { name: string; label: string, disabled?: boolean }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          <Label className="text-slate-900 dark:text-muted-foreground">
            {label}
          </Label>
        </div>
      )}
    />
  );
}