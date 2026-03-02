"use client";
import { cn } from "@/root/lib/utils";
import { Label } from "@/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";
import { Controller, useFormContext } from "react-hook-form";

interface FormSelectProps {
  name: string;
  label?: string;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
}

export function FormSelect({ name, label, containerClassName, className, options, placeholder, disabled = false }: FormSelectProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;
  
  return (
    <div className={cn("space-y-1.5 w-full", containerClassName)}>
      {label && <Label className="text-slate-900 dark:text-muted-foreground">{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
            <SelectTrigger className={cn(error ? "border-destructive" : "", className)}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
