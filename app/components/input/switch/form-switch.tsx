"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller, useFormContext } from "react-hook-form";

export function FormSwitch({ name, label }: { name: string; label: string }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Switch checked={field.value} onCheckedChange={field.onChange} />
          <Label>{label}</Label>
        </div>
      )}
    />
  );
}