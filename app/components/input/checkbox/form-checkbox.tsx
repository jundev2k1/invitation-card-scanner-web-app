"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

export function FormCheckbox({ name, label }: { name: string; label: string }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />
            <Label htmlFor={name} className="cursor-pointer">{label}</Label>
          </div>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
