"use client";
import { Checkbox } from "@/shadcn/checkbox";
import { Label } from "@/shadcn/label";
import { Controller, useFormContext } from "react-hook-form";

interface FormCheckboxProps {
  name: string;
  label: string | React.ReactNode;
  subLabel?: string;
  onCheckedChange?: () => void;
  disabled?: boolean;
}

export function FormCheckbox({ name, label, subLabel, onCheckedChange, disabled }: FormCheckboxProps) {
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
            <Checkbox id={name} checked={field.value} onCheckedChange={(checked) => onChange(checked, field.onChange)} disabled={disabled} />
            {subLabel ? (
              <div className="flex flex-col gap-0.5">
                <Label htmlFor={name} className="cursor-pointer text-slate-900 dark:text-muted-foreground">
                  {label}
                </Label>
                <span className="text-xs text-muted-foreground">{subLabel}</span>
              </div>
            ) : (
              <Label htmlFor={name} className="cursor-pointer text-slate-900 dark:text-muted-foreground">{label}</Label>
            )}
          </div>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
