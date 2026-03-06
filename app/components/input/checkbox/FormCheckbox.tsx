"use client";
import { Checkbox } from "@/shadcn/checkbox";
import { Label } from "@/shadcn/label";
import { Controller, useFormContext } from "react-hook-form";

export function FormCheckbox({ name, label, onCheckedChange }: { name: string; label: string; onCheckedChange?: () => void }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  const onChange = (checked: boolean | string, onFieldChange: (...args: any[]) => void) => {
    onFieldChange(checked);
    onCheckedChange?.();
  };
  
  return (
    <div className="space-y-1.5">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox id={name} checked={field.value} onCheckedChange={(checked) => onChange(checked, field.onChange)} />
            <Label htmlFor={name} className="cursor-pointer text-slate-900 dark:text-muted-foreground">{label}</Label>
          </div>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
